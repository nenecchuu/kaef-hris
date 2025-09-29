<?php

namespace App\Exports;

use App\Http\Requests\AuditTrail\PaginateRequest;
use App\Repositories\AuditTrailRepository;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AuditTrailExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping, WithStyles
{
    use Exportable;

    protected $request;

    protected $repository;

    public function __construct(PaginateRequest $request)
    {
        $this->request = $request;
        $this->repository = new AuditTrailRepository;
    }

    public function query()
    {
        $filter = $this->request->validated();

        return $this->repository->fetchList($filter, export: true);
    }

    public function headings(): array
    {
        return [
            'Tanggal dan Waktu',
            'Nama User',
            'Action',
            'Deskripsi',
        ];
    }

    public function map($auditTrail): array
    {
        return [
            $auditTrail->formatted_created_at,
            $auditTrail->performed_by_name,
            $auditTrail->action,
            $auditTrail->formatted_description,
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
