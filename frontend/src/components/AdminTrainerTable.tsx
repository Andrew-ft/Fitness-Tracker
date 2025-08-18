import React, { useState } from "react";
import "gridjs/dist/theme/mermaid.css";
import { Grid, _ } from "gridjs-react";
import { h } from "gridjs";
import { useNavigate } from "react-router-dom";

interface AdminTrainerTableProps {
  searchQuery: string;
  statusFilter: string;
}

const AdminTrainerTable: React.FC<AdminTrainerTableProps> = ({ searchQuery, statusFilter }) => {
  const navigate = useNavigate();

  // Use state for data
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      clients: 12,
      experience: "5 years",
      routines: 8,
      specialization: "Strength Training",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      clients: 6,
      experience: "3 years",
      routines: 5,
      specialization: "Yoga",
    },
    {
      id: 3,
      name: "Mark Lee",
      email: "mark@example.com",
      status: "Active",
      clients: 10,
      experience: "4 years",
      routines: 7,
      specialization: "Cardio",
    },
  ]);

  const filteredData = trainers.filter(
    (row) =>
      (statusFilter === "All" || row.status === statusFilter) &&
      (row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderStatusBadge = (status: string) => {
    const base = "px-2 py-0.5 rounded-full text-white text-xs font-semibold";
    return status === "Active"
      ? h("span", { className: `${base} bg-green-700` }, status)
      : h("span", { className: `${base} bg-secondary` }, status);
  };

  // Delete function
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      setTrainers((prev) => prev.filter((trainer) => trainer.id !== id));
    }
  };

  return (
    <div className="md:p-5 md:py-0 py-5 text-sm font-semibold">
      <Grid 
        data={filteredData.map((row) => [
          h(
            "div",
            { className: "flex flex-col items-center" },
            [
              h("span", { className: "font-semibold text-gray-900" }, row.name),
              h(
                "button",
                {
                  className: "text-sm underline cursor-pointer",
                  onClick: () => navigate(`/admin/trainers/${row.id}`),
                },
                row.email
              ),
            ]
          ),
          h("div", { className: "flex justify-center" }, renderStatusBadge(row.status)),
          h("div", { className: "text-center w-16" }, row.clients.toString()),
          h("div", { className: "text-center" }, row.experience),
          h("div", { className: "text-center w-16" }, row.routines.toString()),
          h("div", { className: "text-center" }, row.specialization),
          h(
            "div",
            { className: "flex justify-center gap-2" },
            [
              h(
                "button",
                {
                  className: "px-3 py-1 text-black border border-black-300 rounded cursor-pointer",
                  onClick: () => navigate(`/admin/trainers/${row.id}`),
                },
                "Edit"
              ),
              h(
                "button",
                {
                  className: "px-3 py-1 bg-primary text-white rounded-md cursor-pointer",
                  onClick: () => handleDelete(row.id), // delete row
                },
                "Delete"
              ),
            ]
          ),
        ])}
        columns={[
          { name: "Trainer" },
          { name: "Status" },
          { name: "Clients" },
          { name: "Experience" },
          { name: "Routines" },
          { name: "Specialization" },
          { name: "Action" },
        ]}
        search={false}
        sort={false}
        pagination={{ limit: 2 }}
      />
    </div>
  );
};

export default AdminTrainerTable;
