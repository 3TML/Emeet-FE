const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://emeet.gahonghac.net/api/v1";

export const getAccessToken = async (refreshToken: string) => {
  const res = await fetch(`${API_URL}/auth/GetAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error("Refresh token expired");
  return res.json(); // { accessToken }
};

export const fetchUser = async (accessToken: string) => {
  const res = await fetch(`${API_URL}/auth/FetchUser/${accessToken}`);
  if (!res.ok) throw new Error("Cannot fetch user");
  return res.json(); // user data
};
