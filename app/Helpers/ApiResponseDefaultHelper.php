<?php

namespace App\Helpers;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\MessageBag;

class ApiResponseDefaultHelper
{
    public const VALIDATOR_FAILS = Response::HTTP_UNPROCESSABLE_ENTITY;

    public const VALIDATOR_FAILS_MESSAGE = 'validator fails';

    public function __construct(
        private $data,
        public int $status = Response::HTTP_OK,
        public string $message = 'Success',
        public array $meta = [],
        public array $links = []
    ) {
        $this->setData($data);
    }

    public function selector(): void
    {
        if ($this->data instanceof MessageBag) {
            $this->setStatus(self::VALIDATOR_FAILS)
                ->setMessage(self::VALIDATOR_FAILS_MESSAGE)
                ->setData($this->data->all());
        } elseif ($this->data instanceof LengthAwarePaginator || $this->data instanceof Paginator) {
            $this->setPaginatedData($this->data);
        } elseif ($this->data instanceof AnonymousResourceCollection && $this->data->resource instanceof LengthAwarePaginator) {
            $this->setPaginatedData($this->data, true);
        } else {
            $this->setData(collect($this->data))
                ->setMeta([]);
        }
    }

    private function setPaginatedData($data, bool $isResourceCollection = false): void
    {
        $resource = $isResourceCollection ? $data->resource : $data;

        $this->setData($isResourceCollection ? $data->collection : $data->items())
            ->setMeta([
                'pagination' => [
                    'total' => $resource->total(),
                    'current_page' => $resource->currentPage(),
                    'last_page' => $resource->lastPage(),
                    'has_more_page' => $resource->hasMorePages(),
                    'from' => $data->firstItem() ?? 0,
                    'to' => $data->lastItem() ?? 0,
                ],
            ]);
    }

    public function make(): array
    {
        $this->selector();

        $response = [
            'status' => $this->status,
            'message' => $this->message,
        ];

        // if it's error status (4xx or 5xx), then use `errors` as property name
        // otherwise, it's `data`
        if ($this->status >= 400 && $this->status < 600) {
            $response['errors'] = $this->data;
        } else {
            $response['data'] = $this->data;
        }

        if (isAssoc($this->meta)) {
            $response['meta'] = $this->meta;
        }

        if (isAssoc($this->links)) {
            $response['links'] = $this->links;
        }

        return $response;
    }

    public function setData($data): self
    {
        $this->data = $data ?? null;

        return $this;
    }

    public function setMeta(?array $meta): self
    {
        $this->meta = $meta ? array_merge($this->meta, $meta) : [];

        return $this;
    }

    public function setLinks(array $links): self
    {
        $this->links = $links;

        return $this;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }
}
