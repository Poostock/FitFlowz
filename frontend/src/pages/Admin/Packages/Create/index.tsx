import React from "react";
import Navbar from "../../../../components/admin/class/Navbar";
import SideBar from "../../../../components/admin/class/SideBar";
import CreatepackageForm from "../../../../components/admin/package/CreatepackageForm";

const Createpackage: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Package" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-3xl text-green1 ml-14 mt-2">CREATE PACKAGE</h1>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray4 mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex flex-row items-start m-8">
                            <CreatepackageForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Createpackage;
