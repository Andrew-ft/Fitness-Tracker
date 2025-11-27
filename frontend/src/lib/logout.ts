import API from "@/lib/axios";

export async function logout() {
  try {
    
    await API.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }
}