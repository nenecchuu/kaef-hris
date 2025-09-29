<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterApplicationUserPivotTable extends Migration
{
    public function up()
    {
        Schema::create('master_application_user', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('master_application_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('master_application_user');
    }
}
