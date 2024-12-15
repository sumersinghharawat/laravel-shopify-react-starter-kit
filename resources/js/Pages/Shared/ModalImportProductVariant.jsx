import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

function ModalImportProductVariant({ productId, setModalImportProductvariant }) {
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                let response = await axios.post(route('vendor.productdetails'), { product_id: productId });
                setProductDetails(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleImportProductSubmit = async (productId) => {
        try {
            setProductDetails(null);
            setModalImportProductvariant(false)
            await router.post(route('vendor.importproduct'), { product_id: productId });

        } catch (error) {
            console.error("Error importing product:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 bg-blend-multiply" style={{ backdropFilter: 'blur(2px)' }}>
            <div className="z-20 p-4 bg-white rounded shadow w-80">
                <p>Are you sure? you want to import "{(productDetails.title)?(productDetails.title):"Please wait..."}"</p>
                <div className="flex justify-center gap-2">
                    <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded" onClick={() => handleImportProductSubmit(productId)}>Import</button>
                    <button className="px-4 py-2 mt-4 text-white bg-red-500 rounded" onClick={() => setModalImportProductvariant(false)} type="button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModalImportProductVariant;

