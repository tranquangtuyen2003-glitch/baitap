import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { LogIn, UserPlus, KeyRound, Eye, EyeOff, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";

interface Props {
  cheDoMacDinh?: "dang-nhap" | "dang-ky" | "quen-mat-khau";
}

export const TrangXacThuc: React.FC<Props> = ({ cheDoMacDinh = "dang-nhap" }) => {
  const router = useRouter();
  const { dangNhap, dangKy, doiMatKhau, danhSachTaiKhoan, hienThongBao, taiKhoanHienTai } = useNguoiDung();

  const [cheDo, setCheDo] = useState<"dang-nhap" | "dang-ky" | "quen-mat-khau">(cheDoMacDinh);

  // Login state
  const [loginForm, setLoginForm] = useState({ tenDangNhap: "", matKhau: "" });

  // Register state
  const [registerForm, setRegisterForm] = useState({
    tenDangNhap: "",
    hoTen: "",
    email: "",
    matKhau: "",
    xacNhanMatKhau: "",
  });

  // Forgot Password state
  const [forgotForm, setForgotForm] = useState({
    tenDangNhapHoacEmail: "",
    matKhauMoi: "",
    xacNhanMatKhauMoi: "",
  });

  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [dangXuLy, setDangXuLy] = useState(false);

  // Handlers
  const xuLyDangNhap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.tenDangNhap.trim() || !loginForm.matKhau) {
      hienThongBao("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!", "warning");
      return;
    }

    setDangXuLy(true);
    try {
      const res = await dangNhap(loginForm.tenDangNhap, loginForm.matKhau);
      if (res.success) {
        router.push("/");
      }
    } finally {
      setDangXuLy(false);
    }
  };

  const xuLyDangKy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.tenDangNhap.trim() || !registerForm.hoTen.trim() || !registerForm.email.trim()) {
      hienThongBao("Vui lòng điền đầy đủ các thông tin bắt buộc!", "warning");
      return;
    }
    if (registerForm.matKhau.length < 6) {
      hienThongBao("Mật khẩu phải từ 6 ký tự trở lên!", "warning");
      return;
    }
    if (registerForm.matKhau !== registerForm.xacNhanMatKhau) {
      hienThongBao("Nhập lại mật khẩu không trùng khớp!", "error");
      return;
    }

    setDangXuLy(true);
    try {
      const res = await dangKy({
        tenDangNhap: registerForm.tenDangNhap,
        hoTen: registerForm.hoTen,
        email: registerForm.email,
        soDienThoai: "0912345678",
        mssv: "525000486",
        lop: "25CT501",
        ngaySinh: "2003-08-23",
        gioiTinh: "Nam",
        matKhau: registerForm.matKhau,
      });
      if (res.success) {
        router.push("/");
      }
    } finally {
      setDangXuLy(false);
    }
  };

  const xuLyQuenMatKhau = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotForm.tenDangNhapHoacEmail.trim()) {
      hienThongBao("Vui lòng nhập tên đăng nhập hoặc email!", "warning");
      return;
    }
    if (forgotForm.matKhauMoi.length < 6) {
      hienThongBao("Mật khẩu mới phải từ 6 ký tự trở lên!", "warning");
      return;
    }
    if (forgotForm.matKhauMoi !== forgotForm.xacNhanMatKhauMoi) {
      hienThongBao("Nhập lại mật khẩu mới không trùng khớp!", "error");
      return;
    }

    // Find account
    const userFound = danhSachTaiKhoan.find(
      (u) =>
        u.tenDangNhap.toLowerCase() === forgotForm.tenDangNhapHoacEmail.trim().toLowerCase() ||
        u.email.toLowerCase() === forgotForm.tenDangNhapHoacEmail.trim().toLowerCase()
    );

    if (!userFound) {
      hienThongBao("Không tìm thấy tài khoản tương ứng trên hệ thống!", "error");
      return;
    }

    setDangXuLy(true);
    setTimeout(() => {
      // Direct update
      userFound.matKhau = forgotForm.matKhauMoi;
      hienThongBao(`Đã khôi phục mật khẩu thành công cho tài khoản ${userFound.hoTen}!`, "success");
      setDangXuLy(false);
      setCheDo("dang-nhap");
      setLoginForm({ tenDangNhap: userFound.tenDangNhap, matKhau: forgotForm.matKhauMoi });
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white text-slate-800 font-sans">
      {/* LEFT PANEL: Vibrant Wave Blue-Purple Gradient (Matching Screenshot) */}
      <div className="w-full md:w-1/2 min-h-[300px] md:min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-900 p-8 md:p-14 flex flex-col justify-between relative overflow-hidden text-white">
        {/* Background Decorative Rings */}
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full border border-white/10 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-widest text-sm uppercase">QLPL DEMO</span>
        </div>

        {/* Middle Hero Text */}
        <div className="relative z-10 my-12 md:my-auto space-y-4 max-w-md">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-200">Join us today</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white">
            GET STARTED
          </h1>
          <p className="text-sm text-blue-100/80 leading-relaxed pt-2">
            Hệ thống quản lý thông tin sinh viên <strong className="text-white">Trần Quang Tuyến (MSSV: 525000486)</strong>.
            Đăng nhập để cập nhật hồ sơ cá nhân và sử dụng tất cả tính năng.
          </p>

          {/* Quick status if logged in */}
          {taiKhoanHienTai && (
            <div className="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center space-x-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Đang đăng nhập: <strong>{taiKhoanHienTai.hoTen}</strong></span>
            </div>
          )}
        </div>

        {/* Bottom copyright badge */}
        <div className="relative z-10 flex items-center justify-between text-xs text-blue-200/70 border-t border-white/10 pt-4">
          <span>© 2026 QLPL DEMO</span>
          <Link href="/" className="hover:text-white flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
        </div>
      </div>

      {/* RIGHT PANEL: Form Section (Matching Screenshot) */}
      <div className="w-full md:w-1/2 min-h-screen bg-slate-50 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
          
          {/* Mode Header */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {cheDo === "dang-nhap" && "Đăng nhập"}
              {cheDo === "dang-ky" && "Đăng ký"}
              {cheDo === "quen-mat-khau" && "Quên mật khẩu"}
            </h2>
            <p className="text-sm text-slate-400">
              {cheDo === "dang-nhap" && "Nhập thông tin tài khoản bên dưới để tiếp tục."}
              {cheDo === "dang-ky" && "Nhập thông tin bên dưới để tiếp tục."}
              {cheDo === "quen-mat-khau" && "Nhập thông tin bên dưới để đặt lại mật khẩu."}
            </p>
          </div>

          {/* MODE 1: ĐĂNG NHẬP */}
          {cheDo === "dang-nhap" && (
            <form onSubmit={xuLyDangNhap} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={loginForm.tenDangNhap}
                  onChange={(e) => setLoginForm({ ...loginForm, tenDangNhap: e.target.value })}
                  placeholder="Tên đăng nhập"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="relative">
                <input
                  type={hienMatKhau ? "text" : "password"}
                  required
                  value={loginForm.matKhau}
                  onChange={(e) => setLoginForm({ ...loginForm, matKhau: e.target.value })}
                  placeholder="Mật khẩu"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setHienMatKhau(!hienMatKhau)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {hienMatKhau ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setLoginForm({ tenDangNhap: "525000486", matKhau: "123456" });
                  }}
                  className="text-slate-500 hover:text-slate-800 underline"
                >
                  Điền tài khoản mẫu
                </button>

                <button
                  type="button"
                  onClick={() => setCheDo("quen-mat-khau")}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                disabled={dangXuLy}
                className="w-full mt-4 py-3.5 px-6 bg-[#e5b738] hover:bg-[#d8a829] text-slate-900 font-bold rounded-full text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {dangXuLy ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              </button>

              <div className="text-right pt-3">
                <button
                  type="button"
                  onClick={() => setCheDo("dang-ky")}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Chưa có tài khoản? Đăng ký ngay
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: ĐĂNG KÝ (Exact Screenshot Layout) */}
          {cheDo === "dang-ky" && (
            <form onSubmit={xuLyDangKy} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={registerForm.tenDangNhap}
                  onChange={(e) => setRegisterForm({ ...registerForm, tenDangNhap: e.target.value })}
                  placeholder="Tên đăng nhập"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={registerForm.hoTen}
                  onChange={(e) => setRegisterForm({ ...registerForm, hoTen: e.target.value })}
                  placeholder="Họ và tên"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="relative">
                <input
                  type={hienMatKhau ? "text" : "password"}
                  required
                  value={registerForm.matKhau}
                  onChange={(e) => setRegisterForm({ ...registerForm, matKhau: e.target.value })}
                  placeholder="Mật khẩu"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setHienMatKhau(!hienMatKhau)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {hienMatKhau ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div>
                <input
                  type={hienMatKhau ? "text" : "password"}
                  required
                  value={registerForm.xacNhanMatKhau}
                  onChange={(e) => setRegisterForm({ ...registerForm, xacNhanMatKhau: e.target.value })}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="text-right pt-1">
                <button
                  type="button"
                  onClick={() => setCheDo("dang-nhap")}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Đã có tài khoản?
                </button>
              </div>

              <button
                type="submit"
                disabled={dangXuLy}
                className="w-full mt-4 py-3.5 px-6 bg-[#e5b738] hover:bg-[#d8a829] text-slate-900 font-bold rounded-full text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {dangXuLy ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}
              </button>
            </form>
          )}

          {/* MODE 3: QUÊN MẬT KHẨU */}
          {cheDo === "quen-mat-khau" && (
            <form onSubmit={xuLyQuenMatKhau} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  value={forgotForm.tenDangNhapHoacEmail}
                  onChange={(e) => setForgotForm({ ...forgotForm, tenDangNhapHoacEmail: e.target.value })}
                  placeholder="Tên đăng nhập hoặc Email"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <input
                  type={hienMatKhau ? "text" : "password"}
                  required
                  value={forgotForm.matKhauMoi}
                  onChange={(e) => setForgotForm({ ...forgotForm, matKhauMoi: e.target.value })}
                  placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <input
                  type={hienMatKhau ? "text" : "password"}
                  required
                  value={forgotForm.xacNhanMatKhauMoi}
                  onChange={(e) => setForgotForm({ ...forgotForm, xacNhanMatKhauMoi: e.target.value })}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="text-right pt-1">
                <button
                  type="button"
                  onClick={() => setCheDo("dang-nhap")}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Quay lại đăng nhập?
                </button>
              </div>

              <button
                type="submit"
                disabled={dangXuLy}
                className="w-full mt-4 py-3.5 px-6 bg-[#e5b738] hover:bg-[#d8a829] text-slate-900 font-bold rounded-full text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {dangXuLy ? "ĐANG XỬ LÝ..." : "ĐẶT LẠI MẬT KHẨU"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
