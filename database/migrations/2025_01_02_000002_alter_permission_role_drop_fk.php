<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPermissionRoleDropFK extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('permission_role', function (Blueprint $table) {
            // Drop the foreign key for role_id
            $table->dropForeign('role_id_fk_10319849');

            // Drop the foreign key for permission_id
            $table->dropForeign('permission_id_fk_10319849');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('permission_role', function (Blueprint $table) {
            // Add the foreign key for role_id
            $table->foreign('role_id', 'role_id_fk_10319849')
                ->references('id')->on('roles')
                ->onDelete('cascade');

            // Add the foreign key for permission_id
            $table->foreign('permission_id', 'permission_id_fk_10319849')
                ->references('id')->on('permissions')
                ->onDelete('cascade');
        });
    }
}
