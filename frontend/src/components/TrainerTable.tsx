import React, { useState, useEffect } from "react";
import "gridjs/dist/theme/mermaid.css";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import { useNavigate } from "react-router-dom";
import API from "@/lib/axios";

interface AdminTrainerTableProps {
  searchQuery: string;
}

const AdminTrainerTable: React.FC<AdminTrainerTableProps> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState<any[]>([]);

useEffect(() => {
  API.get("/admin/trainers")
    .then((res) => {
      console.log("Fetched trainers:", res.data);

      const trainerArray = res.data.trainers;
      if (Array.isArray(trainerArray)) {
        const mapped = trainerArray.map((t: any) => ({
          id: t.trainerId,
          name: t.user?.userName || "N/A",
          email: t.user?.email || "N/A",
          clients: t.members?.length || 0,
          experience: t.experiencedYears || "N/A",
          routines: t.user?.routines?.length || 0,
          specialization: t.specialization || "N/A",
        }));
        setTrainers(mapped);
      } else {
        console.error("Unexpected trainers data format:", res.data);
        setTrainers([]);
      }
    })
    .catch((err) => {
      console.error("Failed to fetch trainers:", err);
    });
}, []);


  const filteredData = Array.isArray(trainers)
    ? trainers.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
          h("div", { className: "text-center w-16" }, row.clients.toString()),
          h("div", { className: "text-center" }, row.experience),
          h("div", { className: "text-center w-16" }, row.routines.toString()),
          h("div", { className: "text-center" }, row.specialization),
          h(
            "div",
            { className: "flex justify-center" },
            [
              h(
                "button",
                {
                  className: "px-3 py-1 text-black border border-black-300 rounded cursor-pointer",
                  onClick: () => navigate(`/admin/trainers/${row.id}`),
                },
                "Edit"
              ),
            ]
          ),
        ])}
        columns={[
          { name: "Trainer" },
          { name: "Clients" },
          { name: "Experience" },
          { name: "Routines" },
          { name: "Specialization" },
          { name: "Action" },
        ]}
        search={false}
        sort={false}
        pagination={{ limit: 5 }}
      />
    </div>
  );
};

export default AdminTrainerTable;
