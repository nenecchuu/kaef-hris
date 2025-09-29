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
        Schema::create('employee_certifications', function (Blueprint $table) {
            $table->id();

            // Employee relationship
            $table->foreignId('employee_id')
                ->constrained('employees')
                ->onDelete('cascade')
                ->comment('Employee reference');

            // Certification details
            $table->string('certification_name')->comment('Name of the certification');
            $table->string('issuing_organization')->comment('Organization that issued the certification');
            $table->date('issue_date')->comment('Date when certification was issued');
            $table->date('expiry_date')->nullable()->comment('Date when certification expires');
            $table->string('certification_number', 100)->nullable()->comment('Certification number/ID');
            $table->boolean('is_active')->default(true)->comment('Whether certification is currently active');
            $table->string('location')->nullable()->comment('Location where certification was obtained');

            // System fields
            $table->timestamps();

            // Indexes for performance
            $table->index('employee_id', 'idx_employee_certifications_employee_id');
            $table->index('expiry_date', 'idx_employee_certifications_expiry_date');
            $table->index('is_active', 'idx_employee_certifications_is_active');
            $table->index('certification_name', 'idx_employee_certifications_name');

            // Composite index for expiry monitoring
            $table->index(['is_active', 'expiry_date'], 'idx_employee_certifications_active_expiry');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_certifications');
    }
};