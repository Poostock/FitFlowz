import "../../../App.css";
import { useState } from "react";
import { IoIosFitness } from "react-icons/io";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { MdOutlineSpaceDashboard, MdFitnessCenter } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { FaRegClock, FaMoneyBills } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { FaRegDotCircle } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";

interface MenuItem {
    title: string;
    icon?: React.ReactNode;
    link?: string;
    submenu?: MenuItem[];
}

const SideBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(true);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null); // เก็บเมนูย่อยที่เปิดอยู่
    const location = useLocation();

    const Menus: MenuItem[] = [
        { title: "Dashboard", icon: <MdOutlineSpaceDashboard />, link: "/dashboard" },
        { title: "Members", icon: <LuUsers /> },
        {
            title: "Class",
            icon: <FaRegClock />,
            link: "/class",
            submenu: [
                { title: "Class Type", icon: <FaRegDotCircle />, link: "/class/classType" },
                { title: "Trainer", icon: <FaRegDotCircle />, link: "/class/trainer" },
            ],
        },
        { title: "Equipments", icon: <MdFitnessCenter /> },
        { title: "Package", icon :<RiBillLine />, link : "/admin/package"},
        { title: "Payments", icon: <FaMoneyBills /> },
    ];

    const isActive = (menuLink: string | undefined): boolean => {
        return menuLink ? location.pathname === menuLink || location.pathname.startsWith(`${menuLink}/`) : false;
    };

    const toggleSubMenu = (menuTitle: string) => {
        setActiveSubMenu(activeSubMenu === menuTitle ? null : menuTitle);
    };

    return (
        <div className={`bg-gray4 text-white h-screen ${open ? "w-72" : "w-20"} duration-300 relative border-r-[5px] border-white `}>
            <BsArrowLeftShort
                className={`bg-white text-gray4 text-3xl rounded-full z-20
                absolute -right-3 top-5 border border-gray4 cursor-pointer ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="inline-flex items-center p-4">
                <IoIosFitness className={`w-[36px] h-auto cursor-pointer mr-2 duration-500 ${!open && "rotate-[360deg]"}`} />
                <h1 className={`text-2xl origin-left text-white font-sans font-bold italic duration-300 ${!open && "scale-0"}`}>
                    FitFlowz
                </h1>
            </div>
            <div className="w-full h-1 mt-1 bg-white"></div>

            <ul className="pt-4">
                {Menus.map((menu, index) => (
                    <li key={index} className="relative">
                        <Link
                            to={menu.link || "#"}
                            className={`text-white font-sans font-medium text-xl flex items-center gap-x-4 cursor-pointer p-4 mt-2 ml-1 hover:bg-green5 hover:text-green3 hover:bg-opacity-10 hover:rounded-full w-max ${
                                isActive(menu.link) ? " bg-green5 bg-opacity-10 rounded-full w-max text-green2" : ""
                            }`}
                            onClick={() => menu.submenu && toggleSubMenu(menu.title)} // toggle เฉพาะเมนูหลักที่มีเมนูย่อย
                        >
                            <span className="text-2xl flex items-center justify-center w-10 h-8">
                                {menu.icon ? menu.icon : <RiDashboardFill />}
                            </span>
                            <span className={`origin-left duration-200 ${!open ? "hidden" : "block"}`}>{menu.title}</span>
                            {menu.submenu && open && (
                                <BsChevronDown
                                    className={`ml-auto transform duration-300 ${activeSubMenu === menu.title ? "rotate-180" : ""}`}
                                />
                            )}
                        </Link>

                        {menu.submenu && activeSubMenu === menu.title && open && (
                            <ul className={`pl-12 ${!open && "hidden"}`}>
                                {menu.submenu.map((submenu, subIndex) => (
                                    <li key={subIndex}>
                                        <Link
                                            to={submenu.link || "#"}
                                            className="text-white font-sans font-normal text-lg flex items-center gap-x-4 cursor-pointer p-2 mt-1 hover:bg-green5 hover:text-green3 hover:bg-opacity-10 hover:rounded-full w-max"
                                            // คลิกเมนูย่อยไม่ปิดเมนูย่อย
                                        >
                                            <span className="text-xl">{submenu.icon}</span>
                                            {submenu.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
