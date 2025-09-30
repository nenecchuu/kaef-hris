<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Employee;
use App\Models\User;
use App\Models\Division;
use App\Models\JobPosition;
use Laravel\Sanctum\Sanctum;

/**
 * Employee Controller Feature Tests
 *
 * Tests API endpoints for employee management with Indonesian responses
 */
class EmployeeControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected User $testUser;
    protected Division $testDivision;
    protected JobPosition $testJobPosition;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test user with admin privileges
        $this->testUser = User::factory()->administrator()->create();

        // Create test division and job position
        $this->testDivision = Division::factory()->create([
            'name' => 'Test Division'
        ]);

        $this->testJobPosition = JobPosition::factory()->create([
            'name' => 'Test Position'
        ]);

        // Authenticate user
        Sanctum::actingAs($this->testUser);
    }

    /** @test */
    public function it_can_list_employees_with_pagination()
    {
        // Create test employees
        Employee::factory()->count(20)->create([
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        $response = $this->getJson('/api/employees?per_page=10');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'employee_id',
                        'employee_number',
                        'personal_info' => [
                            'full_name',
                            'preferred_name',
                            'birth_date',
                            'age'
                        ],
                        'contact_info' => [
                            'email',
                            'phone',
                            'address'
                        ],
                        'employment_info' => [
                            'employment_status',
                            'employment_status_label',
                            'employment_type',
                            'employment_type_label'
                        ]
                    ]
                ],
                'pagination' => [
                    'current_page',
                    'per_page',
                    'total',
                    'last_page'
                ],
                'message',
                'success'
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Data karyawan berhasil diambil'
            ]);

        // Check pagination
        $this->assertEquals(10, count($response->json('data')));
        $this->assertEquals(1, $response->json('pagination.current_page'));
        $this->assertEquals(10, $response->json('pagination.per_page'));
        $this->assertEquals(20, $response->json('pagination.total'));
    }

    /** @test */
    public function it_can_filter_employees_by_division()
    {
        $anotherDivision = Division::factory()->create(['name' => 'Another Division']);

        // Create employees in different divisions
        Employee::factory()->count(5)->create([
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        Employee::factory()->count(3)->create([
            'division_id' => $anotherDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        $response = $this->getJson("/api/employees?division_id={$this->testDivision->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Data karyawan berhasil diambil'
            ]);

        $this->assertEquals(5, count($response->json('data')));
    }

    /** @test */
    public function it_can_search_employees_by_name()
    {
        Employee::factory()->create([
            'full_name' => 'John Doe',
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        Employee::factory()->create([
            'full_name' => 'Jane Smith',
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        $response = $this->getJson('/api/employees?search=John');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Data karyawan berhasil diambil'
            ]);

        $data = $response->json('data');
        $this->assertEquals(1, count($data));
        $this->assertEquals('John Doe', $data[0]['personal_info']['full_name']);
    }

    /** @test */
    public function it_can_create_new_employee()
    {
        $employeeData = [
            'full_name' => 'Test Employee',
            'email' => 'test@kimiafarma.co.id',
            'phone' => '081234567890',
            'birth_date' => '1990-01-01',
            'address' => 'Test Address',
            'emergency_contact_name' => 'Emergency Contact',
            'emergency_contact_phone' => '081234567891',
            'employment_status' => 'active',
            'employment_type' => 'permanent',
            'hire_date' => '2024-01-01',
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ];

        $response = $this->postJson('/api/employees', $employeeData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'employee_id',
                    'employee_number',
                    'personal_info',
                    'contact_info',
                    'employment_info'
                ]
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Karyawan berhasil ditambahkan'
            ]);

        // Verify employee was created in database
        $this->assertDatabaseHas('employees', [
            'full_name' => 'Test Employee',
            'email' => 'test@kimiafarma.co.id'
        ]);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_employee()
    {
        $response = $this->postJson('/api/employees', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'full_name',
                'email',
                'phone',
                'birth_date',
                'address',
                'emergency_contact_name',
                'emergency_contact_phone',
                'employment_status',
                'employment_type',
                'hire_date',
                'division_id',
                'job_position_id'
            ]);

        // Check Indonesian error messages
        $errors = $response->json('errors');
        $this->assertStringContains('wajib diisi', $errors['full_name'][0]);
        $this->assertStringContains('wajib diisi', $errors['email'][0]);
    }

    /** @test */
    public function it_validates_indonesian_phone_format()
    {
        $employeeData = [
            'full_name' => 'Test Employee',
            'email' => 'test@kimiafarma.co.id',
            'phone' => '1234567890', // Invalid Indonesian format
            'birth_date' => '1990-01-01',
            'address' => 'Test Address',
            'emergency_contact_name' => 'Emergency Contact',
            'emergency_contact_phone' => '081234567891',
            'employment_status' => 'active',
            'employment_type' => 'permanent',
            'hire_date' => '2024-01-01',
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ];

        $response = $this->postJson('/api/employees', $employeeData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['phone']);

        $errors = $response->json('errors');
        $this->assertStringContains('format Indonesia', $errors['phone'][0]);
    }

    /** @test */
    public function it_validates_nik_format()
    {
        $employeeData = [
            'full_name' => 'Test Employee',
            'email' => 'test@kimiafarma.co.id',
            'phone' => '081234567890',
            'birth_date' => '1990-01-01',
            'national_id' => '123456789', // Invalid NIK (too short)
            'address' => 'Test Address',
            'emergency_contact_name' => 'Emergency Contact',
            'emergency_contact_phone' => '081234567891',
            'employment_status' => 'active',
            'employment_type' => 'permanent',
            'hire_date' => '2024-01-01',
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ];

        $response = $this->postJson('/api/employees', $employeeData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['national_id']);

        $errors = $response->json('errors');
        $this->assertStringContains('16 digit', $errors['national_id'][0]);
    }

    /** @test */
    public function it_can_show_employee_details()
    {
        $employee = Employee::factory()->create([
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        $response = $this->getJson("/api/employees/{$employee->employee_id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'employee_id',
                    'employee_number',
                    'personal_info',
                    'contact_info',
                    'employment_info',
                    'organizational_info' => [
                        'division',
                        'job_position'
                    ]
                ]
            ])
            ->assertJson([
                'success' => true,
                'message' => 'Detail karyawan berhasil diambil'
            ]);
    }

    /** @test */
    public function it_returns_404_for_non_existent_employee()
    {
        $response = $this->getJson('/api/employees/NON_EXISTENT_ID');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Karyawan tidak ditemukan'
            ]);
    }

    /** @test */
    public function it_can_update_employee()
    {
        $employee = Employee::factory()->create([
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        $updateData = [
            'full_name' => 'Updated Name',
            'email' => 'updated@kimiafarma.co.id'
        ];

        $response = $this->putJson("/api/employees/{$employee->employee_id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Data karyawan berhasil diperbarui'
            ]);

        // Verify update in database
        $this->assertDatabaseHas('employees', [
            'employee_id' => $employee->employee_id,
            'full_name' => 'Updated Name',
            'email' => 'updated@kimiafarma.co.id'
        ]);
    }

    /** @test */
    public function it_can_delete_employee()
    {
        $employee = Employee::factory()->create([
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        $response = $this->deleteJson("/api/employees/{$employee->employee_id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Karyawan berhasil dihapus'
            ]);

        // Verify soft delete
        $this->assertSoftDeleted('employees', [
            'employee_id' => $employee->employee_id
        ]);
    }

    /** @test */
    public function it_can_get_active_employees_only()
    {
        Employee::factory()->count(5)->active()->create([
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        Employee::factory()->count(3)->create([
            'employment_status' => 'inactive',
            'division_id' => $this->testDivision->id,
            'job_position_id' => $this->testJobPosition->id
        ]);

        $response = $this->getJson('/api/employees/active');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Data karyawan aktif berhasil diambil'
            ]);

        $data = $response->json('data');
        $this->assertEquals(5, count($data));

        // Verify all returned employees are active
        foreach ($data as $employee) {
            $this->assertEquals('active', $employee['employment_info']['employment_status']);
        }
    }

    /** @test */
    public function it_requires_authentication()
    {
        // Remove authentication
        $this->withoutMiddleware();

        $response = $this->getJson('/api/employees');

        $response->assertStatus(401);
    }
}