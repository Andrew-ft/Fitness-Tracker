import AdminDashboardStatusCard from "@/components/AdminDashboardStatusCard";

export default function TrainerDashboard() {
  // Grab name directly from localStorage
  function capitalize(word: string) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const adminName = capitalize(localStorage.getItem("name") || "User");

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-semibold text-2xl">
          Welcome Back,{" "}
          <span className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent font-bold">
            {adminName}
          </span>
        </h1>
      </div>

      <div>
        <AdminDashboardStatusCard />
      </div>
    </div>
  );
}
