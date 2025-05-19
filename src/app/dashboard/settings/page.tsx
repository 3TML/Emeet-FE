"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, X, Check, History as HistoryIcon } from "lucide-react";

const sidebarMenu = [
  { label: "My Profile", key: "profile" },
  { label: "History", key: "history" },
  { label: "Security", key: "security" },
  { label: "Notifications", key: "notifications" },
  { label: "Billing", key: "billing" },
  { label: "Delete Account", key: "delete", danger: true },
];

const mockUser = {
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  firstName: "Rafiquar",
  lastName: "Rahman",
  email: "rafiqurrahman51@gmail.com",
  phone: "+09 345 346 46",
  bio: "Team Manager",
  role: "Team Manager",
  location: "Leeds, United Kingdom",
  address: {
    country: "United Kingdom",
    city: "Leeds, East London",
    postalCode: "ERT 2354",
    taxId: "AS45645756",
  },
};

const mockHistory = [
  {
    id: 1,
    expertName: "Nguyen Van IT",
    expertAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    field: "IT",
    date: "2024-06-01",
    status: "Completed",
  },
  {
    id: 2,
    expertName: "Le Thi Nau An",
    expertAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    field: "Nấu ăn",
    date: "2024-05-20",
    status: "Completed",
  },
  {
    id: 3,
    expertName: "Tran Van Tam Ly",
    expertAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    field: "Tâm lý",
    date: "2024-05-10",
    status: "Cancelled",
  },
];

export default function SettingsPage() {
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("profile");
  // Edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  // Temp states for editing
  const [profileDraft, setProfileDraft] = useState({
    avatar: user.avatar,
    role: user.role,
    location: user.location,
  });
  const [personalDraft, setPersonalDraft] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  });
  const [addressDraft, setAddressDraft] = useState({
    country: user.address.country,
    city: user.address.city,
    postalCode: user.address.postalCode,
    taxId: user.address.taxId,
  });

  // Handlers for Profile
  const handleEditProfile = () => {
    setProfileDraft({
      avatar: user.avatar,
      role: user.role,
      location: user.location,
    });
    setIsEditingProfile(true);
  };
  const handleCancelProfile = () => setIsEditingProfile(false);
  const handleSaveProfile = () => {
    setUser((prev) => ({ ...prev, ...profileDraft }));
    setIsEditingProfile(false);
    localStorage.setItem("user", JSON.stringify({ ...user, ...profileDraft }));
  };

  // Handlers for Personal
  const handleEditPersonal = () => {
    setPersonalDraft({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
    });
    setIsEditingPersonal(true);
  };
  const handleCancelPersonal = () => setIsEditingPersonal(false);
  const handleSavePersonal = () => {
    setUser((prev) => ({ ...prev, ...personalDraft }));
    setIsEditingPersonal(false);
    localStorage.setItem("user", JSON.stringify({ ...user, ...personalDraft }));
  };

  // Handlers for Address
  const handleEditAddress = () => {
    setAddressDraft({ ...user.address });
    setIsEditingAddress(true);
  };
  const handleCancelAddress = () => setIsEditingAddress(false);
  const handleSaveAddress = () => {
    setUser((prev) => ({ ...prev, address: { ...addressDraft } }));
    setIsEditingAddress(false);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, address: { ...addressDraft } })
    );
  };

  // Avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileDraft((prev) => ({ ...prev, avatar: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-8">
      <div className="max-w-5xl mx-auto flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0">
          <nav className="bg-white rounded-xl shadow p-4 flex flex-col gap-1">
            {sidebarMenu.map((item) => (
              <button
                key={item.key}
                className={`text-left px-4 py-2 rounded-lg font-medium transition-all text-base flex items-center gap-2
                  ${activeTab === item.key ? "bg-blue-50 text-blue-700" : item.danger ? "text-red-500 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"}
                `}
                tabIndex={0}
                aria-label={item.label}
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
                {item.key === "history" && <HistoryIcon className="w-4 h-4 ml-1" />}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <>
              <h1 className="text-2xl font-bold mb-2">My Profile</h1>
              {/* Profile Card */}
              <Card className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm border border-gray-100">
                <div className="relative">
                  <img
                    src={isEditingProfile ? profileDraft.avatar : user.avatar}
                    alt={user.firstName}
                    className="w-20 h-20 rounded-full object-cover border border-gray-200"
                  />
                  {isEditingProfile && (
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute left-0 top-0 w-20 h-20 opacity-0 cursor-pointer"
                      onChange={handleAvatarChange}
                      aria-label="Change avatar"
                    />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  {isEditingProfile ? (
                    <>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 mb-1 text-lg font-semibold"
                        value={profileDraft.role}
                        onChange={(e) => setProfileDraft((prev) => ({ ...prev, role: e.target.value }))}
                      />
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm mb-1"
                        value={profileDraft.location}
                        onChange={(e) => setProfileDraft((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-lg">{user.firstName} {user.lastName}</div>
                      <div className="text-gray-500 text-sm">{user.role}</div>
                      <div className="text-gray-400 text-sm">{user.location}</div>
                    </>
                  )}
                </div>
                {isEditingProfile ? (
                  <div className="flex gap-2 ml-auto">
                    <Button size="sm" onClick={handleSaveProfile} aria-label="Save profile" className="bg-blue-600 text-white hover:bg-blue-700"><Check className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelProfile} aria-label="Cancel profile edit"><X className="w-4 h-4" /></Button>
                  </div>
                ) : (
                  <Button variant="ghost" className="ml-auto" tabIndex={0} aria-label="Edit profile" onClick={handleEditProfile}>
                    Edit <Pencil className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </Card>
              {/* Personal Information Card */}
              <Card className="p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold text-base">Personal Information</div>
                  {isEditingPersonal ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSavePersonal} aria-label="Save personal info" className="bg-blue-600 text-white hover:bg-blue-700"><Check className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={handleCancelPersonal} aria-label="Cancel personal edit"><X className="w-4 h-4" /></Button>
                    </div>
                  ) : (
                    <Button variant="ghost" tabIndex={0} aria-label="Edit personal info" onClick={handleEditPersonal}>
                      Edit <Pencil className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <div className="text-gray-400">First Name</div>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={personalDraft.firstName}
                        onChange={(e) => setPersonalDraft((prev) => ({ ...prev, firstName: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.firstName}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400">Last Name</div>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={personalDraft.lastName}
                        onChange={(e) => setPersonalDraft((prev) => ({ ...prev, lastName: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.lastName}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400">Email address</div>
                    {isEditingPersonal ? (
                      <input
                        type="email"
                        className="border rounded px-2 py-1 w-full bg-gray-100 cursor-not-allowed"
                        value={personalDraft.email}
                        readOnly
                      />
                    ) : (
                      <div className="font-medium">{user.email}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400">Phone</div>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={personalDraft.phone}
                        onChange={(e) => setPersonalDraft((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.phone}</div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-gray-400">Bio</div>
                    {isEditingPersonal ? (
                      <textarea
                        className="border rounded px-2 py-1 w-full min-h-[40px]"
                        value={personalDraft.bio}
                        onChange={(e) => setPersonalDraft((prev) => ({ ...prev, bio: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.bio}</div>
                    )}
                  </div>
                </div>
              </Card>
              {/* Address Card */}
              <Card className="p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold text-base">Address</div>
                  {isEditingAddress ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveAddress} aria-label="Save address" className="bg-blue-600 text-white hover:bg-blue-700"><Check className="w-4 h-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={handleCancelAddress} aria-label="Cancel address edit"><X className="w-4 h-4" /></Button>
                    </div>
                  ) : (
                    <Button variant="ghost" tabIndex={0} aria-label="Edit address" onClick={handleEditAddress}>
                      Edit <Pencil className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <div className="text-gray-400">Country</div>
                    {isEditingAddress ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={addressDraft.country}
                        onChange={(e) => setAddressDraft((prev) => ({ ...prev, country: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.address.country}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400">City/State</div>
                    {isEditingAddress ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={addressDraft.city}
                        onChange={(e) => setAddressDraft((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.address.city}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400">Postal Code</div>
                    {isEditingAddress ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={addressDraft.postalCode}
                        onChange={(e) => setAddressDraft((prev) => ({ ...prev, postalCode: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.address.postalCode}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400">TAX ID</div>
                    {isEditingAddress ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full"
                        value={addressDraft.taxId}
                        onChange={(e) => setAddressDraft((prev) => ({ ...prev, taxId: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium">{user.address.taxId}</div>
                    )}
                  </div>
                </div>
              </Card>
            </>
          )}
          {activeTab === "history" && (
            <>
              <h1 className="text-2xl font-bold mb-4 flex items-center gap-2"><HistoryIcon className="w-6 h-6" /> Booking History</h1>
              <Card className="p-0 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expert</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockHistory.map((h) => (
                      <tr key={h.id}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                          <img src={h.expertAvatar} alt={h.expertName} className="w-10 h-10 rounded-full object-cover border" />
                          <span className="font-medium">{h.expertName}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{h.field}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{h.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${h.status === "Completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{h.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
} 