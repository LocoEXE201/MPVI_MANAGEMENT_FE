"use client";

import { SupplierTable } from "@/components/layouts/table/SupplierTable";

const SupplierComponent = () => {
    return (
        <div style={{ backgroundColor: "#F1F5F9" }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '1rem' }}>
                <button
                    className="py-2 px-4 bg-transparent text-gray-700 font-semibold border border-gray-700 rounded hover:bg-gray-500 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                >New Contract</button>

                <button
                    className="py-2 px-4 bg-transparent text-gray-700 font-semibold border border-gray-700 rounded hover:bg-gray-500 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                >Cancel Contract</button>
            </div>
            <div style={{ paddingTop: '1rem', width: '95%', margin: '0 auto' }}>
                <SupplierTable/>
            </div>
        </div>
    )
}

export default SupplierComponent