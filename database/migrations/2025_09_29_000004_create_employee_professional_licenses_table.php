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
        Schema::create('employee_professional_licenses', function (Blueprint $table) {
            $table->id();

            // Employee relationship
            $table->foreignId('employee_id')
                ->constrained('employees')
                ->onDelete('cascade')
                ->comment('Employee reference');

            // License details
            $table->string('license_name')->comment('Name of the professional license');
            $table->string('license_number', 100)->comment('License number/ID');
            $table->string('issuing_authority')->comment('Authority that issued the license');
            $table->date('issue_date')->comment('Date when license was issued');
            $table->date('expiry_date')->comment('Date when license expires');
            $table->enum('license_status', [
                'active', 'expired', 'suspended', 'revoked'
            ])->default('active')->comment('Current status of the license');

            // System fields
            $table->timestamps();

            // Indexes for performance
            $table->index('employee_id', 'idx_employee_licenses_employee_id');
            $table->index('expiry_date', 'idx_employee_licenses_expiry_date');
            $table->index('license_status', 'idx_employee_licenses_status');
            $table->index('license_name', 'idx_employee_licenses_name');

            // Composite index for expiry monitoring
            $table->index(['license_status', 'expiry_date'], 'idx_employee_licenses_status_expiry');

            // Unique constraint to prevent duplicate licenses
            $table->unique(['employee_id', 'license_number'], 'unq_employee_license_number');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_professional_licenses');
    }
};