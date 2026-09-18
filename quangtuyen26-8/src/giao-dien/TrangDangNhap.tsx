import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { LogIn, Eye, EyeOff, UserCheck, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export const TrangDangNhap: React.FC = () => {
  const router = useRouter();
  const { dangNhap, taiKhoanHienTai } = useNguoiDung();

  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [ghiNho, setGhiNho] = useState(true);
  const [dangXuLy, setDangXuLy] = useState(false);

  const xuLyDangNhap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenDangNhap.trim() || !matKhau) return;

    setDangXuLy(true);
    try {
      const res = await dangNhap(tenDangNhap, matKhau);
      if (res.success) {
        router.push("/");
      }
    } finally {
      setDangXuLy(false);
    }
  };

  const dienTaiKhoanMau = () => {
    setTenDangNhap("525000486");
    setMatKhau("123456");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 font-sans">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 mb-1">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Đăng Nhập Hệ Thống</h2>
          <p className="text-xs text-slate-500">
            {taiKhoanHienTai ? (
              <>
                Đang đăng nhập: <span className="text-blue-600 font-bold">{taiKhoanHienTai.hoTen}</span>
              </>
            ) : (
              "Hệ thống xác thực và quản lý sinh viên"
            )}
          </p>
        </div>

        {/* Current user badge */}
        {taiKhoanHienTai && (
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-slate-700">
                Đang đăng nhập: <strong className="text-slate-900">{taiKhoanHienTai.hoTen}</strong>
              </span>
            </div>
            <Link href="/" className="text-blue-600 hover:underline flex items-center font-bold">
              Vào trang chủ <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        )}

        {/* Form */}
        <form className="mt-6 space-y-4 text-xs" onSubmit={xuLyDangNhap}>
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Tên đăng nhập / Email / MSSV
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                placeholder="Vd: 525000486 hoặc tranquangtuyen@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold uppercase tracking-wider text-slate-700">
                Mật khẩu
              </label>
              <Link href="/doi-mat-khau" className="text-blue-600 hover:underline font-medium">
                Quên / Đổi mật khẩu?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={hienMatKhau ? "text" : "password"}
                required
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                placeholder="Nhập mật khẩu (vd: 123456)"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs transition-all"
              />
              <button
                type="button"
                onClick={() => setHienMatKhau(!hienMatKhau)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {hienMatKhau ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember & Fill button */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={ghiNho}
                onChange={(e) => setGhiNho(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>

            <button
              type="button"
              onClick={dienTaiKhoanMau}
              className="text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 font-bold underline"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Điền thử tài khoản mẫu</span>
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={dangXuLy}
            className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50 text-xs uppercase tracking-wider"
          >
            {dangXuLy ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập Ngay</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Chưa có tài khoản?{" "}
            <Link href="/dang-ky" className="font-bold text-blue-600 hover:underline">
              Đăng ký tài khoản mới →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
