import React from "react";
import Link from "next/link";
import { useNguoiDung } from "@/context/NguoiDungContext";
import {
  GraduationCap,
  LogIn,
  UserPlus,
  UserPen,
  KeyRound,
  Laptop,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  BookOpen,
  User,
  Shield,
  Clock,
  Repeat,
  Wrench,
  Sparkles
} from "lucide-react";

export const TrangChuRiengBiet: React.FC = () => {
  const { taiKhoanHienTai, dangXuat } = useNguoiDung();

  const tenHienThi = taiKhoanHienTai?.hoTen || "Trần Quang Tuyến";
  const mssvHienThi = taiKhoanHienTai?.mssv || "525000486";
  const lopHienThi = taiKhoanHienTai?.lop || "25CT501";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 1. Welcome Banner Card (Clean Minimalist White Style) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Cổng Thông Tin Sinh Viên & Quản Lý Tài Sản</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {taiKhoanHienTai ? `Xin chào, ${taiKhoanHienTai.hoTen}!` : "Trang Chủ Thông Tin Sinh Viên"}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Hệ thống quản lý thông tin sinh viên thuộc về <strong className="text-slate-900">{tenHienThi}</strong> (MSSV:{" "}
                <span className="font-mono font-bold text-blue-600">{mssvHienThi}</span> • Lớp:{" "}
                <span className="font-mono font-bold text-blue-600">{lopHienThi}</span>). Dễ dàng sử dụng các tính năng Mượn & bảo trì máy tính, Đổi trả thiết bị, Cập nhật hồ sơ và Đổi mật khẩu.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {taiKhoanHienTai ? (
                  <>
                    <Link
                      href="/thiet-bi"
                      className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm flex items-center space-x-2 transition-all"
                    >
                      <Laptop className="w-4 h-4" />
                      <span>Quản Lý Máy Tính IT</span>
                    </Link>

                    <Link
                      href="/cap-nhat-thong-tin"
                      className="px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center space-x-2 transition-all"
                    >
                      <UserPen className="w-4 h-4 text-emerald-600" />
                      <span>Cập Nhật Hồ Sơ</span>
                    </Link>

                    <Link
                      href="/doi-mat-khau"
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center space-x-2 transition-all"
                    >
                      <KeyRound className="w-4 h-4 text-amber-600" />
                      <span>Đổi Mật Khẩu</span>
                    </Link>

                    <button
                      onClick={() => dangXuat()}
                      className="px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-all"
                    >
                      Đăng Xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dang-nhap"
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm flex items-center space-x-2 transition-all"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Đăng Nhập Ngay</span>
                    </Link>

                    <Link
                      href="/dang-ky"
                      className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 flex items-center space-x-2 transition-all"
                    >
                      <UserPlus className="w-4 h-4 text-blue-600" />
                      <span>Đăng Ký Tài Khoản</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Avatar Badge */}
            <div className="shrink-0 relative">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100">
                <img
                  src={
                    taiKhoanHienTai?.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                  }
                  alt={tenHienThi}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow-sm border-2 border-white">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Quick Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-extrabold block">MSSV</span>
              <span className="text-sm font-black text-slate-900 font-mono">{mssvHienThi}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-extrabold block">Lớp Sinh Hoạt</span>
              <span className="text-sm font-black text-slate-900 font-mono">{lopHienThi}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <Mail className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[11px] text-slate-500 uppercase font-extrabold block">Email Liên Hệ</span>
              <span className="text-xs font-bold text-slate-800 truncate block">
                {taiKhoanHienTai?.email || "tranquangtuyen@gmail.com"}
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-extrabold block">Số Điện Thoại</span>
              <span className="text-xs font-bold text-slate-800 block">
                {taiKhoanHienTai?.soDienThoai || "0987654321"}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Main Features Navigation Hub */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Danh Mục Các Chức Năng Chính
            </h2>
            <p className="text-xs text-slate-500">BẤM VÀO ĐỂ TRUY CẬP TRỰC TIẾP VÀO TỪNG TRANG</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Quản lý Mượn & Bảo Trì Máy Tính (FEATURED) */}
            <Link
              href="/thiet-bi"
              className="group p-6 rounded-2xl bg-white hover:bg-slate-50 border-2 border-blue-500/30 hover:border-blue-600 shadow-sm transition-all flex flex-col justify-between md:col-span-2 lg:col-span-3"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shadow-sm">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        NỔI BẬT
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors">
                        Quản Lý Mượn, Đổi Trả & Bảo Trì Máy Tính (IT Asset)
                      </h3>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Chuẩn giao diện IT Asset Management</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Giao diện quản lý tài sản IT chuyên nghiệp (Laptop Dell XPS, MacBook Pro, ThinkPad, Máy in, Thiết bị mạng, Nhà cung cấp Phong Vũ PC). Hỗ trợ đăng ký mượn máy, gửi phiếu đổi trả và báo hỏng bảo trì gọn gàng.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <Laptop className="w-4 h-4 text-blue-600" />
                    <span>Mượn máy tính</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <Repeat className="w-4 h-4 text-amber-600" />
                    <span>Đổi / Trả thiết bị</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <Wrench className="w-4 h-4 text-purple-600" />
                    <span>Báo bảo trì sửa chữa</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-blue-600 pt-4 border-t border-slate-100 mt-4">
                <span>Truy cập trang Quản Lý Máy Tính (IT) →</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Cập Nhật Hồ Sơ */}
            <Link
              href="/cap-nhat-thong-tin"
              className="group p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-500/50 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                    <UserPen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Trang 2
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  Cập Nhật Thông Tin Cá Nhân
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Chỉnh sửa tên sinh viên, email, số điện thoại, chọn ảnh đại diện avatar hoặc nhập URL ảnh cá nhân.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 pt-3 border-t border-slate-100">
                <span>Mở trang cập nhật</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Đổi Mật Khẩu */}
            <Link
              href="/doi-mat-khau"
              className="group p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-500/50 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Trang 3
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  Đổi Mật Khẩu Tài Khoản
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Thay đổi mật khẩu đăng nhập an toàn với công cụ đo độ mạnh mật khẩu trực quan.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-amber-600 pt-3 border-t border-slate-100">
                <span>Đổi mật khẩu ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 4: Đăng Nhập & Đăng Ký */}
            <Link
              href="/dang-nhap"
              className="group p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-500/50 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                    <LogIn className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Trang Auth
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  Đăng Nhập & Đăng Ký
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Trang xác thực tài khoản sinh viên với chế độ đăng nhập, tạo tài khoản mới hoặc đổi mật khẩu.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-blue-600 pt-3 border-t border-slate-100">
                <span>Mở trang đăng nhập</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
