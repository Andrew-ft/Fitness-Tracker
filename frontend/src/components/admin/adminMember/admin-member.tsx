import { Link } from "react-router-dom";
import { DropdownMenuCheckboxes } from "../../DropDownMenu";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import AdminMemberTable from "../../MemberTable";
import { useState } from "react";
import { motion } from "framer-motion";  

export default function AdminMember() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Member Management</h1>
          <p className="text-sm opacity-50">
            Manage all gym members, assign trainers, and monitor activity
          </p>
        </div>
        <div>
          <Link to="/admin/members/add">
            <Button>Add New Member</Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-5 mx-auto md:w-3/5 w-full mb-5">
        <Input
          placeholder="Search Members"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {/* Pass statusFilter as prop too for future use */}
        <AdminMemberTable
          searchQuery={searchTerm}
          endpoint="/admin/members"
          role="admin"
        />
      </div>
    </motion.div>
  );
}
