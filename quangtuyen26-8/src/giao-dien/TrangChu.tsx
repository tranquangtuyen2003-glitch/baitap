import React, { useState } from "react";
import Link from "next/link";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { TrangDangNhap } from "./TrangDangNhap";
import { TrangDangKy } from "./TrangDangKy";
import { CapNhatThongTin } from "./CapNhatThongTin";
import { DoiMatKhau } from "./DoiMatKhau";
import {
  GraduationCap,
  User,
  BadgeCheck,
  Mail,
  Phone,
  Calendar,
  LogIn,
  UserPlus,
  UserPen,
  KeyRound,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Shield,
  BookOpen
} from "lucide-react";

export const TrangChu: React.FC = () => {
  const { taiKhoanHienTai } = useNguoiDung();
  const [tabHienTai, setTabHienTai] = useState<"tong-quan" | "dang-nhap" | "dang-ky" | "cap-nhat" | "doi-mat-khau">("tong-quan");

  return (
    <div className="min-h-[90vh] bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Tab Selection Bar directly on Home for convenience */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-xl">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setTabHienTai("tong-quan")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                tabHienTai === "tong-quan"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Trang Chủ / Tổng Quan</span>
            </button>

            <button
              onClick={() => setTabHienTai("dang-nhap")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                tabHienTai === "dang-nhap"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>1. Trang Đăng Nhập</span>
            </button>

            <button
              onClick={() => setTabHienTai("dang-ky")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                tabHienTai === "dang-ky"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>2. Trang Đăng Ký</span>
            </button>

            <button
              onClick={() => setTabHienTai("cap-nhat")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                tabHienTai === "cap-nhat"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <UserPen className="w-4 h-4" />
              <span>3. Cập Nhật Thông Tin</span>
            </button>

            <button
              onClick={() => setTabHienTai("doi-mat-khau")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                tabHienTai === "doi-mat-khau"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>4. Đổi Mật Khẩu</span>
            </button>
          </div>

          <Link
            href="/detail"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <ImageIcon className="w-4 h-4 text-purple-400" />
            <span>Xem Trang Cấp 2 →</span>
          </Link>
        </div>

        {/* Tab Content Rendering */}
        {tabHienTai === "dang-nhap" && <TrangDangNhap />}
        {tabHienTai === "dang-ky" && <TrangDangKy />}
        {tabHienTai === "cap-nhat" && <CapNhatThongTin />}
        {tabHienTai === "doi-mat-khau" && <DoiMatKhau />}

        {tabHienTai === "tong-quan" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Student Profile Card Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 shadow-2xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="relative group shrink-0">
                  <img
                    src={
                      taiKhoanHienTai?.avatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                    }
                    alt={taiKhoanHienTai?.hoTen || "Trần Quang Tuyến"}
                    className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-blue-500/50 shadow-xl shadow-blue-500/10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-xl shadow-lg">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Main Student Info */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                      {taiKhoanHienTai?.hoTen || "Trần Quang Tuyến"}
                    </h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 border border-blue-500/30 text-blue-400">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Sinh Viên Chính Thức
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                    {taiKhoanHienTai?.bio ||
                      "Sinh viên ngành Công nghệ thông tin. Đam mê thiết kế giao diện web hiện đại, tối ưu trải nghiệm người dùng và phát triển phần mềm chất lượng cao."}
                  </p>

                  {/* Badges / Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold block">MSSV</span>
                      <span className="text-base font-bold text-white font-mono">
                        {taiKhoanHienTai?.mssv || "525000486"}
                      </span>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold block">Lớp Học</span>
                      <span className="text-base font-bold text-white font-mono">
                        {taiKhoanHienTai?.lop || "25CT501"}
                      </span>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-xl col-span-2 sm:col-span-1">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold block">Trạng Thái Auth</span>
                      <span className="text-sm font-semibold text-emerald-400 flex items-center mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                        {taiKhoanHienTai ? "Đã Đăng Nhập" : "Khách"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs text-slate-400 block">Địa chỉ Email</span>
                  <span className="text-sm font-medium text-slate-200 truncate block">
                    {taiKhoanHienTai?.email || "tranquangtuyen@gmail.com"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Số Điện Thoại</span>
                  <span className="text-sm font-medium text-slate-200 block">
                    {taiKhoanHienTai?.soDienThoai || "0987654321"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Ngày Sinh / Giới tính</span>
                  <span className="text-sm font-medium text-slate-200 block">
                    {taiKhoanHienTai?.ngaySinh || "2003-08-23"} ({taiKhoanHienTai?.gioiTinh || "Nam"})
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Required Action Cards */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>4 Chức Năng Yêu Cầu Đã Hoàn Thành</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Login */}
                <div
                  onClick={() => setTabHienTai("dang-nhap")}
                  className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-200 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <LogIn className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">1. Trang Đăng Nhập</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Giao diện đăng nhập hoàn chỉnh với kiểm tra mật khẩu, ẩn/hiện mật khẩu và lưu trạng thái.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">
                    Mở form đăng nhập <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>

                {/* 2. Register */}
                <div
                  onClick={() => setTabHienTai("dang-ky")}
                  className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-200 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">2. Trang Đăng Ký</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Tạo tài khoản mới với đầy đủ thông tin MSSV, Lớp, Email và xác thực trùng khớp mật khẩu.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-400 flex items-center group-hover:translate-x-1 transition-transform">
                    Mở form đăng ký <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>

                {/* 3. Update Profile */}
                <div
                  onClick={() => setTabHienTai("cap-nhat")}
                  className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-200 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UserPen className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">3. Cập Nhật Thông Tin</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Thay đổi thông tin cá nhân, chọn avatar mới và lưu trực tiếp vào bộ nhớ hệ thống.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center group-hover:translate-x-1 transition-transform">
                    Cập nhật thông tin <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>

                {/* 4. Change Password */}
                <div
                  onClick={() => setTabHienTai("doi-mat-khau")}
                  className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-200 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">4. Đổi Mật Khẩu</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Kiểm tra mật khẩu cũ, đánh giá độ mạnh mật khẩu mới và thay đổi an toàn.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 flex items-center group-hover:translate-x-1 transition-transform">
                    Đổi mật khẩu ngay <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
