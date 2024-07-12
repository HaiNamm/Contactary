import Navbar from "@/components/Sidebar";
import Subbar from "@/components/Subbar";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.account) {
      navigate("/login");
      return;
    }
  }, []);
  return <Outlet />;
};

export default DashboardLayout;
