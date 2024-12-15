<?php

namespace App\Http\Controllers;

use App\Models\ProductManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use ShopifyAPI;

class VendorController extends Controller
{
    //


    public function index()
    {

        if (!Auth::user()->hasRole('vendor')) {
            return redirect(route('home'));
        }

        // Get Store Existing Products
        $productData = $this->getproducts();

        // Get Store Import Products
        $storeImportProduct = $this->importedproduct();

        $productData['importproducts'] = count($storeImportProduct ?? []) > 0 ? $storeImportProduct : [];

        return Inertia::render('Vendor/Dashboard', ['productsData' => $productData]);
    }

    public function products(Request $request)
    {

        // Check if the user is a vendor; if not, redirect to the home page
        if (!Auth::user()->hasRole('vendor')) {
            return redirect(route('home'));
        }

        // Get the "after" parameter from the request
        $afterpage = $request->after;

        // Fetch products with pagination
        $getProducts = (new ShopifyAPIFunc)->getProducts(10, $afterpage);

        // Extract product nodes, count, and pagination info
        $products = $getProducts['products']['nodes'] ?? [];
        $productsCount = $getProducts['productsCount']['count'] ?? 0;
        $pageInfo = $getProducts['products']['pageInfo'] ?? [];

        // Transform products for the frontend
        $products = array_map(function ($product) {
            return [
                'id' => $product['id'],
                'handle' => $product['handle'],
                'title' => $product['title'],
                'description' => $product['description'],
                'totalInventory' => $product['totalInventory'],
                'price' => $product['priceRange']['maxVariantPrice']['amount'],
                'currencyCode' => $product['priceRange']['maxVariantPrice']['currencyCode'],
                'collections' => array_map(function ($collection) {
                    return [
                        'id' => $collection['node']['id'],
                        'title' => $collection['node']['title'],
                    ];
                }, $product['collections']['edges'] ?? []),
                'images' => array_map(function ($image) {
                    return $image['node']['url'];
                }, $product['images']['edges'] ?? []),
                'featuredImage' => $product['featuredImage']['url'] ?? null,
                'variants' => array_map(function ($variant) {
                    return [
                        'id' => $variant['node']['id'],
                        'title' => $variant['node']['title'],
                        'price' => $variant['node']['price'],
                        'featuredImage' => $variant['node']['product']['featuredImage']['url'] ?? null,
                    ];
                }, $product['variants']['edges'] ?? []),
                'isImported' => (new ProductManagement)->where('shopify_product_id', $product['id'])->exists(),
                'isImportedStatus' => (new ProductManagement)->getImportedProductStatus($product['id']),
            ];
        }, $products);

        // Return the response to the Inertia view
        return Inertia::render('Vendor/Products', [
            'products' => $products,
            'pageInfo' => $pageInfo,
            'productsCount' => $productsCount,
        ]);
    }

    public function getproducts($afterpage = null)
    {
        if (!Auth::user()->hasRole('vendor')) {
            return redirect(route('home'));
        }

        // Fetch products with pagination
        $getProducts = (new ShopifyAPIFunc)->getProducts(10, $afterpage);

        // Extract product nodes, count, and pagination info
        $products = $getProducts['products']['nodes'] ?? [];
        $productsCount = $getProducts['productsCount']['count'] ?? 0;
        $pageInfo = $getProducts['products']['pageInfo'] ?? [];

        // Transform products for the frontend
        $products = array_map(function ($product) {
            return [
                'id' => $product['id'],
                'handle' => $product['handle'],
                'title' => $product['title'],
                'description' => $product['description'],
                'totalInventory' => $product['totalInventory'],
                'price' => $product['priceRange']['maxVariantPrice']['amount'],
                'currencyCode' => $product['priceRange']['maxVariantPrice']['currencyCode'],
                'collections' => array_map(function ($collection) {
                    return [
                        'id' => $collection['node']['id'],
                        'title' => $collection['node']['title'],
                    ];
                }, $product['collections']['edges'] ?? []),
                'images' => array_map(function ($image) {
                    return $image['node']['url'];
                }, $product['images']['edges'] ?? []),
                'featuredImage' => $product['featuredImage']['url'] ?? null,
                'variants' => array_map(function ($variant) {
                    return [
                        'id' => $variant['node']['id'],
                        'title' => $variant['node']['title'],
                        'price' => $variant['node']['price'],
                        'featuredImage' => $variant['node']['product']['featuredImage']['url'] ?? null,
                    ];
                }, $product['variants']['edges'] ?? []),
            ];
        }, $products);

        // Check if product is already imported
        $importedProductIds = (new ProductManagement)->getImportedProductIds();
        $products = array_map(function ($product) use ($importedProductIds) {
            $isImported = in_array($product['id'], $importedProductIds);
            $isImportedStatus = (new ProductManagement)->getImportedProductStatus($product['id']);
            return [
                'id' => $product['id'],
                'handle' => $product['handle'],
                'title' => $product['title'],
                'description' => $product['description'],
                'totalInventory' => $product['totalInventory'],
                'price' => $product['priceRange']['maxVariantPrice']['amount'] ?? '',
                'currencyCode' => $product['priceRange']['maxVariantPrice']['currencyCode'] ?? '',
                'collections' => array_map(function ($collection) {
                    return [
                        'id' => $collection['node']['id'],
                        'title' => $collection['node']['title'],
                    ];
                }, $product['collections']['edges'] ?? []),
                'images' => array_map(function ($image) {
                    return $image['node']['url'];
                }, $product['images']['edges'] ?? []),
                'featuredImage' => $product['featuredImage']['url'] ?? null,
                'variants' => array_map(function ($variant) {
                    return [
                        'id' => $variant['node']['id'],
                        'title' => $variant['node']['title'],
                        'price' => $variant['node']['price'],
                        'featuredImage' => $variant['node']['product']['featuredImage']['url'] ?? null,
                    ];
                }, $product['variants']['edges'] ?? []),
                'isImported' => $isImported,
                'isImportedStatus' => $isImportedStatus
            ];
        }, $products);

        return [
            'products' => $products,
            'pageInfo' => $pageInfo,
            'productsCount' => $productsCount,
        ];
    }

    public function importproduct(Request $request)
    {
        if (!Auth::user()->hasRole('vendor')) {
            return redirect(route('home'));
        }

        $id = $request->all();

        $product = (new ShopifyAPIFunc)->getProduct($id);

        // dd($product);

        (new ProductManagement)->addProduct($product);

        return redirect(route('vendor.products'));
    }


    public function importedproduct()
    {
        if (!Auth::user()->hasRole('vendor')) {
            return redirect(route('home'));
        }

        return $products = (new ProductManagement())->getProducts();
    }

    public function productdetails(Request $request)
    {
        if (!Auth::user()->hasRole('vendor')) {
            return redirect(route('home'));
        }

        $id = $request->all();

        return $product = (new ShopifyAPIFunc)->getProduct($id);
    }
}

