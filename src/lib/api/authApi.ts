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

export const updateProfile = async (
  accessToken: string,
  userId: string | number,
  data: {
    fullName?: string;
    avatar?: File | Blob | null;
    bio?: string;
    gender?: string;
    updateProfileRequest_Experience?: string;
    updateProfileRequest_PricePerMinute?: number;
  }
) => {
  const formData = new FormData();

  if (data.fullName) formData.append("FullName", data.fullName);
  if (data.avatar) formData.append("Avatar", data.avatar);
  if (data.bio) formData.append("Bio", data.bio);
  if (data.gender) formData.append("Gender", data.gender);
  if (data.updateProfileRequest_Experience)
    formData.append(
      "UpdateProfileRequest.Experience",
      data.updateProfileRequest_Experience
    );
  if (
    typeof data.updateProfileRequest_PricePerMinute === "number" &&
    !isNaN(data.updateProfileRequest_PricePerMinute)
  )
    formData.append(
      "UpdateProfileRequest.PricePerMinute",
      data.updateProfileRequest_PricePerMinute.toString()
    );

  const res = await fetch(`${API_URL}/user/UpdateProfileWithId/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Cannot update profile");
  return res.json(); // user data
};
