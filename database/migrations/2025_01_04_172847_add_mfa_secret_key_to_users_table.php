<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMfaSecretKeyToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'mfa_secret_key')) {
                $table->string('mfa_secret_key')->nullable()->after('description');
            }
            if (! Schema::hasColumn('users', 'is_mfa_enabled')) {
                $table->boolean('is_mfa_enabled')->default(0)->after('mfa_secret_key');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'mfa_secret_key')) {
                $table->dropColumn('mfa_secret_key');
            }
            if (Schema::hasColumn('users', 'is_mfa_enabled')) {
                $table->dropColumn('is_mfa_enabled');
            }
        });
    }
}
