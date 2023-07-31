import Navbar from "@/components/Sidebar";
import Subbar from "@/components/Subbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex">
        <Navbar />
        <Subbar />
      </div>
      <div className="bg-[#FCFCFD] w-full p-8 h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
