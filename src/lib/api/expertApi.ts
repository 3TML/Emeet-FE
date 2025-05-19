const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://emeet.gahonghac.net/api/v1";

export const getSugestionExperts = async () => {
  const res = await fetch(`${API_URL}/expert/GetSugestionExperts`);
  if (!res.ok) throw new Error("Cannot fetch suggestion experts");
  return res.json();
};

export const getExpertById = async (expertId: string) => {
  const res = await fetch(`${API_URL}/expert/GetExpertById/${expertId}`);
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
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Cannot fetch expert by name and category");
  return res.json();
};

export const uploadCertificates = async (expertId: string) => {
  const res = await fetch(`${API_URL}/expert/UploadCertificates`, {
    method: "POST",
    body: JSON.stringify({ expertId }),
  });
  if (!res.ok) throw new Error("Cannot upload certificates");
  return res.json();
};

export const deleteCertificates = async (certificateId: string) => {
  const res = await fetch(`${API_URL}/expert/DeleteCertificates`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificateId }),
  });
  if (!res.ok) throw new Error("Cannot delete certificates");
  return res.json();
};

export const getCertificatesByExpertId = async (expertId: string) => {
  const res = await fetch(
    `${API_URL}/expert/GetCertificatesByExpertId/${expertId}`
  );
  if (!res.ok) throw new Error("Cannot fetch certificates by expertId");
  return res.json();
};
