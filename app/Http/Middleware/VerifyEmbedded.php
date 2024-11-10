<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifyEmbedded
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$request->get('shop')) {
            $auth = Auth::user();

            if($auth){
                $auth->assignRole('vendor');
            }else{

                // dd($request->all());
                // return redirect()->route('home', ['shop' => $request->get('shop')]);
            }
        }else{

            if(Auth::check()){

                $user = Auth::user();

                $roles = $user->getRoleNames();

                if(!count( $roles)){
                    $user->assignRole('vendor');
                }
            }
        }
        return $next($request);
    }
}
