import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar  */}
        <DashSidebar tab={tab} />
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
      {/* Users */}
      {tab === "users" && <DashUsers />}
      {/* Products */}
      {/* Orders */}
      {/* Comments */}
      {/* Complete dashboard */}
    </div>
  );
};

export default Dashboard;
