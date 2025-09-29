<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Auth\AuthenticationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->renderable(function (ValidationException $e, $request) {
            if ($request->is('api/*')) {
                return api_response()->error(
                    $e->errors(),
                    $e->status,
                    $e->getMessage()
                );
            }
        });

        $this->renderable(function (AccessDeniedHttpException $e, $request) {
            if ($request->is('api/*')) {
                return api_response()->error(
                    null,
                    $e->getStatusCode(),
                    'You are not authorized to access this API.'
                );
            }
        });

        $this->renderable(function (HttpException $e, $request) {
            if ($request->is('api/*')) {
                return api_response()->error(
                    null,
                    $e->getStatusCode(),
                    $e->getStatusCode() === Response::HTTP_FORBIDDEN ? 'You are not authorized to access this API.' : $e->getMessage()
                );
            }
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                if ($e->getPrevious() instanceof ModelNotFoundException) {
                    $modelPathname = explode(
                        '\\',
                        $e->getPrevious()->getModel()
                    );
                    $modelName =
                        array_pop($modelPathname) === 'Working'
                        ? 'Task'
                        : array_pop($modelPathname);

                    return api_response()->error(
                        null,
                        $e->getStatusCode(),
                        "{$modelName} not found."
                    );
                }

                return api_response()->error(
                    null,
                    $e->getStatusCode(),
                    'API not found'
                );
            }
        });

        $this->renderable(function (AuthenticationException $exception, $request) {
            return $this->shouldReturnJson($request, $exception)
                ? response()->json(['message' => $exception->getMessage()], 401)
                : redirect()->guest(route('auth'));
        });
    }
}
