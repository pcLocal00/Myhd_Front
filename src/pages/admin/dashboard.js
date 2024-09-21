import AdminRoute from "@/components/AdminRoute";
import LandingPage from "@/components/forms/Admin/Dashboard";

const DashboardPage = () => {
  return (
      <div>
        <LandingPage/>
      </div>
  );
};

export default AdminRoute(DashboardPage);