<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductManagement extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shopify_product_id',
        'status',
        'data'
    ];

    /**
     * Get products from table
     *
     * @param int $limit
     * @param string|null $after
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getProducts(int $limit = 10, string $after = null): \Illuminate\Database\Eloquent\Collection
    {
        $query = $this->newQuery()
            ->select('id', 'shopify_product_id', 'data', 'status')
            ->orderBy('id', 'desc');

        if ($after) {
            $query->where('id', '<', $after);
        }

        return $query->limit($limit)->get();
    }
    /**
     * Create a new product
     *
     * @param array $data
     * @return \App\Models\ProductManagement
     */
    public function addProduct(array $data): ProductManagement
    {

        // dd(json_encode($data));

        return $this->create([
            'shopify_product_id' => $data['id'],
            'data' => json_encode($data),
            'status' => 'inactive',
        ]);
    }

    /**
     * Get imported product ids
     *
     * @return array
     */
    public function getImportedProductIds(): array
    {
        return $this->whereNotNull('shopify_product_id')
            ->pluck('shopify_product_id')
            ->toArray();
    }


    /**
     * Get status of imported product
     *
     * @param string $shopifyProductId
     * @return string|null
     */
    public function getImportedProductStatus(string $shopifyProductId): ?string
    {
        return $this->where('shopify_product_id', $shopifyProductId)
            ->value('status');
    }
}

