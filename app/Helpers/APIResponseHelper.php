<?php

namespace App\Helpers;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class APIResponseHelper
{
    /**
     * API success response wrapper
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function success(
        array|object|null $data = null,
        int $status = 0,
        string $message = 'OK',
        ...$args
    ) {
        $body = [
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ];

        // if data is paginated we will return a paginated response
        if ($this->hasPagination($data)) {
            $body['meta'] = $this->meta($data->resource);
        }

        return response()->json($body, Response::HTTP_OK, ...$args);
    }

    /**
     * API error response wrapper
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function error(
        ?array $errors,
        int $statusCode,
        string $message = '',
        ...$args
    ) {
        return response()->json(
            [
                'message' => $message,
                'error' => $errors,
            ],
            $statusCode,
            ...$args
        );
    }

    protected function hasPagination($data)
    {
        $isCollection =
            is_a($data, ResourceCollection::class) ||
            is_a($data, AnonymousResourceCollection::class);

        return $isCollection && $data->resource instanceof LengthAwarePaginator;
    }

    protected function meta(object $paginated): array
    {
        $pagination = Arr::only($paginated->toArray(), [
            'total',
            'current_page',
            'last_page',
            'from',
            'to',
        ]);

        return Arr::add($pagination, 'rows', $paginated->count());
    }
}
