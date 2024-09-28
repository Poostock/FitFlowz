import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import EditPackageForm from "../../../../components/admin/package/EditpackageForm";
import { PackageInterface } from "../../../../interfaces/IPackage";
import { GetPackageById } from "../../../../service/https/package";

const EditPackage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [packageData, setPackageData] = useState<PackageInterface | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchPackage = useCallback(async () => {
        try {
            const packageId = Number(id);

            if (isNaN(packageId)) {
                console.error("Invalid package ID");
                return;
            }

            const response = await GetPackageById(packageId);
            if (response) {
                setPackageData(response);
            } else {
                console.error("No package data found.");
            }
        } catch (error) {
            console.error("Error fetching package:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPackage();
    }, [fetchPackage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Package" />
                <div className="navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                    <h1 className="text-3xl text-green1 ml-14 mt-2">EDIT PACKAGE</h1>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray4 mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex flex-row items-start m-8">
                            {packageData ? <EditPackageForm packageData={packageData} /> : <p>Package not found</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPackage;
