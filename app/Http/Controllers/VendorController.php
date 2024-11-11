<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VendorController extends Controller
{
    //


    public function index()
    {

        if(!Auth::user()->hasRole('vendor')){
            return redirect(route('home'));
        }

        return Inertia::render('Vendor/Dashboard');
    }

    public function products($afterpage = null)
    {
        if(!Auth::user()->hasRole('vendor')){
            return redirect(route('home'));
        }

        // dd($afterpage);

        if($afterpage){
            // $afterpage = $afterpage;
            $getProducts = (new ShopifyAPIFunc)->get_products(10, $afterpage);
        }else{
            // $afterpage = 1;
            $getProducts = (new ShopifyAPIFunc)->get_products(10, '');
        }


        // dd($getProducts);

        $products = $getProducts['products']['nodes'];

        $productsCount = $getProducts['productsCount']['count'];

        $pageInfo = $getProducts['products']['pageInfo'];

        // $totalProductCount = (new ShopifyAPIFunc)->getTotalProductCount();

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
            $products[$key]['featuredImage'] = $product['featuredImage']['url']??[];
            $products[$key]['variants'] = array_map(function($variant) {
                return [
                    'id' => $variant['node']['id'],
                    'title' => $variant['node']['title'],
                    'price' => $variant['node']['price'],
                    'featuredImage' => $variant['node']['product']['featuredImage']['url']??[]
                ];
            }, $product['variants']['edges']);
        }



        return Inertia::render('Vendor/Products',[
            'products' => $products,
            'pageInfo' => $pageInfo,
            'productsCount' => $productsCount
        ]);
    }

    public function importproduct(Request $request)
    {



        dd($request);
    }
}
