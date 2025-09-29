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
        Schema::create('setting_password_complexity', function (Blueprint $table) {
            $table->id('id');
            $table->integer('minimum_limit_character')->default(0);
            $table->integer('password_reuse_limit')->default(0);
            $table->boolean('is_minimum_limit_character')->default(false);
            $table->boolean('is_password_reuse_limit')->default(false);
            $table->boolean('use_capital_letter')->default(false);
            $table->boolean('use_small_letter')->default(false);
            $table->boolean('use_number')->default(false);
            $table->boolean('use_symbol')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('setting_password_complexity');
    }
};
