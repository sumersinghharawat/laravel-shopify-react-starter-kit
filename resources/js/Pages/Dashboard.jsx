import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button, Card, Grid, Pagination, Select, Spinner, TextField } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Dashboard({marg, products}) {

    const [productSyncModal, setProductSyncModal] = useState(false);

    const [margProductList, setMargProductList] = useState(marg.Details.pro_N);

    const [currentProductName, setCurrentProductName] = useState(null);
    const [currentProductCode, setCurrentProductCode] = useState(null);

    useEffect(() => {
        // console.log(productsData);
    }, [marg]);

    const handleGetProductCode = (product_code, product_name) => {
        setProductSyncModal(true);
        setCurrentProductCode(product_code);
        setCurrentProductName(product_name);
        console.log(product_code);
    }

    const handleSyncProduct = () => {
        setProductSyncModal(false);
    }

    const productsData = products.products.nodes.map((product) => {
        return {
            id: product.id,
            title: product.title,
            handle: product.handle,
            price: product.priceRange.minVariantPrice.amount,
            quantity: product.totalInventory,
        }
    })

    return (
        <AuthenticatedLayout >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product No.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        P Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Company
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {margProductList.map((product, index) => (
                                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{product.code}</td>
                                        <td className="px-6 py-4">{product.name}</td>
                                        <td className="px-6 py-4">{product.PRate}</td>
                                        <td className="px-6 py-4">{product.Rate}</td>
                                        <td className="px-6 py-4">{product.stock}</td>
                                        <td className="px-6 py-4">{product.company}</td>
                                        <td className="px-6 py-4">
                                            <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() => handleGetProductCode(product.code, product.name)}
                                            >
                                                Sync
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {productSyncModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center'>
                    <div className='fixed inset-0 bg-black opacity-50' onClick={() => setProductSyncModal(false)}></div>
                    <div className='z-50 p-6 bg-white rounded-lg shadow'>
                        <h2 className='mb-4 text-lg font-semibold'>Sync Product with Shopify</h2>
                        <div className='mb-4'>
                            <TextField
                                label={'Product code'}
                                value={currentProductCode}
                                onChange={() => console.log('Product Name')}
                                readOnly
                            />
                        </div>
                        <div className='mb-4'>
                            <TextField
                                label={'Product name'}
                                value={currentProductName}
                                onChange={() => console.log('Product Name')}
                                readOnly
                            />
                        </div>
                        <div className='mb-4'>
                            <Select
                                label="Select Shopify Product"
                                options={productsData.map((product) => ({ value: product.handle, label: product.title }))}
                                onChange={(value) => console.log(`Selected: ${value}`)}
                            />
                        </div>
                        <Button onClick={() => console.log('Syncing with Shopify')}>Sync Now</Button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
