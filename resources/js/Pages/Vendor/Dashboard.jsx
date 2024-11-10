import SideBar from "../Shared/SideBar";

export default function Dashboard() {
    return (<>

        <SideBar />

        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4">
                    {/* Total Import Product */}
                    <div className="flex flex-col items-center justify-center h-40 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="mb-2 text-2xl text-gray-400 dark:text-gray-500">Total Import Products</p>
                        <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-300">150</p> {/* Example count */}
                    </div>

                    {/* Total Orders */}
                    <div className="flex flex-col items-center justify-center h-40 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="mb-2 text-2xl text-gray-400 dark:text-gray-500">Total Orders</p>
                        <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-300">320</p> {/* Example count */}
                    </div>

                    {/* Total Earning */}
                    <div className="flex flex-col items-center justify-center h-40 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="mb-2 text-2xl text-gray-400 dark:text-gray-500">Total Earning</p>
                        <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-300">$12,000</p> {/* Example earning */}
                    </div>
                </div>
            </div>
        </div>
    </>);
}
