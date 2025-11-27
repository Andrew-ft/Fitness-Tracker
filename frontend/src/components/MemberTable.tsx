import React, { useState, useEffect } from "react";
import "gridjs/dist/theme/mermaid.css";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import { useNavigate } from "react-router-dom";
import API from "@/lib/axios";

interface Member {
  memberId: number;
  user: {
    role: string;
    userId: number;
    userName: string;
    email: string;
  };
  trainer?: { user: { userName: string } } | null;
  goal?: string;
  medicalNotes?: string;
  savedWorkouts?: any[];
  savedRoutines?: any[];
}

interface MemberTableProps {
  searchQuery: string;
  endpoint: string;
  role?: "admin" | "trainer";
}

const MemberTable: React.FC<MemberTableProps> = ({
  searchQuery,
  endpoint,
  role = "admin",
}) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isTrainer = role === "trainer"; 

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await API.get(endpoint);
        if (res.data && Array.isArray(res.data.members)) {
          setMembers(res.data.members);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to fetch members");
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [endpoint]);

  const filteredMembers = members.filter(
    (m) =>
      m.user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.trainer?.user.userName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (member: Member) => {
    const basePath = role === "admin" ? "/admin/members" : "/trainer/members";
    navigate(`${basePath}/${member.memberId}`, { state: { member } });
  };

  const columns = [
    { name: "Member" },
    ...(!isTrainer ? [{ name: "Trainer" }] : []),
    { name: "Goal" },
    { name: "Medical Notes" },
    { name: "Saved Routines" },
    { name: "Saved Workouts" },
    { name: "Action" },
  ];

  const rows = filteredMembers.map((member) => {
    const row: any[] = [];

    row.push(
      h("div", { className: "flex flex-col items-center" }, [
        h(
          "button",
          {
            className: "font-semibold text-gray-900 cursor-pointer",
            onClick: () => handleViewDetails(member),
          },
          member.user.userName
        ),
        h(
          "button",
          {
            className: "text-sm underline cursor-pointer",
            onClick: () => handleViewDetails(member),
          },
          member.user.email
        ),
      ])
    );

    if (!isTrainer) {
      row.push(
        h(
          "div",
          { className: "text-center" },
          member.trainer?.user.userName || "Unassigned"
        )
      );
    }

    // Goal
    row.push(h("div", { className: "text-center" }, member.goal || "N/A"));

    // Medical Notes
    row.push(h("div", { className: "text-center" }, member.medicalNotes || "N/A"));

    // Saved Routines
    row.push(h("div", { className: "text-center w-16" }, member.savedRoutines?.length || 0));

    // Saved Workouts
    row.push(h("div", { className: "text-center w-16" }, member.savedWorkouts?.length || 0));

    // Action
    row.push(
      h("div", { className: "flex justify-center gap-2" }, [
        h(
          "button",
          {
            className:
              "px-3 py-1 text-white bg-red-600 rounded-md border border-black-300 cursor-pointer",
            onClick: () => handleViewDetails(member),
          },
          "View"
        ),
      ])
    );

    return row;
  });

  return (
    <div className="md:p-5 md:py-0 py-5 text-sm font-semibold">
      {loading && <p>Loading members...</p>}
      {errorMsg && <p className="text-red-600 text-center font-semibold mb-3">{errorMsg}</p>}
      <Grid data={rows} columns={columns} search={false} sort={false} pagination={{ limit: 5 }} />
    </div>
  );
};

export default MemberTable;
