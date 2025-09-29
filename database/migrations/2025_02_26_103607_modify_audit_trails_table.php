<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('audit_trails', function (Blueprint $table) {
            // Make performed_by_id nullable
            $table->foreignId('performed_by_id')->nullable()->change();

            // Make performed_by_name nullable
            $table->string('performed_by_name')->nullable()->change();

            // Add description field
            $table->text('description')->nullable()->after('changes');
        });
    }

    public function down()
    {
        Schema::table('audit_trails', function (Blueprint $table) {
            // Revert performed_by_id to not nullable
            $table->foreignId('performed_by_id')->nullable(false)->change();

            // Revert performed_by_name to not nullable
            $table->string('performed_by_name')->nullable(false)->change();

            // Drop the description field
            $table->dropColumn('description');
        });
    }
};
