import AdminRoute from "@/components/AdminRoute";
import AdminCatalogue from "@/components/forms/Admin/AdminCatalogue";

const CatalogueAdminPage = () => {
  return (
      <div>
        <AdminCatalogue />
      </div>
  );
};

export default AdminRoute(CatalogueAdminPage);
