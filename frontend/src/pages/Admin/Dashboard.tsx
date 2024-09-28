import "../../App.css";
import SideBar from "../../components/admin/class/SideBar";
import Navbar from "../../components/admin/class/Navbar";
import Stat from "../../components/admin/dashboard/Stat";

const Dashboard: React.FC = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="w-full" style={{ backgroundImage: "radial-gradient(circle, rgba(20,20,30,1) 0%, rgba(0,0,0,1) 100%)" }}>
                <Navbar title="Dashboard" />
                <Stat/>
            </div>
        </div>
    );
};

export default Dashboard;
