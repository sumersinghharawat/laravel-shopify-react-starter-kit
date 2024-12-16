<?php

namespace App\Http\Controllers;

use App\Http\Controllers\MargApiController as ControllersMargApiController;
use MargApiController;
use Gnikyt\BasicShopifyAPI\BasicShopifyAPI;
use Gnikyt\BasicShopifyAPI\Options;
use Gnikyt\BasicShopifyAPI\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ShopifyAppController extends Controller
{
    //

    public function index()
    {
        $user = auth()->user();

        if (!$user) {
            return Inertia::render('Auth/Login');
        }

        $products = $this->getProducts(250);

        return Inertia::render('Dashboard', ['marg' => $this->MargData(), 'products' => $products]);
    }

    public function appinstallation(Request $request)
    {
        return Inertia::render('ShopifyApp/InstallApplication');
    }

    public function appinstalling(Request $request)
    {

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

    // Marg Data
    public function MargData()
    {
        $data = "Huy7X7t6Wh20ILOL + yeIJURFcdKxrwwmi5OhVH2aJSWnby33jtrifjaZZFKISRGwltUTuJAiMs3mwE03Y + JkFoHylnOcubix2FiVx6pcoOYtDTEZ0bjYf2ro0QkH7KPOna + eHnYFO4VTIOoazBmySww0MhsYn + 0dIh81OiteCAkwshZobwgWjTVIQA / wB9ik8t7y1OV1PMIl9R1LtogTu1N2XpnZ6 / nnw59ukRGtpxtxviRsArOVQ1DmkY5RYiYql8S1fEpqudjUD0XnlpS0uITgoEvciJFxbw8qaMPMHXx5OORLiL8PvcqxPQfMllMXT / GZaHEaYJiT711YfKupEF3DAZ + Laz43zoopxDbZDkEwt5YDIMmWyF2p9t7C6WwybgdEkodDqp8tbCbLgBug / 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";
        $key = "690QIDCX1WU1";

        $decryptedData = ControllersMargApiController::decrypt($data, $key);
        $decompressedData = ControllersMargApiController::decompress($decryptedData);

        return $decompressedData; // Decode the JSON data and return it as a response;
    }



    public function getProducts($count = 10, $after = "", $before = "")
    {

        $user = Auth::user();

        if ($after && $before) {
            $pagination = 'first: ' . $count . ' after: "' . $after . '" before: "' . $before . '"';
        } elseif ($after) {
            $pagination = 'first: ' . $count . ' after: "' . $after . '"';
        } elseif ($before) {
            $pagination = 'first: ' . $count . ' before: "' . $before . '"';
        } else {
            $pagination = 'first: ' . $count;
        }

        // dd($after);

        $query = "query {
                    products($pagination) {
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
                        pageInfo {
                        endCursor
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        }
                    }
                        productsCount {
                            count
                        }
                    }


        ";

        $response = $this->getresponsefromshopify($query);

        $response = $response->json();

        // dd($response);

        return $products = $response['data'];
    }


    public function getResponseFromShopify($query)
    {

        $user = Auth::user();

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
