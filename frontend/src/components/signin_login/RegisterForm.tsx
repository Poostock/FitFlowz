import React from "react";
import Stepper from "./Stepper";

const RegisterFrom: React.FC = () => {
    return (
        <div className="h-full flex pt-[110px]">
            <div className="w-full text-center h-full">
                <div className="text-lime-200">
                    <div className="text-5xl font-extrabold mb-5 xl:text-5xl xl:mb-5 ">Sign Up</div>
                </div>
                <Stepper />
            </div>
        </div>
    );
};

export default RegisterFrom;
