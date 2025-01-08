const API_BASE_URL = "https://skilllinkr.ngarikev.tech/api";

export const logoutUser = async () => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  if (!accessToken) {
    throw new Error("No access token found");
  }

  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(refreshToken && { "X-Refresh-Token": refreshToken }),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || "Logout Failed");
  }

  // Clear tokens regardless of server response
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  return res.json();
};
