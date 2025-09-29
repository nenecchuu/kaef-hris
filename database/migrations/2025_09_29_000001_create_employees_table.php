<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            // Business identifiers
            $table->string('employee_id', 50)->unique()->comment('Business identifier (e.g., KF2024001)');
            $table->string('employee_number', 50)->unique()->comment('PT Kimia Farma internal employee number');

            // Personal information
            $table->string('full_name')->comment('Complete legal name per Indonesian employment records');
            $table->string('preferred_name')->nullable()->comment('Preferred display name for workplace use');
            $table->date('birth_date')->comment('Date of birth for age calculations');
            $table->string('national_id', 50)->unique()->nullable()->comment('Indonesian KTP number');
            $table->string('tax_id', 50)->nullable()->comment('NPWP number for tax purposes');

            // Contact information
            $table->string('email')->unique()->comment('Professional email address');
            $table->string('phone', 50)->comment('Primary contact number');
            $table->string('emergency_contact_name')->nullable()->comment('Emergency contact person');
            $table->string('emergency_contact_phone', 50)->nullable()->comment('Emergency contact number');
            $table->text('address')->nullable()->comment('Current residential address');

            // Employment information
            $table->enum('employment_status', [
                'active', 'inactive', 'terminated', 'on_leave', 'probation', 'contract', 'suspended'
            ])->default('active')->comment('Current employment status');
            $table->enum('employment_type', [
                'permanent', 'contract', 'intern', 'consultant'
            ])->default('permanent')->comment('Type of employment contract');
            $table->date('hire_date')->comment('Employment start date');
            $table->date('termination_date')->nullable()->comment('Employment end date if applicable');

            // File storage
            $table->string('photo_url', 500)->nullable()->comment('Employee photo for identification');

            // Organizational relationships
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null')
                ->comment('Links to authentication User when employee has system access');

            $table->foreignId('division_id')
                ->constrained('divisions')
                ->onDelete('restrict')
                ->comment('Organizational division assignment');

            $table->foreignId('job_position_id')
                ->constrained('job_positions')
                ->onDelete('restrict')
                ->comment('Current job position');

            $table->foreignId('manager_id')
                ->nullable()
                ->constrained('employees')
                ->onDelete('set null')
                ->comment('Direct supervisor relationship');

            // System fields
            $table->timestamps();
            $table->softDeletes();

            // Performance indexes for frequently searched fields
            $table->index('employment_status', 'idx_employees_employment_status');
            $table->index('division_id', 'idx_employees_division_id');
            $table->index('manager_id', 'idx_employees_manager_id');
            $table->index('email', 'idx_employees_email');
            $table->index('employee_number', 'idx_employees_employee_number');
            $table->index('full_name', 'idx_employees_full_name');
            $table->index('hire_date', 'idx_employees_hire_date');

            // Composite index for common queries
            $table->index(['division_id', 'employment_status'], 'idx_employees_division_status');
            $table->index(['manager_id', 'employment_status'], 'idx_employees_manager_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
};