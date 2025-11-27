import React, { useState } from "react";
import "gridjs/dist/theme/mermaid.css";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import { useNavigate } from "react-router-dom";

interface AdminMemberTableProps {
  searchQuery: string;
  statusFilter: string;
}

// Helper to decode JWT and extract role
const getRoleFromToken = (token: string): string | null => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload?.role || null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

const MemberTable: React.FC<AdminMemberTableProps> = ({
  searchQuery,
  statusFilter,
}) => {
  const navigate = useNavigate();

  // 🧠 In a real app, you'd get this from localStorage, cookies, or context
// Get token from localStorage or context instead of hardcoding
const token = localStorage.getItem("token");
const role = token ? getRoleFromToken(token) : "admin"; // fallback to admin


  // State for member data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "Active",
      trainer: "John Smith",
      joined: "2024-01-12",
      routines: 12,
      caloriesBurned: 25000,
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@example.com",
      status: "Inactive",
      trainer: "Sarah Lee",
      joined: "2023-11-05",
      routines: 8,
      caloriesBurned: 18000,
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      status: "Active",
      trainer: "David Miller",
      joined: "2024-03-20",
      routines: 15,
      caloriesBurned: 32000,
    },
  ]);

  // Filtering
  const filteredData = members.filter(
    (row) =>
      (statusFilter === "All" || row.status === statusFilter) &&
      (row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.trainer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderStatusBadge = (status: string) => {
    const base =
      "px-2 py-0.5 rounded-full text-white text-xs font-semibold";
    return status === "Active"
      ? h("span", { className: `${base} bg-green-700` }, status)
      : h("span", { className: `${base} bg-secondary` }, status);
  };

  // Delete function
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers((prev) => prev.filter((member) => member.id !== id));
    }
  };

  return (
    <div className="md:p-5 md:py-0 py-5 text-sm font-semibold">
      <Grid
        data={filteredData.map((row) => [
          // Member Name + Email
          h("div", { className: "flex flex-col items-center" }, [
            h(
              "span",
              { className: "font-semibold text-gray-900" },
              row.name
            ),
            h(
              "button",
              {
                className: "text-sm underline cursor-pointer",
                onClick: () => navigate(`/${role}/members/${row.id}`),
              },
              row.email
            ),
          ]),
          // Status
          h(
            "div",
            { className: "flex justify-center" },
            renderStatusBadge(row.status)
          ),
          // Trainer
          h("div", { className: "text-center" }, row.trainer),
          // Joined Date
          h("div", { className: "text-center" }, row.joined),
          // Routines
          h("div", { className: "text-center w-16" }, row.routines.toString()),
          // Calories Burned
          h(
            "div",
            { className: "text-center" },
            `${row.caloriesBurned.toLocaleString()} kcal`
          ),
          // Actions
          h("div", { className: "flex justify-center gap-2" }, [
            h(
              "button",
              {
                className:
                  "px-3 py-1 text-black border border-black-300 rounded cursor-pointer",
                onClick: () => navigate(`/${role}/members/${row.id}`),
              },
              "Edit"
            ),
            h(
              "button",
              {
                className:
                  "px-3 py-1 bg-primary text-white rounded-md cursor-pointer",
                onClick: () => handleDelete(row.id),
              },
              "Delete"
            ),
          ]),
        ])}
        columns={[
          { name: "Member" },
          { name: "Status" },
          { name: "Trainer" },
          { name: "Joined" },
          { name: "Routines" },
          { name: "Calories Burned" },
          { name: "Action" },
        ]}
        search={false}
        sort={false}
        pagination={{ limit: 2 }}
      />
    </div>
  );
};

export default MemberTable;
