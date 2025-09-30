<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\EmployeeService;
use App\Repositories\EmployeeRepository;
use App\Models\Employee;

class EmployeeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Bind EmployeeRepository
        $this->app->bind(EmployeeRepository::class, function ($app) {
            return new EmployeeRepository(new Employee());
        });

        // Bind EmployeeService
        $this->app->bind(EmployeeService::class, function ($app) {
            return new EmployeeService($app->make(EmployeeRepository::class));
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
