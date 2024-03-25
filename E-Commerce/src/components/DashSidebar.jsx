import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { HiAnnotation, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { FaBox, FaTruck } from "react-icons/fa";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/server/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Link to="/dashboard?tab=comments">
            <Sidebar.Item
              active={tab === "comments"}
              icon={HiAnnotation}
              as="div"
            >
              Comments
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=orders">
            <Sidebar.Item active={tab === "orders"} icon={FaBox} as="div">
              Orders
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=products">
            <Sidebar.Item active={tab === "products"} icon={FaTruck} as="div">
              Products
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
