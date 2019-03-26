<?php

namespace App\Http\Middleware;

use Closure;

class CheckRoleManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();
        if (($user != null) && ($user->role == 'ROLE_ADMIN' || $user->role == 'ROLE_MANAGER')) {
            return $next($request);
        }
        if (! $request->expectsJson()) {
            return route('/tasks');
        }
        return redirect('/tasks');
    }
}
