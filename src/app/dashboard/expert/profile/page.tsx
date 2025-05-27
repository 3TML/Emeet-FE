"use client";

import { useEffect, useState } from "react";
import { getExpertById, uploadCertificates, getCertificatesByExpertId } from "@/lib/api/expertApi";
import type { Expert } from "@/types/user";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import type { Route } from "next";

const ProfileExpertPage = () => {
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [certificates, setCertificates] = useState<string[]>([]);

  useEffect(() => {
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!userStr) {
      setError("Không tìm thấy thông tin người dùng.");
      setLoading(false);
      return;
    }
    let expertId = "";
    try {
      const user = JSON.parse(userStr);
      expertId = user.expertInformation?.id;
      if (!expertId) throw new Error();
    } catch {
      setError("Không lấy được expertId.");
      setLoading(false);
      return;
    }
    getExpertById(expertId)
      .then((data) => {
        setExpert(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không lấy được thông tin chuyên gia.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!expert) return;
    getCertificatesByExpertId(expert.id)
      .then((data) => {
        setCertificates(Array.isArray(data) ? data.map((item: any) => item.url || item) : []);
      })
      .catch(() => setCertificates([]));
  }, [expert]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
      setUploadMessage("");
    }
  };

  const handleUpload = async () => {
    if (!expert) return;
    setUploading(true);
    setUploadMessage("");
    try {
      await uploadCertificates(expert.id, selectedFiles);
      setUploadMessage("Tải lên thành công!");
      setSelectedFiles([]);
      const data = await getCertificatesByExpertId(expert.id);
      setCertificates(Array.isArray(data) ? data.map((item: any) => item.url || item) : []);
    } catch (err) {
      setUploadMessage("Tải lên thất bại. Vui lòng thử lại.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto mt-10">
        {/* Sidebar skeleton */}
        <div className="w-full lg:w-1/3 bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
          <Skeleton className="w-24 h-24 rounded-full mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <div className="mt-8 w-full space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
        {/* Main skeleton */}
        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <Skeleton className="h-6 w-1/3 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <Skeleton className="h-6 w-1/3 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow text-center text-red-500">
        {error || "Không có dữ liệu chuyên gia."}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto mt-10">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center">
        <Avatar src={expert.avatar || undefined} alt={expert.fullName || "Avatar"} className="w-24 h-24 mb-4" />
        <div className="text-xl font-bold text-gray-900 dark:text-white mb-1 text-center">{expert.fullName || "Chuyên gia"}</div>
        <div className="text-gray-500 dark:text-gray-300 text-center mb-2">{expert.email}</div>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-4">Expert</span>
        <nav className="mt-8 w-full">
          <ul className="space-y-2">
            <li className="text-primary font-semibold">Personal Details</li>
            <li>
              <Link
                href={"/dashboard/expert/profile/achievements" as Route}
                className="text-gray-500 dark:text-gray-300 hover:text-primary focus:text-primary transition"
                tabIndex={0}
                aria-label="Achievements"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
              >
                Achievements
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/expert/profile/feedback" as Route}
                className="text-gray-500 dark:text-gray-300 hover:text-primary focus:text-primary transition"
                tabIndex={0}
                aria-label="Feedback"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
              >
                Feedback
              </Link>
            </li>
            <li className="text-gray-500 dark:text-gray-300">Statements & Report</li>
            <li className="text-gray-500 dark:text-gray-300">Get Help</li>
            <li className="text-gray-500 dark:text-gray-300">Security</li>
            <li className="text-gray-500 dark:text-gray-300">Transaction Limits</li>
            <li className="text-gray-500 dark:text-gray-300">SMS Alerts Subscription</li>
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 space-y-6">
        {/* My Profile Card */}
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Profile</h2>
            <button className="text-primary font-medium hover:underline">Edit</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-400">Full Name</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.fullName || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Email Address</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.email || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Gender</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.gender || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Ngày tạo</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.dateCreate ? new Date(expert.dateCreate).toLocaleDateString() : "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Status</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.status || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Bio</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.bio || "-"}</div>
            </div>
          </div>
        </section>
        {/* My Experience Card */}
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-400">Experience</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.experience || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Average Rate</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.rate ?? 0}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Total Review</div>
              <div className="font-medium text-gray-900 dark:text-white">{expert.totalReview ?? 0}</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="text-xs text-gray-400 mb-1">Tải lên chứng chỉ</div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              aria-label="Chọn ảnh chứng chỉ"
            />
            {selectedFiles.length > 0 && (
              <ul className="mt-2 text-xs text-gray-600 dark:text-gray-300 flex flex-wrap gap-2">
                {selectedFiles.map((file, idx) => (
                  <li key={idx} className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-20 h-20 object-cover rounded border mb-1"
                    />
                    <span>{file.name}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
              className="mt-2 px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
              aria-label="Tải lên chứng chỉ"
            >
              {uploading ? "Đang tải lên..." : "Tải lên"}
            </button>
            {uploadMessage && (
              <div className={`mt-2 text-sm ${uploadMessage.includes("thành công") ? "text-green-600" : "text-red-600"}`}>{uploadMessage}</div>
            )}
            {certificates.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {certificates.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border rounded hover:shadow-lg overflow-hidden"
                    aria-label={`Xem chứng chỉ ${idx + 1}`}
                  >
                    <img
                      src={url}
                      alt={`Certificate ${idx + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileExpertPage;
