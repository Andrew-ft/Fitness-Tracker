  import { Link } from "react-router-dom";
  import { DropdownMenuCheckboxes } from "../../DropDownMenu";
  import { Button } from "../../ui/button";
  import { Input } from "../../ui/input";
  import MemberTable from "../../MemberTable";
  import { useState } from "react";

  export default function TrainerMember() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All"); // All, Active, Inactive

    return (
      <div>
        <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Member Management</h1>
            <p className="text-sm opacity-50">
              Manage all gym members, assign trainers, and monitor activity
            </p>
          </div>
          <div>
            <Link to="/trainer/members/add">
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
          <DropdownMenuCheckboxes
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
          />
        </div>

        <div>
          <MemberTable
            searchQuery={searchTerm}
            statusFilter={statusFilter}
          />
        </div>
      </div>
    );
  }
