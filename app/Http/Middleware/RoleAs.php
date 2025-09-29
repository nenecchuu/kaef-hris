<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleAs
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    // TODO: IMPORTANT
    public function handle(Request $request, Closure $next, ...$role)
    {
        // $user = $request->user();
        // $userRole = $this->getRole($user);
        // abort_if(! in_array($userRole, $role), Response::HTTP_FORBIDDEN);

        return $next($request);
    }

    // protected function getRole(User $user)
    // {
    //     if ($user->admin_type === null) {
    //         return 'USER';
    //     }

    //     return AdminType::collection()->where('value', $user->admin_type)->first()->name;
    // }
}
