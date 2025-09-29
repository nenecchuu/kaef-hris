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
        Schema::create('employee_education_history', function (Blueprint $table) {
            $table->id();

            // Employee relationship
            $table->foreignId('employee_id')
                ->constrained('employees')
                ->onDelete('cascade')
                ->comment('Employee reference');

            // Education details
            $table->string('institution_name')->comment('Educational institution name');
            $table->enum('degree_level', [
                'elementary', 'junior_high', 'senior_high', 'diploma_1', 'diploma_2',
                'diploma_3', 'diploma_4', 'bachelor', 'master', 'doctoral'
            ])->comment('Level of education degree');
            $table->string('field_of_study')->nullable()->comment('Major or field of study');
            $table->year('graduation_year')->nullable()->comment('Year of graduation');
            $table->decimal('gpa', 3, 2)->nullable()->comment('Grade Point Average');
            $table->boolean('is_verified')->default(false)->comment('Whether education is verified by HR');
            $table->string('location')->nullable()->comment('Institution location');

            // System fields
            $table->timestamps();

            // Indexes for performance
            $table->index('employee_id', 'idx_employee_education_employee_id');
            $table->index('degree_level', 'idx_employee_education_degree_level');
            $table->index('graduation_year', 'idx_employee_education_graduation_year');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_education_history');
    }
};