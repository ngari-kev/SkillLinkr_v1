const API_BASE_URL = "https://skilllinkr.ngarikev.tech/api";

export const logoutUser = async () => {
  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    methods: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Logout Failed");
  }

  return res.json();
};
