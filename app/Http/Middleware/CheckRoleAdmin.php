<?php

namespace App\Http\Middleware;

use Closure;

class CheckRoleAdmin
{
    /**
     * Check whether user has ROLE_ADMIN or not
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();
        if (($user != null) && ($user->role == 'ROLE_ADMIN')) {
            return $next($request);
        }
        if (! $request->expectsJson()) {
            return route('/tasks');
        }
        return redirect('/tasks');
    }
}
