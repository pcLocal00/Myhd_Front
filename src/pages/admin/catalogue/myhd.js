import AdminCatalogueMyHd from "@/components/forms/Admin/AdminCatalogueMyHd";
import AdminRoute from "@/components/AdminRoute";

const ProductAdminPage = () => {
  return (
      <div>
        <AdminCatalogueMyHd />
      </div>
  );
};

export default AdminRoute(ProductAdminPage);
