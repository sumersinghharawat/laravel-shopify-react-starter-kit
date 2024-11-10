import { router } from "@inertiajs/react";

function ModalImportProductVariant({productId, setModalImportProductvariant}) {

    const handleImportProductSubmit = async (productId) => {
        // console.log('handleImportProductSubmit', productId);
        // setModalImportProductvariant(false);
        // setSelectedProductId(null);


        const response = await router.post(route('vendor.importproduct'), {product_id: productId},
        onsubmit = (res) => {
            console.log(res);
        });

        console.log(response);
        setModalImportProductvariant(false);

    }

    return <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 bg-blend-multiply" style={{ backdropFilter: 'blur(2px)' }}>
        <div className="z-20 p-4 bg-white rounded shadow w-80">
            <p>Are you sure? you want to import {productId}</p>
            <div className="flex justify-center gap-2">
                <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded" onClick={()=>handleImportProductSubmit(productId)}>Import</button>
                <button className="px-4 py-2 mt-4 text-white bg-red-500 rounded" onClick={() => setModalImportProductvariant(false)}>Cancel</button>
            </div>
        </div>
    </div>;
}

export default ModalImportProductVariant;
