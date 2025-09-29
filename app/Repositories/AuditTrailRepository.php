<?php

namespace App\Repositories;

use App\Models\AuditTrail;
use App\Traits\RepositoryTrait;
use Carbon\Carbon;

class AuditTrailRepository extends Repository
{
    use RepositoryTrait;

    protected $query;

    public function __construct()
    {
        $this->query = AuditTrail::query();
    }

    public function fetchList(array $filter, bool $export = false)
    {
        $search = $filter['search'] ?? '';
        $sortColumn = $filter['sort_column'] ?? 'created_at';
        $sortOrder = $filter['sort_order'] ?? 'desc';
        $query = $this->query;

        if ($export) {
            $query = AuditTrail::query();
        }

        $query->select();

        if ($search) {
            $query->where(
                fn ($query) => $query->where('performed_by_name', 'LIKE', "%{$search}%")
            );
        }

        if (isset($filter['action'])) {
            $query->where('action', $filter['action']);
        }

        if (isset($filter['performed_by_id'])) {
            $query->where('performed_by_id', $filter['performed_by_id']);
        }

        if (isset($filter['start_date'])) {
            $startDate = Carbon::parse($filter['start_date'])->startOfDay();
            $query->where('created_at', '>=', $startDate);
        }

        if (isset($filter['end_date'])) {
            $endDate = Carbon::parse($filter['end_date'])->endOfDay();
            $query->where('created_at', '<=', $endDate);
        }

        $query->orderBy($sortColumn, $sortOrder);

        if ($export) {
            return $query;
        }

        $this->query = $query;

        return $this;
    }
}
