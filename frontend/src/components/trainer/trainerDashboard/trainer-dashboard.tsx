import TrainerDashboardStatusCard from "@/components/TrainerDashboardStatusCard";

export default function TrainerDashboard() {
  // Grab name directly from localStorage
  const trainerName = localStorage.getItem("name") || "User";

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-semibold text-2xl">
          Welcome Back,{" "}
          <span className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent font-bold">
            {trainerName}
          </span>
        </h1>
      </div>

      <div>
        <TrainerDashboardStatusCard />
      </div>
    </div>
  );
}
