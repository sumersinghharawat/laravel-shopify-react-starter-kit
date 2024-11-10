import React, { useEffect, useState } from "react";
import SideBar from "../Shared/SideBar";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faFileImport, faRightLong } from "@fortawesome/free-solid-svg-icons";
import ModalImportProductVariant from "../Shared/ModalImportProductVariant";

export default function Products({ products }) {

    const [importProducts, setImportProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [activatedProductVariant, setActivatedProductVariant] = useState(null);
    const [modalImportProductvariant, setModalImportProductvariant] = useState(false);

    useEffect(() => {
        setImportProducts(products);

        console.log(products);
    }, [products]);

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const requestHandleForImport = () => {
        console.log('requestHandleForImport');
    };

    const handleImportProductVariant = (id) => {
        setModalImportProductvariant(true);
        setSelectedProductId(id);
    };

    const handleActivateProductVariant = (id) => {
        activatedProductVariant ? setActivatedProductVariant(null) : setActivatedProductVariant(id);
    };

    return <div className="relative z-0">
        <SideBar />
        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Products</h5>
                    <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">View all</a>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sync
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {importProducts.map((product, index) =>
                            <React.Fragment key={product.id}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => handleActivateProductVariant(product.id)}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                                    <th scope="row" className="flex items-center gap-2 px-6 py-8 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.id.split('/').pop()}
                                        {activatedProductVariant == product.id ? <FontAwesomeIcon icon={faAngleUp} />: <FontAwesomeIcon icon={faAngleDown} />}
                                    </th>
                                    <td className="px-6 py-4">
                                        {product.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.collections.length > 0 ? product.collections.map(collection => collection.title).join(', ') : 'no collection allocated'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatMoney(product.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <FontAwesomeIcon icon={faFileImport} className="mr-2 text-yellow-600" />
                                        <button onClick={() => handleImportProductVariant(product.id)} className="font-medium text-yellow-600 dark:text-yellow-500">Import</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <label className="inline-flex items-center mb-5 cursor-pointer">
                                            <input type="checkbox" value={product.id} className="sr-only peer" onChange={(e) => requestHandleForImport(e.target.value)} />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </td>
                                </tr>
                                {product.variants.map((variant) =>
                                (product.id === activatedProductVariant && <tr className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600" key={variant.id}>
                                    <td className="px-6 py-4 pl-8 text-sm text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                                        <FontAwesomeIcon icon={faRightLong} />
                                    </td>
                                    <th scope="row" className="px-6 py-4 pl-8 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                                        {variant.id.split('/').pop()}
                                    </th>
                                    <td className="px-6 py-4">
                                        {variant.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        no collection allocated
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatMoney(variant.price * 100)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <FontAwesomeIcon icon={faFileImport} className="mr-2 text-yellow-600" />
                                        <button onClick={() => handleImportProductVariant(variant.id)} className="font-medium text-yellow-600 dark:text-yellow-500">Import</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <label className="inline-flex items-center mb-5 cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" value={variant.id} onChange={(e) => requestHandleForImport(e.target.value)} />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </td>
                                </tr>
                                ))}
                            </React.Fragment>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="7" className="px-6 py-4">
                                <nav aria-label="Page navigation example">
                                    <ul class="inline-flex -space-x-px text-sm">
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                        </li>
                                        <li>
                                            <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {modalImportProductvariant && <div>
                <ModalImportProductVariant productId={selectedProductId} setModalImportProductvariant={setModalImportProductvariant} />
            </div>}
        </div>
    </div>;
}

