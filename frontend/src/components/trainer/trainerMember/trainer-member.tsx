import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import MemberTable from "../../MemberTable";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TrainerMember() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <div className="mb-10 flex flex-wrap gap-10 items-center justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Member Management</h1>
            <p className="text-sm opacity-50">
              Manage all gym members, assign trainers, and monitor activity
            </p>
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
          <MemberTable
            searchQuery={searchTerm}
            endpoint="/trainer/members"
            role="trainer"
          />
        </div>
      </div>
    </motion.div>
  );
}
