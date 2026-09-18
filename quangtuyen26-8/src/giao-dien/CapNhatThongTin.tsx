import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { UserPen, Save, User, Mail, Phone, GraduationCap, Calendar, Sparkles, Image as ImageIcon, ArrowLeft } from "lucide-react";

const AVATAR_MAU = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
  "https://api.dicebear.com/7.x/bottts/svg?seed=QuangTuyen",
];

export const CapNhatThongTin: React.FC = () => {
  const { taiKhoanHienTai, capNhatThongTin, hienThongBao } = useNguoiDung();

  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    soDienThoai: "",
    mssv: "",
    lop: "",
    ngaySinh: "",
    gioiTinh: "Nam",
    bio: "",
    avatar: "",
  });

  const [dangLuu, setDangLuu] = useState(false);

  useEffect(() => {
    if (taiKhoanHienTai) {
      setFormData({
        hoTen: taiKhoanHienTai.hoTen || "",
        email: taiKhoanHienTai.email || "",
        soDienThoai: taiKhoanHienTai.soDienThoai || "",
        mssv: taiKhoanHienTai.mssv || "",
        lop: taiKhoanHienTai.lop || "",
        ngaySinh: taiKhoanHienTai.ngaySinh || "2003-08-23",
        gioiTinh: taiKhoanHienTai.gioiTinh || "Nam",
        bio: taiKhoanHienTai.bio || "",
        avatar: taiKhoanHienTai.avatar || AVATAR_MAU[0],
      });
    }
  }, [taiKhoanHienTai]);

  if (!taiKhoanHienTai) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
        <div className="max-w-md w-full text-center p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <UserPen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Chưa Đăng Nhập</h3>
          <p className="text-slate-500 text-sm mb-6">
            Vui lòng đăng nhập để thực hiện cập nhật thông tin cá nhân.
          </p>
          <Link
            href="/dang-nhap"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            Đến trang Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const xuLyLuu = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.hoTen.trim()) {
      hienThongBao("Họ và tên không được để trống!", "warning");
      return;
    }

    setDangLuu(true);
    try {
      await capNhatThongTin(formData);
    } finally {
      setDangLuu(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <UserPen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Cập Nhật Thông Tin Cá Nhân</h1>
              <p className="text-xs text-slate-500">
                Tài khoản: <span className="font-bold text-slate-800">@{taiKhoanHienTai.tenDangNhap}</span>
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trang chủ</span>
          </Link>
        </div>

        <form onSubmit={xuLyLuu} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Avatar Selector */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 flex flex-col items-center">
            <h3 className="text-xs font-bold text-slate-700 self-start uppercase tracking-wider flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span>Ảnh Đại Diện (Avatar)</span>
            </h3>

            <div className="relative group">
              <img
                src={formData.avatar || AVATAR_MAU[0]}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = AVATAR_MAU[0];
                }}
              />
            </div>

            {/* Quick avatar selection */}
            <div className="w-full space-y-3">
              <label className="block text-xs text-slate-500 font-medium">Chọn mẫu ảnh có sẵn:</label>
              <div className="flex items-center justify-center space-x-2">
                {AVATAR_MAU.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: img })}
                    className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-transform hover:scale-105 ${
                      formData.avatar === img ? "border-emerald-600 ring-2 ring-emerald-500/20" : "border-slate-200"
                    }`}
                  >
                    <img src={img} alt="Avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Custom Image URL input */}
              <div className="pt-2">
                <label className="block text-xs text-slate-500 mb-1 font-medium">Hoặc dán URL hình ảnh:</label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Detailed Fields */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Thông Tin Hồ Sơ Sinh Viên</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Họ và tên */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Họ và tên *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="hoTen"
                    required
                    value={formData.hoTen}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email liên hệ
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Số điện thoại
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* MSSV */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  MSSV (Mã Số Sinh Viên)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="mssv"
                    value={formData.mssv}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-mono transition-all"
                  />
                </div>
              </div>

              {/* Lớp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Lớp sinh hoạt
                </label>
                <input
                  type="text"
                  name="lop"
                  value={formData.lop}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-mono transition-all"
                />
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Ngày sinh
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    name="ngaySinh"
                    value={formData.ngaySinh}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Giới tính */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Giới tính
                </label>
                <div className="flex items-center space-x-6 pt-1">
                  {["Nam", "Nữ", "Khác"].map((gt) => (
                    <label key={gt} className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="gioiTinh"
                        value={gt}
                        checked={formData.gioiTinh === gt}
                        onChange={handleChange}
                        className="w-4 h-4 border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{gt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Tiểu sử / Giới thiệu bản thân
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Giới thiệu đôi nét về bản thân..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
              <Link
                href="/"
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Hủy bỏ
              </Link>

              <button
                type="submit"
                disabled={dangLuu}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                {dangLuu ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
