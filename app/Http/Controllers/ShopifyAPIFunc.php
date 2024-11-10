<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class ShopifyAPIFunc extends Controller
{
    //

    public function get_products($page = 1, $count = 10)
    {

        $user = Auth::user();

        $page = $count * ($page - 1);

        $query = "query {
                    products(first: $count) {
                        nodes {
                        id
                        handle
                        title
                        description
                        totalInventory
                        priceRange {
                            maxVariantPrice {
                            amount
                            currencyCode
                            }
                            minVariantPrice {
                            amount
                            currencyCode
                            }
                        }
                        collections(first: 250) {
                            edges {
                            node {
                                id
                                title
                            }
                            }
                        }
                        images(first: 10) {
                            edges {
                            node {
                                url
                            }
                            }
                        }
                        featuredImage {
                            url
                        }
                        variants(first: 250) {
                            edges {
                            node {
                                id
                                title
                                product {
                                featuredImage {
                                    url
                                }
                                }
                                price
                            }
                            }
                        }
                        }
                    }
                    }


        ";

        $response = $this->getresponsefromshopify($query);

        $response = $response->json();

        return $products = $response['data']['products']['nodes'];
    }

    public function getResponseFromShopify($query)
    {

        $user = Auth::user();

        $user['role'] = $user->getRoleNames()->first();

        if ($user) {
            $shop = $user->name;
            $access_token = $user->password;
        }

        return $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $access_token
        ])->post("https://$shop/admin/api/" . env('SHOPIFY_API_VERSION') . "/graphql.json", [
            "query" => $query
        ]);
    }


}
