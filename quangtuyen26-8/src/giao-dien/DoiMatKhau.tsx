import React, { useState } from "react";
import Link from "next/link";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { KeyRound, Lock, Eye, EyeOff, ShieldAlert, CheckCircle2, ArrowLeft } from "lucide-react";

export const DoiMatKhau: React.FC = () => {
  const { taiKhoanHienTai, doiMatKhau, hienThongBao } = useNguoiDung();

  const [matKhauCu, setMatKhauCu] = useState("");
  const [matKhauMoi, setMatKhauMoi] = useState("");
  const [xacNhanMatKhauMoi, setXacNhanMatKhauMoi] = useState("");

  const [hienMatKhauCu, setHienMatKhauCu] = useState(false);
  const [hienMatKhauMoi, setHienMatKhauMoi] = useState(false);
  const [dangXuLy, setDangXuLy] = useState(false);

  if (!taiKhoanHienTai) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
        <div className="max-w-md w-full text-center p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <KeyRound className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Chưa Đăng Nhập</h3>
          <p className="text-slate-500 text-sm mb-6">
            Vui lòng đăng nhập tài khoản trước khi thực hiện đổi mật khẩu.
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

  const xuLyDoiMatKhau = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!matKhauCu) {
      hienThongBao("Vui lòng nhập mật khẩu hiện tại!", "warning");
      return;
    }

    if (matKhauMoi.length < 6) {
      hienThongBao("Mật khẩu mới phải có từ 6 ký tự trở lên!", "warning");
      return;
    }

    if (matKhauMoi !== xacNhanMatKhauMoi) {
      hienThongBao("Mật khẩu mới và Nhập lại mật khẩu không trùng khớp!", "error");
      return;
    }

    setDangXuLy(true);
    try {
      const res = await doiMatKhau(matKhauCu, matKhauMoi);
      if (res.success) {
        setMatKhauCu("");
        setMatKhauMoi("");
        setXacNhanMatKhauMoi("");
      }
    } finally {
      setDangXuLy(false);
    }
  };

  const tinhDoManhMatKhau = () => {
    if (!matKhauMoi) return null;
    if (matKhauMoi.length < 6) return { text: "Yếu", color: "text-rose-700 bg-rose-100" };
    if (matKhauMoi.length >= 8 && /[A-Z]/.test(matKhauMoi) && /[0-9]/.test(matKhauMoi)) {
      return { text: "Rất mạnh", color: "text-emerald-700 bg-emerald-100" };
    }
    return { text: "Trung bình", color: "text-amber-700 bg-amber-100" };
  };

  const strength = tinhDoManhMatKhau();

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 font-sans">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Đổi Mật Khẩu</h2>
              <p className="text-xs text-slate-500">Tài khoản: {taiKhoanHienTai.hoTen}</p>
            </div>
          </div>
          <Link href="/" className="text-slate-500 hover:text-slate-800 p-1 text-xs">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Security hint */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2.5 text-xs text-amber-800">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Khuyên dùng mật khẩu từ 8 ký tự trở lên bao gồm cả chữ cái và chữ số để bảo mật tốt nhất.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={xuLyDoiMatKhau} className="space-y-4">
          {/* Mật khẩu hiện tại */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mật khẩu hiện tại *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={hienMatKhauCu ? "text" : "password"}
                required
                value={matKhauCu}
                onChange={(e) => setMatKhauCu(e.target.value)}
                placeholder="Nhập mật khẩu đang dùng"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setHienMatKhauCu(!hienMatKhauCu)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {hienMatKhauCu ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Mật khẩu mới *
              </label>
              {strength && (
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${strength.color}`}>
                  {strength.text}
                </span>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-amber-600" />
              </div>
              <input
                type={hienMatKhauMoi ? "text" : "password"}
                required
                value={matKhauMoi}
                onChange={(e) => setMatKhauMoi(e.target.value)}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setHienMatKhauMoi(!hienMatKhauMoi)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {hienMatKhauMoi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Nhập lại mật khẩu mới */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nhập lại mật khẩu mới *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-amber-600" />
              </div>
              <input
                type={hienMatKhauMoi ? "text" : "password"}
                required
                value={xacNhanMatKhauMoi}
                onChange={(e) => setXacNhanMatKhauMoi(e.target.value)}
                placeholder="Nhập lại mật khẩu mới để xác nhận"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:ring-2 focus:outline-none transition-all ${
                  xacNhanMatKhauMoi && matKhauMoi !== xacNhanMatKhauMoi
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-slate-200 focus:ring-amber-500 focus:bg-white"
                }`}
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={dangXuLy}
            className="w-full mt-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50 text-xs uppercase tracking-wider"
          >
            {dangXuLy ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Cập Nhật Mật Khẩu</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 font-medium">
            Hủy và quay lại Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};
