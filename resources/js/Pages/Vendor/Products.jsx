import React, { useEffect, useState } from "react";
import SideBar from "../Shared/SideBar";
import { Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faFileImport, faRightLong } from "@fortawesome/free-solid-svg-icons";
import ModalImportProductVariant from "../Shared/ModalImportProductVariant";
import { useTable, useGlobalFilter } from "react-table";

export default function Products({ products, pageInfo, productsCount }) {
    const [importProducts, setImportProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [activatedProductVariant, setActivatedProductVariant] = useState(null);
    const [modalImportProductvariant, setModalImportProductvariant] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setImportProducts(products);
    }, [products]);

    const formatMoney = (amount) => {
        // return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
        return amount;
    };

    const requestHandleForImport = () => {
        console.log("requestHandleForImport");
    };

    const handleImportProductVariant = (id) => {
        setModalImportProductvariant(true);
        setSelectedProductId(id);
    };

    const handleActivateProductVariant = (id) => {
        activatedProductVariant ? setActivatedProductVariant(null) : setActivatedProductVariant(id);
    };

    const handlePreviousPage = (after) => {
        // if (pageInfo.previousPage) {
            return router.get(route('vendor.products', after ));
            // return router.get(route('vendor.products', { after: pageInfo.previousPage }));
        // }
    };

    const handleNextPage = (after) => {
        // if (pageInfo.nextPage) {
            console.log(after)
            return router.get(route('vendor.products', after ));
        // }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "S.No.",
                accessor: (row, index) => index + 1,
            },
            {
                Header: "ID",
                accessor: "id",
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        {row.original.id.split("/").pop()}
                        {activatedProductVariant === row.original.id ? (
                            <FontAwesomeIcon icon={faAngleUp} />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} />
                        )}
                    </div>
                ),
            },
            {
                Header: "Product Name",
                accessor: "title",
            },
            {
                Header: "Category",
                accessor: "collections",
                Cell: ({ value }) =>
                    value.length > 0 ? value.map((collection) => collection.title).join(", ") : "no collection allocated",
            },
            {
                Header: "Price",
                accessor: "price",
                Cell: ({ value }) => formatMoney(value/100),
            },
            {
                Header: "Action",
                accessor: "action",
                Cell: ({ row }) => (
                    <button
                        onClick={() => handleImportProductVariant(row.original.id)}
                        className="font-medium text-yellow-600 dark:text-yellow-500"
                    >
                        <FontAwesomeIcon icon={faFileImport} className="mr-2 text-yellow-600" />
                        Import
                    </button>
                ),
            },
            {
                Header: "Sync",
                accessor: "sync",
                Cell: ({ row }) => (
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                        <input
                            type="checkbox"
                            value={row.original.id}
                            className="sr-only peer"
                            onChange={(e) => requestHandleForImport(e.target.value)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                ),
            },
        ],
        [activatedProductVariant]
    );

    const data = React.useMemo(() => importProducts, [importProducts]);

    const tableInstance = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        useGlobalFilter
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        state: { globalFilter },
    } = tableInstance;

    useEffect(() => {
        setGlobalFilter(searchInput);
    }, [searchInput, setGlobalFilter]);

    return (
        <div className="relative z-0">
            <SideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Products</h5>
                        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            View all
                        </a>
                        <input
                            type="text"
                            placeholder="Search Products"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="px-3 py-1 border rounded"
                        />
                    </div>
                    <table
                        {...getTableProps()}
                        className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th scope="col" className="px-6 py-3" {...column.getHeaderProps()}>
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <React.Fragment key={row.original.id}>
                                        <tr
                                            {...row.getRowProps()}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            onClick={() => handleActivateProductVariant(row.original.id)}
                                        >
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td className="px-6 py-4" {...cell.getCellProps()}>
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                        {row.original.variants.map(
                                            (variant) =>
                                                row.original.id === activatedProductVariant && (
                                                    <tr
                                                        className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                                                        key={variant.id}
                                                    >
                                                        <td
                                                            className="px-6 py-4 pl-8 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                                                            scope="row"
                                                        >
                                                            <FontAwesomeIcon icon={faRightLong} />
                                                        </td>
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 pl-8 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {variant.id.split("/").pop()}
                                                        </th>
                                                        <td className="px-6 py-4">{variant.title}</td>
                                                        <td className="px-6 py-4">no collection allocated</td>
                                                        <td className="px-6 py-4">
                                                            {formatMoney(variant.price)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <FontAwesomeIcon
                                                                icon={faFileImport}
                                                                className="mr-2 text-yellow-600"
                                                            />
                                                            <button
                                                                onClick={() => handleImportProductVariant(variant.id)}
                                                                className="font-medium text-yellow-600 dark:text-yellow-500"
                                                            >
                                                                Import
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    className="sr-only peer"
                                                                    value={variant.id}
                                                                    onChange={(e) => requestHandleForImport(e.target.value)}
                                                                />
                                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                            </label>
                                                        </td>
                                                    </tr>
                                                )
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>

                    <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6" aria-label="Pagination">
                        <div className="hidden sm:block">
                            <p className="flex gap-2 text-sm text-gray-700">
                                Showing
                                <span className="font-medium">1</span>
                                to
                                <span className="font-medium">10</span>
                                of
                                {/* {JSON.stringify(pageInfo)} */}
                                <span className="font-medium">{productsCount}</span>
                                results
                            </p>
                        </div>
                        <div className="flex justify-between flex-1 gap-2 sm:justify-end">
                            <button
                                onClick={() => handlePreviousPage(pageInfo.startCursor)}
                                disabled={!pageInfo.hasPreviousPage}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md shadow-sm hover:bg-gray-50 ${
                                    pageInfo.hasPreviousPage ? 'text-gray-700 bg-white border-gray-300' : 'text-gray-400 bg-gray-200 border-gray-200 cursor-not-allowed'
                                }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handleNextPage(pageInfo.endCursor)}
                                disabled={!pageInfo.hasNextPage}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md shadow-sm hover:bg-gray-50 ${
                                    pageInfo.hasNextPage ? 'text-gray-700 bg-white border-gray-300' : 'text-gray-400 bg-gray-200 border-gray-200 cursor-not-allowed'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </nav>

                    {modalImportProductvariant && (
                        <div>
                            <ModalImportProductVariant
                                productId={selectedProductId}
                                setModalImportProductvariant={setModalImportProductvariant}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

