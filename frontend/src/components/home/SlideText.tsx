import React from "react";
import "../../App.css";

const SlideText: React.FC = () => {
    return (
        <div>
            <div className=" fixed bottom-0 w-full font-bold italic text-center bg-green3  text-black text-xl py-2 uppercase overflow-hidden">
                <div className="whitespace-nowrap animate-marquee">
                    <span>
                        * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot.
                        Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out.
                        Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SlideText;
