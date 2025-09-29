<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditTrailsTable extends Migration
{
    public function up()
    {
        Schema::create('audit_trails', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('action');
            $table->string('domain')->nullable();
            $table->foreignId('affected_row_id')->nullable();
            $table->string('affected_row_name')->nullable();
            $table->foreignId('performed_by_id');
            $table->string('performed_by_name');
            $table->json('changes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('audit_trails');
    }
}
