// src/pages/index.js

import HomeForm from "@/components/forms/User/HomeForm";
import UserRoute from "@/components/UserRoute";

const HomePage = () => {
  return (
    <div>
      <HomeForm/>
    </div>
  );
};

export default UserRoute(HomePage);
