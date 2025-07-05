import API from "@/lib/axios";

export async function logout() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token. User is already logged out.");
      return;
    }

    await API.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }
}
