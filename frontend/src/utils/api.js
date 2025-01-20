export const authenticatedFetch = async (url, options = {}) => {
  try {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      throw new Error("No access token available");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refresh");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const refreshResponse = await fetch(
        "https://skilllinkr.ngarikev.tech/api/auth/refresh",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (!refreshResponse.ok) {
        localStorage.clear();
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }

      const refreshData = await refreshResponse.json();
      localStorage.setItem("access", refreshData.access_token);

      return authenticatedFetch(url, options);
    }

    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
