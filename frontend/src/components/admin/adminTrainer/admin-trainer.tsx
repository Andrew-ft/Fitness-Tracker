import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import AdminTrainerTable from "../../TrainerTable";
import { useState } from "react";

import { motion } from "framer-motion";

export default function AdminTrainer() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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

      {/* ✅ REMOVED STATUS FILTER */}
      <div className="flex gap-5 mx-auto md:w-3/5 w-full mb-5">
        <Input
          placeholder="Search Trainers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {/* ✅ REMOVED statusFilter prop */}
        <AdminTrainerTable searchQuery={searchTerm} />
      </div>
    </motion.div>
  );
}
