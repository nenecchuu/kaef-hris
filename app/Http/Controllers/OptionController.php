<?php

namespace App\Http\Controllers;

use App\Models\Division;
use App\Models\JobPosition;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OptionController extends Controller
{
    public function divisions(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string'],
        ]);

        $sites = Division::query()
            ->select('id', 'name')
            ->when(
                $request->query('search'),
                fn ($query) => $query->where('name', 'ilike', '%'.$request->query('search').'%')
            )
            ->orderBy('name', 'asc')
            ->get();

        return api_response()->success(JsonResource::collection($sites));
    }

    public function job_positions(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string'],
        ]);

        $sites = JobPosition::query()
            ->select('id', 'name')
            ->when(
                $request->query('search'),
                fn ($query) => $query->where('name', 'ilike', '%'.$request->query('search').'%')
            )
            ->orderBy('name', 'asc')
            ->get();

        return api_response()->success(JsonResource::collection($sites));
    }

    public function users(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string'],
        ]);

        $sites = User::query()
            ->select('id', 'name')
            ->when(
                $request->query('search'),
                fn ($query) => $query->where('name', 'ilike', '%'.$request->query('search').'%')
            )
            ->orderBy('name', 'asc')
            ->get();

        return api_response()->success(JsonResource::collection($sites));
    }
}
