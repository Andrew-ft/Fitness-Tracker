import { Link } from "react-router-dom";
import { DropdownMenuCheckboxes } from "../../DropDownMenu";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import AdminTrainerTable from "../../AdminTrainerTable";
import { useState } from "react";

export default function AdminTrainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // All, Active, Inactive

  return (
    <div>
      <div className="mb-10 flex items-center justify-between flex-wrap gap-10">
        <div>
          <h1 className="font-semibold text-2xl">Trainer Management</h1>
          <p className="text-sm opacity-50">
            Manage gym trainers, assign specializations, and monitor performance
          </p>
        </div>
        <div>
          <Link to="/admin/trainers/add">
            <Button>Add New Trainer</Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-5 mx-auto md:w-3/5 w-full mb-5">
        <Input
          placeholder="Search Trainers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropdownMenuCheckboxes
          value={statusFilter}
          onChange={(val) => setStatusFilter(val)}
        />
      </div>

      <div>
        <AdminTrainerTable
          searchQuery={searchTerm}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
}
