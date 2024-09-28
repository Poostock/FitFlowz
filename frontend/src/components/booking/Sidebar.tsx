import "../../App.css";
import { useState } from "react";
import { IoIosFitness } from "react-icons/io";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { MdFitnessCenter } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";


interface MenuItem {
    title: string;
    icon?: React.ReactNode;
    link?: string;
    submenu?: MenuItem[];
}


const SideBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(true);
    // const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // เก็บเมนูย่อยที่เปิดอยู่
    const location = useLocation();

    const Menus: MenuItem[] = [
        {
            title: "Class",
            icon: <FaRegClock />,
            link: "/classBooking",
            
        },
        { title: "Equipments", icon: <MdFitnessCenter /> },
    ];
    const isActive = (menuLink: string | undefined): boolean => {
        return menuLink ? location.pathname === menuLink || location.pathname.startsWith(`${menuLink}/`) : false;
    };

    return (
        <div className={`bg-sidebar text-primary h-screen ${open ? "w-72" : "w-20"} duration-300 relative border-r-[5px] border-primary`}>
            <BsArrowLeftShort
                className={`bg-primary text-sidebar text-3xl rounded-full z-20
                absolute -right-3 top-5 border border-sidebar cursor-pointer ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="inline-flex items-center p-4">
                <IoIosFitness className={`w-[36px] h-auto cursor-pointer mr-2 duration-500 ${!open && "rotate-[360deg]"}`} />
                <h1 className={`text-2xl origin-left text-primary font-sans font-bold italic duration-300 ${!open && "scale-0"}`}>
                    FitFlowz
                </h1>
            </div>
            <div className="w-full h-1 mt-1 bg-primary"></div>

            <ul className="pt-4">
                {Menus.map((menu, index) => (
                    <li key={index}>
                        <Link
                            to={menu.link || "#"}
                            className={`text-primary font-sans font-medium text-xl flex items-center gap-x-4 cursor-pointer p-4 mt-2 ml-1 hover:bg-hover hover:text-green hover:bg-opacity-10 hover:rounded-full w-max ${
                                isActive(menu.link) ? " bg-hover bg-opacity-10 rounded-full w-max text-use" : ""
                            }`}
                        >
                            <span className="text-2xl flex items-center justify-center w-10 h-8">
                                {menu.icon ? menu.icon : <RiDashboardFill />}
                            </span>
                            <span className={`origin-left duration-200 ${!open ? "hidden" : "block"}`}>{menu.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        
        
    );
    
};

export default SideBar;