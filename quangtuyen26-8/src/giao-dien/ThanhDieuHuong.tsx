import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNguoiDung } from "@/context/NguoiDungContext";
import {
  User,
  LogIn,
  UserPlus,
  KeyRound,
  UserPen,
  LogOut,
  Home,
  GraduationCap,
  Laptop
} from "lucide-react";

export const ThanhDieuHuong: React.FC = () => {
  const router = useRouter();
  const { taiKhoanHienTai, dangXuat, isSupabaseActive } = useNguoiDung();

  const kiemTraKichHoat = (path: string) => router.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Student Info */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base font-extrabold text-slate-900 tracking-tight block">
                  {taiKhoanHienTai ? taiKhoanHienTai.hoTen : "Hệ Thống Sinh Viên"}
                </span>
                <span className="text-xs text-slate-500 block">
                  {taiKhoanHienTai
                    ? `MSSV: ${taiKhoanHienTai.mssv || "525000486"} • Lớp: ${taiKhoanHienTai.lop || "25CT501"}`
                    : "Hệ thống quản lý thông tin sinh viên"}
                </span>
              </div>
            </Link>

            {/* DB Status Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
              <span className={`w-2 h-2 rounded-full ${isSupabaseActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}></span>
              <span className="text-slate-600 font-medium">
                DB: <strong className={isSupabaseActive ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
                  {isSupabaseActive ? "Supabase Cloud" : "LocalStorage"}
                </strong>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs">
            <Link
              href="/"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
                kiemTraKichHoat("/")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Trang Chủ</span>
            </Link>

            <Link
              href="/thiet-bi"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
                kiemTraKichHoat("/thiet-bi")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Laptop className="w-4 h-4 text-blue-600" />
              <span>Quản Lý Máy Tính (IT)</span>
            </Link>

            {taiKhoanHienTai && (
              <>
                <Link
                  href="/cap-nhat-thong-tin"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
                    kiemTraKichHoat("/cap-nhat-thong-tin")
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <UserPen className="w-4 h-4 text-emerald-600" />
                  <span>Cập Nhật Hồ Sơ</span>
                </Link>

                <Link
                  href="/doi-mat-khau"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-bold transition-all ${
                    kiemTraKichHoat("/doi-mat-khau")
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  <span>Đổi Mật Khẩu</span>
                </Link>
              </>
            )}
          </nav>

          {/* User profile / Auth buttons */}
          <div className="flex items-center space-x-3">
            {taiKhoanHienTai ? (
              <div className="flex items-center space-x-3 bg-slate-100/80 border border-slate-200 py-1.5 px-3 rounded-xl">
                <img
                  src={taiKhoanHienTai.avatar}
                  alt={taiKhoanHienTai.hoTen}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="hidden lg:block text-left text-xs">
                  <span className="font-extrabold text-slate-900 block truncate max-w-[120px]">
                    {taiKhoanHienTai.hoTen}
                  </span>
                  <span className="text-slate-500 block text-[11px] font-mono">@{taiKhoanHienTai.tenDangNhap}</span>
                </div>
                <button
                  onClick={() => dangXuat()}
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-bold">
                <Link
                  href="/dang-nhap"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-blue-600" />
                  <span>Đăng Nhập</span>
                </Link>
                <Link
                  href="/dang-ky"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Đăng Ký</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-200 text-xs">
          <Link
            href="/"
            className={`flex flex-col items-center p-1 ${
              kiemTraKichHoat("/") ? "text-blue-600 font-bold" : "text-slate-500"
            }`}
          >
            <Home className="w-4 h-4 mb-0.5" />
            <span>Trang chủ</span>
          </Link>
          <Link
            href="/thiet-bi"
            className={`flex flex-col items-center p-1 ${
              kiemTraKichHoat("/thiet-bi") ? "text-blue-600 font-bold" : "text-slate-500"
            }`}
          >
            <Laptop className="w-4 h-4 mb-0.5" />
            <span>Máy tính</span>
          </Link>
          <Link
            href="/cap-nhat-thong-tin"
            className={`flex flex-col items-center p-1 ${
              kiemTraKichHoat("/cap-nhat-thong-tin") ? "text-blue-600 font-bold" : "text-slate-500"
            }`}
          >
            <UserPen className="w-4 h-4 mb-0.5" />
            <span>Cập nhật</span>
          </Link>
          <Link
            href="/doi-mat-khau"
            className={`flex flex-col items-center p-1 ${
              kiemTraKichHoat("/doi-mat-khau") ? "text-blue-600 font-bold" : "text-slate-500"
            }`}
          >
            <KeyRound className="w-4 h-4 mb-0.5" />
            <span>Đổi MK</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
