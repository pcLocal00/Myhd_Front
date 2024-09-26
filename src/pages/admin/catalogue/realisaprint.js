import AdminCatalogueRap from "@/components/forms/Admin/AdminCatalogueRap";
import AdminRoute from "@/components/AdminRoute";

const ProductAdminPage = () => {
  return (
      <div>
        <AdminCatalogueRap />
      </div>
  );
};

export default AdminRoute(ProductAdminPage);
