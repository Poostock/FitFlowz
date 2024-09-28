import "../../../App.css";
import React, { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { SiGoogleclassroom, SiStaffbase } from "react-icons/si";
import { IoIosFitness } from "react-icons/io";
import { CountClasses, CountMembers, CountStaffs } from "../../../service/https";

// StatCard component
interface StatCardProps {
    count: string;
    Icon: React.ElementType;
    label: string;
    rotateIcon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ count, Icon, label, rotateIcon }) => (
    <div className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-green3 p-4 rounded-md h-32">
        <div className="flex gap-2 items-center">
            <span className="text-white font-bold italic text-3xl md:text-4xl">{count}</span>
            <Icon className={`w-8 h-8 text-green3 ${rotateIcon}`} />
        </div>
        <span className="font-semibold text-lg text-white text-center uppercase">{label}</span>
    </div>
);

const Stat: React.FC = () => {
    const [counts, setCounts] = useState<{ classCount: number | null; memberCount: number | null; staffCount: number | null }>({
        classCount: null,
        memberCount: null,
        staffCount: null,
    });

    useEffect(() => {
        const fetchCounts = async () => {
            const [classData, memberData, staffData] = await Promise.all([CountClasses(), CountMembers(), CountStaffs()]);
            setCounts({
                classCount: classData?.count ?? null,
                memberCount: memberData?.count ?? null,
                staffCount: staffData?.count ?? null,
            });
        };

        fetchCounts();
    }, []);

    return (
        <div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start gap-4 pt-10 px-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8 mx-auto">
                <StatCard
                    count={counts.memberCount ? counts.memberCount.toString() : "Loading..."}
                    Icon={HiOutlineUserGroup}
                    label="Member"
                />
                <StatCard count={counts.classCount ? counts.classCount.toString() : "Loading..."} Icon={SiGoogleclassroom} label="Class" />
                <StatCard count="93.9k" Icon={IoIosFitness} label="Equipments" rotateIcon="-rotate-45" />
                <StatCard
                    count={counts.classCount ? counts.classCount.toString() : "Loading..."}
                    Icon={SiStaffbase}
                    label="Staff & Trainer"
                />
            </div>
        </div>
    );
};

export default Stat;
