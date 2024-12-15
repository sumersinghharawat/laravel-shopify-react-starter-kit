import React, { useEffect, useState } from "react";
import { Page, Card, DataTable, Button, TextField, Pagination } from "@shopify/polaris";
import SideBar from "../Shared/SideBar";
import { router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFileImport, faSync } from "@fortawesome/free-solid-svg-icons";
import ModalImportProductVariant from "../Shared/ModalImportProductVariant";

export default function Products({ products, pageInfo, productsCount }) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchInput, setSearchInput] = useState("");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [lastPage, setLastPage] = useState(null);
    const [modalImportProductvariant, setModalImportProductvariant] = useState(false);
    const [paginationCursors, setPaginationCursors] = useState({
        endCursor: pageInfo?.endCursor,
        startCursor: null,
        hasNextPage: pageInfo?.hasNextPage,
        hasPreviousPage: pageInfo?.hasPreviousPage,
    });

    useEffect(() => {
        console.log("products", products);
        if (searchInput.trim() === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) =>
                    product.title.toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        }
    }, [products, searchInput]);

    const handleSearchChange = (value) => setSearchInput(value);

    const handleImportProductVariant = (productId, variant) => {
        console.log(variant, productId);
        setSelectedProductId(productId);
        setShowModal(true);
    };

    const handleImportProduct = (productId) => {
        setSelectedProductId(productId);
        setShowModal(true);
    };

    const fetchPage = (direction) => {
        let cursor;
        if (direction === "forward") {
            cursor = paginationCursors?.endCursor;
        } else {
            cursor = paginationCursors?.startCursor;
        }

        router.get(route("vendor.products"), { after: cursor }, {
            onSuccess: (pageData) => {
                setFilteredProducts(pageData.products);
                setPaginationCursors({
                    endCursor: pageData.pageInfo?.endCursor,
                    startCursor: pageInfo?.startCursor,
                    hasNextPage: pageData.pageInfo?.hasNextPage,
                    hasPreviousPage: pageData.pageInfo?.hasPreviousPage,
                });
                if (direction === 'forward') {
                    setLastPage(pageData.pageInfo?.endCursor);
                }
            },
        });
    };

    const columns = [
        { title: "Image", render: ({ featuredImage }) => <img src={featuredImage} alt="" style={{ width: 50, height: 50 }} /> },
        { title: "ID", render: ({ id }) => id.split("/").pop() },
        { title: "Product Name", field: "title" },
        {
            title: "Category",
            render: ({ collections }) =>
                collections?.length > 0
                    ? collections.map((c) => c.title).join(", ")
                    : "No Collection",
        },
        { title: "Price", render: ({ price }) => `$${(price / 100).toFixed(2)}` },
        {
            title: "Variants",
            render: ({ variants }) =>
                variants.map((variant) => (
                    (variant.title == "Default Title") ? <>Null</>: <div key={variant.id}>
                        <p>{variant.title}</p>
                        <p>Price: ${variant.price}</p>
                        {/*<Button plain onClick={() => handleImportProductVariant(variant.id, variant)}>
                            <FontAwesomeIcon icon={variant.isImported ? faSync : faFileImport} /> {variant.isImported ? "Sync Variant" : "Import Variant"}
                        </Button>*/}
                    </div>
                )),
        },
        {
            title: "Actions",
            render: ({ id, isImported, isImportedStatus }) => (
                (isImportedStatus == 'inactive' ?
                    <Button plain onClick={() => handleImportProduct(id)} disabled tooltop="Inactive">
                        <FontAwesomeIcon icon={isImported ? faBan : faFileImport} /> {isImported ? "Inactive" : "Import Product"}
                    </Button>
                    :
                    <Button plain onClick={() => handleImportProduct(id)}>
                        <FontAwesomeIcon icon={isImported ? faSync : faFileImport} /> {isImported ? "Sync Product" : "Import Product"}
                    </Button>
                )
            ),
        },
    ];

    const rows = filteredProducts.map((product) =>
        columns.map((column) =>
            column.render ? column.render(product) : product[column.field]
        )
    );

    return (
        <Page
            title={`Products (${productsCount})`}
            primaryAction={{
                content: "Search",
                onAction: () => console.log("Search triggered"),
            }}
        >
            <Card>
                <div className="search-container">
                    <TextField
                        label="Search Products"
                        value={searchInput}
                        onChange={handleSearchChange}
                        placeholder="Search by product name"
                        clearButton
                        onClearButtonClick={() => setSearchInput("")}
                    />
                </div>
                <DataTable
                    columnContentTypes={["text", "text", "text", "text", "text", "text"]}
                    headings={columns.map((column) => column.title)}
                    rows={rows}
                    selectable={false}
                />
                <div className="pagination-controls">
                    <div
                        style={{
                            maxWidth: '100%',
                            margin: 'auto',
                            borderTop: '1px solid #ccc',
                            padding: '10px 0',
                        }}
                    >
                        <Pagination
                            onPrevious={() => fetchPage('backward')}
                            onNext={() => fetchPage('forward')}
                            hasNext={paginationCursors.hasNextPage}
                            hasPrevious={paginationCursors.hasPreviousPage}
                            label={`Total ${productsCount} products`}
                        />
                    </div>
                </div>
                {showModal && (
                    <ModalImportProductVariant
                        productId={selectedProductId}
                        setModalImportProductvariant={() => setShowModal(false)}
                    />
                )}
            </Card>
        </Page>
    );
}

