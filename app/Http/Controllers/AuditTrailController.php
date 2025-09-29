<?php

namespace App\Http\Controllers;

use App\Exports\AuditTrailExport;
use App\Http\Requests\AuditTrail\PaginateRequest;
use App\Http\Resources\AuditTrailResource;
use App\Repositories\AuditTrailRepository;
use Illuminate\Http\Response;

/**
 * @group User
 *
 * APIs for User module
 */
class AuditTrailController extends Controller
{
    protected $repository;

    public function __construct(AuditTrailRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * GET list of auditTrails
     *
     * @queryParam limit int
     * @queryParam page int
     * @queryParam search string Search data by name, email or phone_number
     * @queryParam sort_column string Target sort column: name, email, phone_number. Example: created_at
     * @queryParam sort_order string Sort type asc or desc. Example: desc
     */
    public function paginate(PaginateRequest $request)
    {
        $filter = $request->validated();

        $auditTrails = $this->repository->fetchList($filter);

        $limit = (int) ($filter['limit'] ?? 10);
        if ($limit !== -1) {
            $auditTrails = $auditTrails->paginate(
                $limit,
                $filter['page'] ?? 1
            );
        } else {
            $auditTrails = $auditTrails->get();
        }

        return apiResponse(
            Response::HTTP_OK,
            'Fetch audit trails list successful',
            AuditTrailResource::collection($auditTrails)
        );
    }

    public function export(PaginateRequest $request)
    {
        $auditTrails = new AuditTrailExport($request);

        return $auditTrails->download($this->generateExcelName());
    }

    protected function generateExcelName()
    {
        $date = now()->format('d_F_y');
        $supervisor = auth()->user()->name;

        return "Supervisee_Tasks_{$supervisor}_{$date}.xlsx";
    }
}
