import AdminRoute from "@/components/AdminRoute";
import AdminFamille from "@/components/forms/Admin/AdminFamille";

const FamilleAdminPage = () => {
  return (
      <div>
        <AdminFamille />
      </div>
  );
};

export default AdminRoute(FamilleAdminPage);
