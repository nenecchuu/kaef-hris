<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsTeamLeadAndIsHeadDivisionToJobPositionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_positions', function (Blueprint $table) {
            if (! Schema::hasColumn('job_positions', 'is_team_lead')) {
                $table->boolean('is_team_lead')->default(false)->after('description');
            }

            if (! Schema::hasColumn('job_positions', 'is_head_division')) {
                $table->boolean('is_head_division')->default(false)->after('is_team_lead');
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
        Schema::table('job_positions', function (Blueprint $table) {
            if (Schema::hasColumn('job_positions', 'is_team_lead')) {
                $table->dropColumn('is_team_lead');
            }

            if (Schema::hasColumn('job_positions', 'is_head_division')) {
                $table->dropColumn('is_head_division');
            }
        });
    }
}
