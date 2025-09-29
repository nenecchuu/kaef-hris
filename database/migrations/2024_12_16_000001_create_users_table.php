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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('phone')->default('');
            $table->string('email')->unique();
            $table->string('ldap_username')->unique();
            $table->string('avatar_path')->default('');
            $table->foreignId('division_id')->default(0);
            $table->foreignId('job_position_id')->default(0);
            $table->foreignId('team_lead_id')->default(0);
            $table->foreignId('head_division_id')->default(0);
            $table->string('description')->default('');
            $table->boolean('is_administrator')->default(0);
            $table->boolean('is_email_blacklisted')->default(0);
            $table->boolean('is_use_mfa')->default(0);;
            $table->boolean('is_team_lead')->default(0);
            $table->string('is_active')->default(1);

            $table->datetime('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('remember_token')->nullable();

            $table->string('two_factor_code')->nullable();
            $table->datetime('two_factor_expires_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
            $table->index(['division_id', 'job_position_id', 'email', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
