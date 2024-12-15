<?php

namespace App\Http\Controllers;

use App\Models\ProductManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SellerController extends Controller
{
    //


    public function index()
    {

        if(!Auth::user()->hasRole('seller')){
            return redirect(route('home'));
        }

        $auth = Auth::user();

        $importedProducts = (new ProductManagement())->getProducts();

        dd($importedProducts);

        return Inertia::render('Seller/Dashboard', ['auth' => $auth]);
    }

    public function products()
    {
        if(!Auth::user()->hasRole('vendor')){
            return redirect(route('home'));
        }

        $products = (new ShopifyAPIFunc)->get_products();

        foreach ($products as $key => $product) {
            $products[$key]['id'] = $product['id'];
            $products[$key]['handle'] = $product['handle'];
            $products[$key]['title'] = $product['title'];
            $products[$key]['description'] = $product['description'];
            $products[$key]['totalInventory'] = $product['totalInventory'];
            $products[$key]['price'] = $product['priceRange']['maxVariantPrice']['amount'];
            $products[$key]['currencyCode'] = $product['priceRange']['maxVariantPrice']['currencyCode'];
            $products[$key]['collections'] = array_map(function($collection) {
                return [
                    'id' => $collection['node']['id'],
                    'title' => $collection['node']['title']
                ];
            }, $product['collections']['edges']);
            $products[$key]['images'] = array_map(function($image) {
                return $image['node']['url'];
            }, $product['images']['edges']);
            $products[$key]['featuredImage'] = $product['featuredImage']['url'];
            $products[$key]['variants'] = array_map(function($variant) {
                return [
                    'id' => $variant['node']['id'],
                    'title' => $variant['node']['title'],
                    'price' => $variant['node']['price'],
                    'featuredImage' => $variant['node']['product']['featuredImage']['url']
                ];
            }, $product['variants']['edges']);
        }

        return Inertia::render('Vendor/Products',[
            'products' => $products
        ]);
    }

    public function importproduct(Request $request)
    {



        dd($request);
    }

    public function seller_login_create(){

        return Inertia::render('Seller/Login');
    }

    public function seller_login_store(Request $request){

        $validation = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if(Auth::attempt($validation)){
            return redirect(route('seller.dashboard'));
        }

        return Inertia::render('Seller/Login',[
            'errors' => collect([
            'email' => 'The provided credentials do not match our records.',
            'password' => 'The provided credentials do not match our records.'
            ])
        ]);
    }

    public function seller_logout()
    {
        Auth::logout();
        return redirect(route('seller.login'));
    }

}
