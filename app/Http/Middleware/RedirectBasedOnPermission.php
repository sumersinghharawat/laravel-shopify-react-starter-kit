<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->hasRole('vendor')) {
                return redirect()->route('vendor.dashboard');
            }


            if ($user->hasRole('seller')) {
                return redirect()->route('seller.dashboard');
            }

            // Default redirect if no matching permissions
            return redirect()->route('home');
        }
        return $next($request);
    }
}
