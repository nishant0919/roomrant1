"use client";
import React from "react";
import Room from "@/app/components/Admin/Room";
import UserDetail from "@/app/components/Admin/Users";
import AdminOrdersPage from "../orders/page";

function Compo({ option }) {
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  async function fetchRole() {
    const res = await fetch("/api/user/role");
    const data = await res.json();
    if (data.role !== "admin") {
      setLoading(false);
      setIsAdmin(false);
    } else {
      setLoading(false);
      setIsAdmin(true);
    }
  }

  React.useEffect(() => {
    fetchRole();
  }, []);

  if (loading) {
    return <div className="w-full">Loading...</div>;
  }

  if (!loading && !isAdmin) {
    return <div className="w-full">Unauthorized</div>;
  }

  return (
    <div className="w-full">
      {option === "room" && <Room />}
      {option === "users" && <UserDetail />}
      {option === "orders" && <AdminOrdersPage/>}

    </div>
  );
}

export default Compo;
