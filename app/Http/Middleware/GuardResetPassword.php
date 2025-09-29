<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class GuardResetPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$role)
    {
        if ($request->session()->has('is_reset_password_pending')) {
            $request->session()->invalidate();

            return redirect()->route('auth');
        }

        return $next($request);
    }
}
