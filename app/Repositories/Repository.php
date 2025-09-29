<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class Repository
{
    /*
        Open Database Transaction
    */
    public function beginTransaction()
    {
        DB::beginTransaction();
    }

    /**
     * Commit Database Transaction
     */
    public function commitTransaction()
    {
        DB::commit();
    }

    /**
     * Rollback Database Transaction
     */
    public function rollbackTransaction()
    {
        DB::rollBack();
    }
}
