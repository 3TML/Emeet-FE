import { fetchWithAuth } from "./fetcher";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://emeet.gahonghac.net/api/v1";

export const getSugestionExperts = async () => {
  const res = await fetchWithAuth(`${API_URL}/expert/GetSugestionExperts`);
  if (!res.ok) throw new Error("Cannot fetch suggestion experts");
  return res.json();
};

export const getExpertById = async (expertId: string) => {
  const res = await fetchWithAuth(`${API_URL}/expert/GetExpertById/${expertId}`);
  if (!res.ok) throw new Error("Cannot fetch expert by id");
  return res.json();
};

export const getExpertByNameAndCategory = async (
  name: string,
  category: string
) => {
  const url = new URL(`${API_URL}/expert/GetExpertByNameAndCategory`);
  url.searchParams.append("name", name);
  url.searchParams.append("category", category);
  const res = await fetchWithAuth(url.toString());
  if (!res.ok) throw new Error("Cannot fetch expert by name and category");
  return res.json();
};


export const uploadCertificates = async (expertId: string, certificates: File[]) => {
  const formData = new FormData();
  formData.append("ExpertId", expertId);
  certificates.forEach((file) => formData.append("Certificates", file));


  const res = await fetchWithAuth(`${API_URL}/expert/UploadCertificates`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Cannot upload certificates");
  const text = await res.text();
  if (text.toLowerCase().includes("success")) {
    return true;
  }
  throw new Error(text || "Upload failed");
};

export const deleteCertificates = async (certificateId: string) => {
  const res = await fetchWithAuth(`${API_URL}/expert/DeleteCertificates`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificateId }),
  });
  if (!res.ok) throw new Error("Cannot delete certificates");
  return res.json();
};

export const getCertificatesByExpertId = async (expertId: string) => {
  const res = await fetchWithAuth(
    `${API_URL}/expert/GetCertificatesByExpertId/${expertId}`
  );
  if (!res.ok) throw new Error("Cannot fetch certificates by expertId");
  return res.json();
};

export const getFeedbackByExpertId = async (expertId: string) => {
  const res = await fetchWithAuth(
    `${API_URL}/feedback/GetFeedbackExpert/${expertId}`
  );
  if (!res.ok) throw new Error("Cannot fetch certificates by expertId");
  return res.json();
};