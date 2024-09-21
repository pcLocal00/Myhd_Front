import AdminNews from "@/components/forms/Admin/AdminNews";
import AdminRoute from "@/components/AdminRoute";

const NewsAdminPage = () => {
  return (
      <div>
        <AdminNews />
      </div>
  );
};

export default AdminRoute(NewsAdminPage);
