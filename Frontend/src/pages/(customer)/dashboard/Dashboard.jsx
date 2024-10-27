import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/customersidebar/Sidebar.jsx";
import "./home.css";


const Dashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
         
        </div>
        <div className="charts">
        </div>
        <div className="listContainer">
          <div className="listTitle">All my orders</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
