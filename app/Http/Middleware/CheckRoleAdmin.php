<?php

namespace App\Http\Middleware;

use Closure;

class CheckRoleAdmin
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
        if ($user && $user->role != 'ROLE_ADMIN') {
            return redirect('home');
        }
        if (empty($user)) {
            return redirect('home');
        }

        return $next($request);
    }
}
