<?php

namespace App\Http\Controllers\GraphQLControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function getProducts(){
        $query = <<<QUERY
            query getProducts {
                products(first:1) {
                    edges {
                        node {
                            category{
                                id
                                name
                            }
                            combinedListingRole
                            compareAtPriceRange{
                                maxVariantCompareAtPrice{
                                    amount
                                    currencyCode
                                }
                                minVariantCompareAtPrice{
                                    amount
                                    currencyCode
                                }
                            }
                            createdAt
                            description
                            featuredMedia{
                                id
                                preview{
                                    image{
                                        url
                                        id
                                    }
                                }
                            }
                            id
                            title
                            handle
                            isGiftCard
                            media(first:2) {
                                edges {
                                    node {
                                        id
                                        preview{
                                            image{
                                                url
                                                id
                                            }
                                        }
                                    }
                                }
                            }
                            onlineStorePreviewUrl
                            onlineStoreUrl
                            productType
                            status
                            tags
                            totalInventory
                            variantsCount{
                                count
                                precision
                            }
                            vendor
                            variants(first:1){
                                edges{
                                    node{
                                        compareAtPrice
                                        displayName
                                        id
                                        image{
                                            url
                                            id
                                        }
                                        price
                                        sku
                                        title
                                    }
                                    cursor
                                }
                                pageInfo{
                                    hasNextPage
                                }
                            }
                            images(first:2){
                                edges{
                                    node{
                                        id
                                        url
                                    }
                                    cursor
                                }
                                pageInfo{
                                    hasNextPage
                                }
                            }
                            totalVariants
                        }
                        cursor
                    }
                    pageInfo{
                        hasNextPage
                    }
                }
            }
        QUERY;
        $user = Auth::user();
        $result = $user->api()->graph($query);
        if(!$result['errors']){
            $data = $result['body']['data']['products'];
            return response()->json(['success' => true, 'message' => 'Products fetched', 'data' => $data], 200);
        }
        return response()->json(['success' => false, 'message' => 'API Failed', 'data' => null], 400);
    }
    public function getProduct($id){
        $query = <<<QUERY
            query getProduct {
                product(id: "gid://shopify/Product/$id") {
                    category{
                        id
                        name
                    }
                    combinedListingRole
                    compareAtPriceRange{
                        maxVariantCompareAtPrice{
                            amount
                            currencyCode
                        }
                        minVariantCompareAtPrice{
                            amount
                            currencyCode
                        }
                    }
                    createdAt
                    description
                    featuredMedia{
                        id
                        preview{
                            image{
                                url
                                id
                            }
                        }
                    }
                    id
                    title
                    handle
                    isGiftCard
                    media(first:2) {
                        edges {
                            node {
                                id
                                preview{
                                    image{
                                        url
                                        id
                                    }
                                }
                            }
                        }
                    }
                    onlineStorePreviewUrl
                    onlineStoreUrl
                    productType
                    status
                    tags
                    totalInventory
                    variantsCount{
                        count
                        precision
                    }
                    vendor
                    variants(first:1){
                        edges{
                            node{
                                compareAtPrice
                                displayName
                                id
                                image{
                                    url
                                    id
                                }
                                price
                                sku
                                title
                            }
                            cursor
                        }
                        pageInfo{
                            hasNextPage
                        }
                    }
                    images(first:2){
                        edges{
                            node{
                                id
                                url
                            }
                            cursor
                        }
                        pageInfo{
                            hasNextPage
                        }
                    }
                    totalVariants
                }
            }
        QUERY;
        $user = Auth::user();
        $result = $user->api()->graph($query);
        if(!$result['errors']){
            $data = $result['body']['data']['product'];
            return response()->json(['success' => true, 'message' => 'Product fetched', 'data' => $data], 200);
        }
        return response()->json(['success' => false, 'message' => 'API Failed', 'data' => null], 400);
    }
    public function getProductHandle($handle){
        $query = <<<QUERY
            query getProduct {
                productByHandle(handle: "$handle") {
                    category{
                        id
                        name
                    }
                    combinedListingRole
                    compareAtPriceRange{
                        maxVariantCompareAtPrice{
                            amount
                            currencyCode
                        }
                        minVariantCompareAtPrice{
                            amount
                            currencyCode
                        }
                    }
                    createdAt
                    description
                    featuredMedia{
                        id
                        preview{
                            image{
                                url
                                id
                            }
                        }
                    }
                    id
                    title
                    handle
                    isGiftCard
                    media(first:2) {
                        edges {
                            node {
                                id
                                preview{
                                    image{
                                        url
                                        id
                                    }
                                }
                            }
                        }
                    }
                    onlineStorePreviewUrl
                    onlineStoreUrl
                    productType
                    status
                    tags
                    totalInventory
                    variantsCount{
                        count
                        precision
                    }
                    vendor
                    variants(first:1){
                        edges{
                            node{
                                compareAtPrice
                                displayName
                                id
                                image{
                                    url
                                    id
                                }
                                price
                                sku
                                title
                            }
                            cursor
                        }
                        pageInfo{
                            hasNextPage
                        }
                    }
                    images(first:2){
                        edges{
                            node{
                                id
                                url
                            }
                            cursor
                        }
                        pageInfo{
                            hasNextPage
                        }
                    }
                    totalVariants
                }
            }
        QUERY;
        $user = Auth::user();
        $result = $user->api()->graph($query);
        if(!$result['errors']){
            $data = $result['body']['data']['productByHandle'];
            return response()->json(['success' => true, 'message' => 'Product fetched', 'data' => $data], 200);
        }
        return response()->json(['success' => false, 'message' => 'API Failed', 'data' => null], 400);
    }
}
