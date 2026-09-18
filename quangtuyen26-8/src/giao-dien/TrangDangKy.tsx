import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { UserPlus, User, Mail, Phone, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";

export const TrangDangKy: React.FC = () => {
  const router = useRouter();
  const { dangKy, hienThongBao } = useNguoiDung();

  const [formData, setFormData] = useState({
    tenDangNhap: "",
    hoTen: "",
    email: "",
    soDienThoai: "",
    mssv: "",
    lop: "",
    ngaySinh: "2003-01-01",
    gioiTinh: "Nam",
    matKhau: "",
    xacNhanMatKhau: "",
  });

  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [dongYDieuKhoan, setDongYDieuKhoan] = useState(true);
  const [dangXuLy, setDangXuLy] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const xuLyDangKy = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tenDangNhap.trim()) {
      hienThongBao("Vui lòng nhập tên đăng nhập!", "warning");
      return;
    }

    if (!formData.hoTen.trim()) {
      hienThongBao("Vui lòng nhập họ và tên!", "warning");
      return;
    }

    if (formData.matKhau.length < 6) {
      hienThongBao("Mật khẩu phải có ít nhất 6 ký tự!", "warning");
      return;
    }

    if (formData.matKhau !== formData.xacNhanMatKhau) {
      hienThongBao("Mật khẩu và Nhập lại mật khẩu không trùng khớp!", "error");
      return;
    }

    if (!dongYDieuKhoan) {
      hienThongBao("Vui lòng đồng ý với điều khoản dịch vụ!", "warning");
      return;
    }

    setDangXuLy(true);
    try {
      const { xacNhanMatKhau, ...dataDangKy } = formData;
      const res = await dangKy(dataDangKy);

      if (res.success) {
        router.push("/");
      }
    } finally {
      setDangXuLy(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 font-sans">
      <div className="w-full max-w-lg space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-1">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Đăng Ký Tài Khoản Mới</h2>
          <p className="text-xs text-slate-500">
            Tạo tài khoản thành viên trong hệ thống thông tin sinh viên
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4 text-xs" onSubmit={xuLyDangKy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tên đăng nhập */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tên đăng nhập *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="tenDangNhap"
                  required
                  value={formData.tenDangNhap}
                  onChange={handleChange}
                  placeholder="Vd: tuyen2026"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Họ và tên */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Họ và tên *
              </label>
              <input
                type="text"
                name="hoTen"
                required
                value={formData.hoTen}
                onChange={handleChange}
                placeholder="Vd: Nguyễn Văn A"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Vd: user@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
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
                  placeholder="0912345678"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* MSSV */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                MSSV
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
                  placeholder="525000486"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Lớp */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Lớp học
              </label>
              <input
                type="text"
                name="lop"
                value={formData.lop}
                onChange={handleChange}
                placeholder="25CT501"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Password fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Mật khẩu *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={hienMatKhau ? "text" : "password"}
                  name="matKhau"
                  required
                  value={formData.matKhau}
                  onChange={handleChange}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setHienMatKhau(!hienMatKhau)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {hienMatKhau ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nhập lại mật khẩu *
              </label>
              <input
                type={hienMatKhau ? "text" : "password"}
                name="xacNhanMatKhau"
                required
                value={formData.xacNhanMatKhau}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-xs focus:ring-2 focus:outline-none ${
                  formData.xacNhanMatKhau && formData.matKhau !== formData.xacNhanMatKhau
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-200 focus:ring-blue-500 focus:bg-white"
                }`}
              />
            </div>
          </div>

          {/* Check Terms */}
          <div className="pt-2">
            <label className="flex items-center space-x-2 text-xs text-slate-600 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={dongYDieuKhoan}
                onChange={(e) => setDongYDieuKhoan(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Tôi đồng ý với Quy định & Điều khoản hệ thống sinh viên</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={dangXuLy}
            className="w-full mt-4 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50 text-xs uppercase tracking-wider"
          >
            {dangXuLy ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Hoàn Tất Đăng Ký</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Đã có tài khoản?{" "}
            <Link href="/dang-nhap" className="font-bold text-blue-600 hover:underline">
              Đăng nhập ngay →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
