"use client"
import React, { useState } from "react";
import { MdCheck } from "react-icons/md";

// Types
const PACKAGE_TYPES = [
  { key: "minute", label: "Basic", color: "bg-blue-100 text-blue-700" },
  { key: "session", label: "Premium", color: "bg-violet-100 text-violet-700" },
  { key: "custom", label: "Business", color: "bg-purple-100 text-purple-700" },
];

type Package = {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  isActive: boolean;
};

const initialPackages: Package[] = [
  { id: 1, name: "Basic", type: "minute", price: 34000, description: "Enhanced email sending. Permission Settings. 100 contacts. 100 messages/month. 10 enrichments/month. 10 magic fields/month.", isActive: true },
  { id: 2, name: "Premium", type: "session", price: 69000, description: "Full access permissions. Advanced data enrichment. Priority support. Unlimited contacts. 500 messages/month. 100 enrichments/month. 100 magic fields/month.", isActive: false },
  { id: 3, name: "Business", type: "custom", price: 119000, description: "Unlimited reporting. SAML and SSO. Custom billing. Unlimited contacts. 2,000 messages/month. 500 enrichments/month. 500 magic fields/month.", isActive: false },
];

const PricingPage = () => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [modal, setModal] = useState<{ open: boolean; mode: 'create' | 'edit'; pkg: Package | null }>({ open: false, mode: 'create', pkg: null });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  // CRUD Handlers
  const handleAdd = () => setModal({ open: true, mode: 'create', pkg: null });
  const handleEdit = (pkg: Package) => setModal({ open: true, mode: 'edit', pkg });
  const handleDelete = (id: number) => setDeleteId(id);
  const handleModalClose = () => setModal({ open: false, mode: 'create', pkg: null });
  const handleDeleteClose = () => setDeleteId(null);
  const handleSave = (pkg: Package) => {
    if (modal.mode === 'create') {
      setPackages([...packages, { ...pkg, id: Date.now() }]);
    } else {
      setPackages(packages.map(p => (p.id === pkg.id ? pkg : p)));
    }
    handleModalClose();
  };
  const handleDeleteConfirm = () => {
    if (deleteId !== null) setPackages(packages.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };
  const handleToggleActive = (id: number) => {
    setPackages(packages.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 md:px-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Pricing</h1>
            <p className="text-gray-500">User CustomerGo for free with your whole team. Upgrade to enable advanced data enrichment and additional features.</p>
          </div>
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onClick={handleAdd}
            aria-label="Thêm gói mới"
            tabIndex={0}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleAdd()}
          >
            + Thêm gói mới
          </button>
        </div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => {
            const typeInfo = PACKAGE_TYPES.find(t => t.key === pkg.type);
            const isSelected = idx === selectedIdx;
            return (
              <div
                key={pkg.id}
                tabIndex={0}
                aria-label={`Chọn gói ${pkg.name}`}
                onClick={() => setSelectedIdx(idx)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelectedIdx(idx)}
                className={`relative bg-white rounded-2xl shadow-lg border flex flex-col p-8 pt-12 transition cursor-pointer outline-none focus:ring-2 focus:ring-violet-400
                  ${isSelected ? "border-2 border-violet-500 shadow-violet-200 z-10" : "border-gray-100 hover:border-violet-300"}`}
              >
                {isSelected && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">Most Popular</div>
                )}
                <div className="mb-2 text-xl font-bold text-gray-900 text-center">{pkg.name}</div>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">${(pkg.price/1000).toFixed(0)}</span>
                  <span className="ml-1 text-gray-500 text-sm">per user/month</span>
                  <span className="ml-2 text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">-20%</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="checkbox" className="accent-violet-500" checked={isSelected} readOnly />
                    <span className="text-violet-700 font-semibold">Billed yearly</span>
                  </label>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">Billed monthly</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {pkg.description.split('.').filter(Boolean).map((desc, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <MdCheck className="text-green-500" /> {desc.trim()}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-xl font-bold text-white mb-2 transition
                    ${isSelected ? "bg-gradient-to-r from-violet-500 to-violet-400 hover:from-violet-600" : "bg-gray-300 text-gray-500 hover:bg-gray-400"}`}
                  disabled={isSelected}
                >
                  {isSelected ? "Đang chọn" : `Chọn gói này`}
                </button>
                <div className="flex gap-2 mt-2 justify-center">
                  <button
                    className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200"
                    onClick={e => { e.stopPropagation(); handleEdit(pkg); }}
                  >
                    Sửa
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200"
                    onClick={e => { e.stopPropagation(); handleDelete(pkg.id); }}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Modal add/edit */}
        {modal.open && (
          <PackageModal
            mode={modal.mode}
            pkg={modal.pkg}
            onClose={handleModalClose}
            onSave={handleSave}
          />
        )}
        {/* Modal delete confirm */}
        {deleteId !== null && (
          <DeleteModal
            onClose={handleDeleteClose}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </main>
  );
};

// Modal for add/edit
const PackageModal = ({ mode, pkg, onClose, onSave }: { mode: 'create' | 'edit'; pkg: Package | null; onClose: () => void; onSave: (pkg: Package) => void }) => {
  const [form, setForm] = useState<Package>(pkg || { id: 0, name: '', type: PACKAGE_TYPES[0].key, price: 0, description: '', isActive: true });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.name === 'price' ? Number(e.target.value) : e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative border border-gray-100">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 text-gray-500 text-2xl" aria-label="Đóng">×</button>
        <h3 className="text-xl font-bold mb-4 text-gray-900">{mode === 'create' ? 'Thêm gói mới' : 'Chỉnh sửa gói'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {PACKAGE_TYPES.map(t => (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
            <input name="price" type="number" min={0} value={form.price} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (mỗi tính năng cách nhau dấu chấm)</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} id="active-toggle" className="accent-blue-500" />
            <label htmlFor="active-toggle" className="text-sm text-gray-700">Kích hoạt gói</label>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">{mode === 'create' ? 'Thêm' : 'Lưu'}</button>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Huỷ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal xác nhận xoá
const DeleteModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative border border-gray-100">
      <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 text-gray-500 text-2xl" aria-label="Đóng">×</button>
      <h3 className="text-xl font-bold mb-4 text-gray-900">Xác nhận xoá</h3>
      <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn xoá gói dịch vụ này?</p>
      <div className="flex gap-2">
        <button onClick={onConfirm} className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Xoá</button>
        <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Huỷ</button>
      </div>
    </div>
  </div>
);

export default PricingPage; 