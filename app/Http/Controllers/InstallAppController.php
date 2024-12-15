<?php

namespace App\Http\Controllers;

use App\Models\User;
use Gnikyt\BasicShopifyAPI\BasicShopifyAPI;
use Gnikyt\BasicShopifyAPI\Options;
use Gnikyt\BasicShopifyAPI\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InstallAppController extends Controller
{
    //
    public function index(){

        if(Auth::check()){

            $auth = Auth::user();

            // dd($auth->getRoleNames());
            // return redirect()->route('seller/dashboard');
        }

        return Inertia::render('ShopifyApp/InstallApp');
    }

    public function store(Request $request){

        $request->validate([
            'shop' => 'required',
        ]);

        $options = new Options();
        $options->setVersion('2020-01');
        $options->setApiKey(env('SHOPIFY_API_KEY'));
        $options->setApiSecret(env('SHOPIFY_API_SECRET'));

        // Create the client and session
        $api = new BasicShopifyAPI($options);
        $api->setSession(new Session($request->shop, env('SHOPIFY_APP_SECRET')));

        $redirect = $api->getAuthUrl(env('SHOPIFY_API_SCOPES'), env('SHOPIFY_API_REDIRECT_URI'), 'per-user');

        return Inertia::location($redirect);

    }

    public function destory(Request $request){
        $shop = Auth::user(); // Assuming the shop is the authenticated user

        if ($shop) {
            // Delete the shop's data from your database
            User::where('id', $shop->id)->delete();

            // Additional clean-up logic (e.g., revoke API tokens or clear caches if needed)
            return response()->json(['message' => 'App uninstalled successfully.'], 200);
        }

        return response()->json(['message' => 'Shop not found.'], 404);
    }

    public function handleAppUninstalled(Request $request){
        // Handle the app uninstalled event
        $shopDomain = $request->header('X-Shopify-Shop-Domain');

        if ($shopDomain) {
            User::where('name', $shopDomain)->delete();

            return response()->json(['message' => 'App uninstalled and data deleted successfully.'], 200);
        }

        return response()->json(['message' => 'Shop not found.'], 404);
    }
}
