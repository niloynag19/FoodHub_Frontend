import { redirect } from "next/navigation";
import React from "react";

const SellerDashboard = () => {
  redirect("/provider-dashboard/profile");
};

export default SellerDashboard;