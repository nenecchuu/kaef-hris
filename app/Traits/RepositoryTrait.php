<?php

namespace App\Traits;

trait RepositoryTrait
{
    protected $query;

    /**
     * sort column
     *
     * @param  string  $column  target column to sort
     * @param  string  $column  type of sort ASC or DESC
     * @return class
     */
    public function sort(string $column = 'created_at', string $order = 'desc')
    {
        $this->query->orderBy($column, $order);

        return $this;
    }

    /**
     * get all data
     *
     * @return Collection
     */
    public function get()
    {
        return $this->query->get();
    }

    /**
     * skip row query
     *
     * @param  int  $skip  data per page
     * @return query
     */
    public function skip(int $skip = 10)
    {
        return $this->query->offset($skip);
    }

    /**
     * limit query
     *
     * @param  int  $limit  data per page
     * @return query
     */
    public function limit(int $limit = 10)
    {
        return $this->query->limit($limit);
    }

    /**
     * get paginated data
     *
     * @param  int  $limit  data per page
     * @return LengthAwarePaginator
     */
    public function paginate(int $limit = 10, int $page = 1)
    {
        return $this->query->paginate(perPage: $limit, page: $page);
    }

    /**
     * get row by id
     */
    public function find($id)
    {
        return $this->query->findOrFail($id);
    }

    /**
     * eager load relationship
     */
    public function with($with)
    {
        $this->query->with($with);

        return $this;
    }

    /**
     * get first ordered column
     *
     * return collection
     */
    public function getFirstPosition($column)
    {
        return $this->query
            ->orderBy($column, 'asc')
            ->orderBy('id', 'asc')
            ->first();
    }

    /**
     * get last ordered column
     *
     * return collection
     */
    public function getLastPosition($column)
    {
        return $this->query
            ->orderBy($column, 'desc')
            ->orderBy('id', 'desc')
            ->first();
    }
}
