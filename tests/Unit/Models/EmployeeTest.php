<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Employee;
use App\Models\User;
use App\Models\Division;
use App\Models\JobPosition;
use App\Models\EmployeeEducationHistory;
use App\Models\EmployeeCertification;
use App\Models\EmployeeProfessionalLicense;

/**
 * Employee Model Unit Tests
 *
 * Tests for the Employee model relationships, scopes, and business logic.
 * Ensures proper functionality of the Employee Master Data system.
 */
class EmployeeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // No need to pre-create divisions and job positions
        // Factory will handle it automatically
    }

    /** @test */
    public function it_can_create_an_employee()
    {
        $employee = Employee::factory()->create([
            'full_name' => 'John Doe',
            'email' => 'john.doe@kimiafarma.co.id',
            'employment_status' => 'active',
        ]);

        $this->assertDatabaseHas('employees', [
            'full_name' => 'John Doe',
            'email' => 'john.doe@kimiafarma.co.id',
            'employment_status' => 'active',
        ]);
    }

    /** @test */
    public function it_generates_unique_employee_id_on_creation()
    {
        $employee1 = Employee::factory()->create();
        $employee2 = Employee::factory()->create();

        $this->assertNotNull($employee1->employee_id);
        $this->assertNotNull($employee2->employee_id);
        $this->assertNotEquals($employee1->employee_id, $employee2->employee_id);

        // Should follow KF2025001 format
        $this->assertMatchesRegularExpression('/^KF\d{4}\d{3}$/', $employee1->employee_id);
    }

    /** @test */
    public function it_belongs_to_user()
    {
        $user = User::factory()->create();
        $employee = Employee::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $employee->user);
        $this->assertEquals($user->id, $employee->user->id);
    }

    /** @test */
    public function it_belongs_to_division()
    {
        $division = Division::factory()->create();
        $employee = Employee::factory()->create(['division_id' => $division->id]);

        $this->assertInstanceOf(Division::class, $employee->division);
        $this->assertEquals($division->id, $employee->division->id);
    }

    /** @test */
    public function it_belongs_to_job_position()
    {
        $jobPosition = JobPosition::factory()->create();
        $employee = Employee::factory()->create(['job_position_id' => $jobPosition->id]);

        $this->assertInstanceOf(JobPosition::class, $employee->jobPosition);
        $this->assertEquals($jobPosition->id, $employee->jobPosition->id);
    }

    /** @test */
    public function it_can_have_manager_subordinate_relationship()
    {
        $manager = Employee::factory()->create();
        $subordinate = Employee::factory()->create(['manager_id' => $manager->id]);

        // Test manager relationship
        $this->assertInstanceOf(Employee::class, $subordinate->manager);
        $this->assertEquals($manager->id, $subordinate->manager->id);

        // Test subordinates relationship
        $this->assertTrue($manager->subordinates->contains($subordinate));
        $this->assertCount(1, $manager->subordinates);
    }

    /** @test */
    public function it_has_many_education_history()
    {
        $employee = Employee::factory()->create();

        EmployeeEducationHistory::factory()->count(2)->create([
            'employee_id' => $employee->id
        ]);

        $this->assertCount(2, $employee->educationHistory);
        $this->assertInstanceOf(EmployeeEducationHistory::class, $employee->educationHistory->first());
    }

    /** @test */
    public function it_has_many_certifications()
    {
        $employee = Employee::factory()->create();

        EmployeeCertification::factory()->count(3)->create([
            'employee_id' => $employee->id
        ]);

        $this->assertCount(3, $employee->certifications);
        $this->assertInstanceOf(EmployeeCertification::class, $employee->certifications->first());
    }

    /** @test */
    public function it_has_many_professional_licenses()
    {
        $employee = Employee::factory()->create();

        EmployeeProfessionalLicense::factory()->count(2)->create([
            'employee_id' => $employee->id
        ]);

        $this->assertCount(2, $employee->professionalLicenses);
        $this->assertInstanceOf(EmployeeProfessionalLicense::class, $employee->professionalLicenses->first());
    }

    /** @test */
    public function it_scopes_active_employees()
    {
        Employee::factory()->create(['employment_status' => 'active']);
        Employee::factory()->create(['employment_status' => 'inactive']);
        Employee::factory()->create(['employment_status' => 'active']);

        $activeEmployees = Employee::active()->get();

        $this->assertCount(2, $activeEmployees);
        $activeEmployees->each(function ($employee) {
            $this->assertEquals('active', $employee->employment_status);
        });
    }

    /** @test */
    public function it_scopes_employees_in_division()
    {
        $division = Division::factory()->create();

        Employee::factory()->count(2)->create(['division_id' => $division->id]);
        Employee::factory()->create(); // Different division

        $divisionEmployees = Employee::inDivision($division->id)->get();

        $this->assertCount(2, $divisionEmployees);
        $divisionEmployees->each(function ($employee) use ($division) {
            $this->assertEquals($division->id, $employee->division_id);
        });
    }

    /** @test */
    public function it_scopes_employees_under_manager()
    {
        $manager = Employee::factory()->create();

        Employee::factory()->count(3)->create(['manager_id' => $manager->id]);
        Employee::factory()->create(); // No manager

        $subordinates = Employee::underManager($manager->id)->get();

        $this->assertCount(3, $subordinates);
        $subordinates->each(function ($employee) use ($manager) {
            $this->assertEquals($manager->id, $employee->manager_id);
        });
    }

    /** @test */
    public function it_gets_display_name_attribute()
    {
        $employeeWithPreferred = Employee::factory()->create([
            'full_name' => 'John Smith',
            'preferred_name' => 'Johnny',
        ]);

        $employeeWithoutPreferred = Employee::factory()->create([
            'full_name' => 'Jane Doe',
            'preferred_name' => null,
        ]);

        $this->assertEquals('Johnny', $employeeWithPreferred->display_name);
        $this->assertEquals('Jane Doe', $employeeWithoutPreferred->display_name);
    }

    /** @test */
    public function it_checks_if_employee_is_active()
    {
        $activeEmployee = Employee::factory()->create(['employment_status' => 'active']);
        $inactiveEmployee = Employee::factory()->create(['employment_status' => 'inactive']);

        $this->assertTrue($activeEmployee->isActive());
        $this->assertFalse($inactiveEmployee->isActive());
    }

    /** @test */
    public function it_checks_if_employee_is_manager()
    {
        $manager = Employee::factory()->create();
        $subordinate = Employee::factory()->create(['manager_id' => $manager->id]);
        $individual = Employee::factory()->create();

        $this->assertTrue($manager->isManager());
        $this->assertFalse($subordinate->isManager());
        $this->assertFalse($individual->isManager());
    }

    /** @test */
    public function it_calculates_age_attribute()
    {
        $employee = Employee::factory()->create([
            'birth_date' => now()->subYears(30),
        ]);

        $this->assertEquals(30, $employee->age);
    }

    /** @test */
    public function it_calculates_years_of_service_attribute()
    {
        $employee = Employee::factory()->create([
            'hire_date' => now()->subYears(5),
        ]);

        $this->assertEquals(5, $employee->years_of_service);
    }

    /** @test */
    public function it_checks_system_access()
    {
        $employeeWithUser = Employee::factory()->create([
            'user_id' => User::factory()->create()->id,
        ]);

        $employeeWithoutUser = Employee::factory()->create([
            'user_id' => null,
        ]);

        $this->assertTrue($employeeWithUser->hasSystemAccess());
        $this->assertFalse($employeeWithoutUser->hasSystemAccess());
    }

    /** @test */
    public function it_uses_employee_id_as_route_key()
    {
        $employee = Employee::factory()->create(['employee_id' => 'KF2025001']);

        $this->assertEquals('employee_id', $employee->getRouteKeyName());
        $this->assertEquals('KF2025001', $employee->getRouteKey());
    }

    /** @test */
    public function it_hides_sensitive_attributes()
    {
        $employee = Employee::factory()->create([
            'national_id' => '1234567890123456',
            'tax_id' => '12.345.678.9-123.456',
        ]);

        $array = $employee->toArray();

        $this->assertArrayNotHasKey('national_id', $array);
        $this->assertArrayNotHasKey('tax_id', $array);
    }

    /** @test */
    public function it_casts_dates_properly()
    {
        $employee = Employee::factory()->create([
            'birth_date' => '1990-01-01',
            'hire_date' => '2020-01-01',
        ]);

        $this->assertInstanceOf(\Carbon\Carbon::class, $employee->birth_date);
        $this->assertInstanceOf(\Carbon\Carbon::class, $employee->hire_date);
    }
}