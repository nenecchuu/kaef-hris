<?php

namespace App\Http\Controllers;

use App\Models\MasterApplication;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

/**
 * @group Master Application
 *
 * APIs for Master Application module
 */
class MasterApplicationController extends Controller
{
    /**
     * Get all master application
     */
    public function get_all()
    {
        $data = MasterApplication::select('id', 'name')->get();

        return apiResponse(
            Response::HTTP_OK,
            'Get all master application',
            JsonResource::make($data)
        );
    }
}
