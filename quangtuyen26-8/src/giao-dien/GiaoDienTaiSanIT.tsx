import React, { useState } from "react";
import Link from "next/link";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { useThietBi, MayTinh, YeuCauThietBi, NhaCungCap } from "@/context/ThietBiContext";
import {
  Monitor,
  LayoutGrid,
  Laptop,
  Repeat,
  Wrench,
  Layers,
  Truck,
  Menu,
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Phone,
  MapPin,
  Send,
  UserCheck,
  ShieldCheck,
  ChevronDown,
  Home,
  UserPen,
  KeyRound,
  LogIn,
  UserPlus,
  LogOut
} from "lucide-react";

type MenuSection = "tong-quan" | "thiet-bi" | "cap-phat" | "bao-tri" | "loai-thiet-bi" | "nha-cung-cap";

export const GiaoDienTaiSanIT: React.FC = () => {
  const { taiKhoanHienTai, hienThongBao, dangXuat } = useNguoiDung();
  const {
    danhSachMayTinh,
    danhSachYeuCau,
    danhSachNhaCungCap,
    danhSachLoaiThietBi,
    taoYeuCau,
    capNhatTrangThaiYeuCau,
    traMayHoacDoiMay,
    themNhaCungCap,
    xoaNhaCungCap,
  } = useThietBi();

  const [activeMenu, setActiveMenu] = useState<MenuSection>("nha-cung-cap");
  const [subTabLoai, setSubTabLoai] = useState<string>("Máy tính");
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modal Add Supplier state
  const [isAddNccModalOpen, setIsAddNccModalOpen] = useState(false);
  const [nccForm, setNccForm] = useState({ maNcc: "", tenDoiTac: "", soDienThoai: "", danhGia: "Tốt", diaChi: "" });

  // Modal Create Request state
  const [isCreateRequestModalOpen, setIsCreateRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    maMay: "",
    loaiYeuCau: "Muon" as "CapPhat" | "Muon" | "DoiTra" | "BaoTri",
    lyDo: "",
    ngayHenTra: "",
  });

  const [dangXuLy, setDangXuLy] = useState(false);

  // Statistics calculation
  const tongThietBi = danhSachMayTinh.length;
  const maySanSangCount = danhSachMayTinh.filter((m) => m.trangThai === "SanSang").length;
  const mayDangMuonCount = danhSachMayTinh.filter((m) => m.trangThai === "DangChoMuon").length;
  const mayBaoTriCount = danhSachMayTinh.filter((m) => m.trangThai === "DangBaoTri").length;

  // Filtered equipment by sub-tab and keyword
  const thietBiHienThi = danhSachMayTinh.filter((m) => {
    const matchLoai = m.loai === subTabLoai;
    const matchTuKhoa =
      m.tenMay.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()) ||
      m.maMay.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()) ||
      m.cauHinh.toLowerCase().includes(tuKhoaTimKiem.toLowerCase());
    return matchLoai && matchTuKhoa;
  });

  // Filtered suppliers
  const nhaCungCapHienThi = danhSachNhaCungCap.filter(
    (n) =>
      n.tenDoiTac.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()) ||
      n.maNcc.toLowerCase().includes(tuKhoaTimKiem.toLowerCase()) ||
      n.soDienThoai.includes(tuKhoaTimKiem)
  );

  // Handle Add Supplier
  const xuLyThemNcc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nccForm.maNcc.trim() || !nccForm.tenDoiTac.trim() || !nccForm.soDienThoai.trim()) {
      hienThongBao("Vui lòng nhập đầy đủ mã, tên đối tác và số điện thoại!", "warning");
      return;
    }

    setDangXuLy(true);
    try {
      const res = await themNhaCungCap(nccForm);
      if (res.success) {
        hienThongBao(res.message, "success");
        setIsAddNccModalOpen(false);
        setNccForm({ maNcc: "", tenDoiTac: "", soDienThoai: "", danhGia: "Tốt", diaChi: "" });
      }
    } finally {
      setDangXuLy(false);
    }
  };

  // Handle Create Request
  const xuLyTaoYeuCau = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taiKhoanHienTai) {
      hienThongBao("Vui lòng đăng nhập tài khoản!", "error");
      return;
    }
    const targetMay = danhSachMayTinh.find((m) => m.maMay === requestForm.maMay);
    if (!targetMay) {
      hienThongBao("Vui lòng chọn thiết bị!", "warning");
      return;
    }
    if (!requestForm.lyDo.trim()) {
      hienThongBao("Vui lòng nhập lý do cấp phát / mượn / bảo trì!", "warning");
      return;
    }

    setDangXuLy(true);
    try {
      const res = await taoYeuCau({
        tenDangNhap: taiKhoanHienTai.tenDangNhap,
        hoTen: taiKhoanHienTai.hoTen,
        maMay: targetMay.maMay,
        tenMay: targetMay.tenMay,
        loaiYeuCau: requestForm.loaiYeuCau,
        lyDo: requestForm.lyDo,
        ngayHenTra: requestForm.ngayHenTra,
      });

      if (res.success) {
        hienThongBao(res.message, "success");
        setIsCreateRequestModalOpen(false);
        setActiveMenu("cap-phat");
      }
    } finally {
      setDangXuLy(false);
    }
  };

  // Menu item helper
  const renderMenuItem = (
    key: MenuSection,
    label: string,
    IconComp: React.ComponentType<{ className?: string }>
  ) => {
    const isActive = activeMenu === key;
    return (
      <button
        onClick={() => setActiveMenu(key)}
        className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all relative ${
          isActive
            ? "bg-[#252f48] text-white font-bold"
            : "text-slate-400 hover:text-slate-200 hover:bg-[#1a2236]"
        }`}
      >
        {/* Active Blue Left Bar (exact match screenshot) */}
        {isActive && (
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></span>
        )}
        <IconComp className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans flex overflow-hidden">
      
      {/* 1. LEFT SIDEBAR (Dark Navy Slate - exact screenshot design) */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        } bg-[#171e2e] text-slate-200 transition-all duration-300 shrink-0 flex flex-col justify-between z-30 shadow-2xl relative`}
      >
        <div>
          {/* Logo & Header */}
          <div className="p-5 border-b border-[#252f48] flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
              <Monitor className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="text-sm font-extrabold text-white tracking-tight leading-tight uppercase">
                  Quản Lý Tài Sản IT
                </h1>
                <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-medium">
                  Asset Management
                </span>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <div className="p-3 space-y-6">
            {/* Section 1: CHÍNH */}
            <div className="space-y-1">
              {sidebarOpen && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-4 mb-2 block">
                  CHÍNH
                </span>
              )}
              {renderMenuItem("tong-quan", "Tổng quan", LayoutGrid)}
              {renderMenuItem("thiet-bi", "Thiết bị", Laptop)}
              {renderMenuItem("cap-phat", "Cấp phát", Repeat)}
              {renderMenuItem("bao-tri", "Bảo trì", Wrench)}
            </div>

            {/* Section 2: DANH MỤC */}
            <div className="space-y-1">
              {sidebarOpen && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-4 mb-2 block">
                  DANH MỤC
                </span>
              )}
              {renderMenuItem("loai-thiet-bi", "Loại thiết bị", Layers)}
              {renderMenuItem("nha-cung-cap", "Nhà cung cấp", Truck)}
            </div>

            {/* Section 3: TÀI KHOẢN & HỆ THỐNG */}
            <div className="space-y-1 pt-2 border-t border-[#252f48]">
              {sidebarOpen && (
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-4 mb-2 block">
                  TÀI KHOẢN & HỆ THỐNG
                </span>
              )}
              <Link
                href="/"
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-[#1a2236] rounded-lg transition-all"
              >
                <Home className="w-4 h-4 text-blue-400" />
                {sidebarOpen && <span>Trang chủ</span>}
              </Link>

              {taiKhoanHienTai ? (
                <>
                  <Link
                    href="/cap-nhat-thong-tin"
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-[#1a2236] rounded-lg transition-all"
                  >
                    <UserPen className="w-4 h-4 text-emerald-400" />
                    {sidebarOpen && <span>Cập nhật thông tin</span>}
                  </Link>
                  <Link
                    href="/doi-mat-khau"
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-[#1a2236] rounded-lg transition-all"
                  >
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    {sidebarOpen && <span>Đổi mật khẩu</span>}
                  </Link>
                  <button
                    onClick={() => dangXuat()}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-900/20 rounded-lg transition-all text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    {sidebarOpen && <span>Đăng xuất</span>}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/dang-nhap"
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-[#1a2236] rounded-lg transition-all"
                  >
                    <LogIn className="w-4 h-4 text-blue-400" />
                    {sidebarOpen && <span>Đăng nhập</span>}
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-[#1a2236] rounded-lg transition-all"
                  >
                    <UserPlus className="w-4 h-4 text-indigo-400" />
                    {sidebarOpen && <span>Đăng ký</span>}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User Info Footer in Sidebar */}
        <div className="p-4 border-t border-[#252f48] bg-[#121825]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center text-xs shrink-0">
              QT
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden text-xs">
                <span className="font-bold text-white block truncate">
                  {taiKhoanHienTai ? taiKhoanHienTai.hoTen : "Trần Quang Tuyến"}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {taiKhoanHienTai ? `MSSV: ${taiKhoanHienTai.mssv}` : "525000486"}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* TOP HEADER (Clean White - exact match screenshot) */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {activeMenu === "nha-cung-cap" && "Nhà Cung Cấp"}
              {activeMenu === "thiet-bi" && "Danh Sách Thiết Bị IT"}
              {activeMenu === "cap-phat" && "Quản Lý Cấp Phát & Đổi Trả Máy Tính"}
              {activeMenu === "bao-tri" && "Quản Lý Bảo Trì Sửa Chữa Thiết Bị"}
              {activeMenu === "tong-quan" && "Tổng Quan Tài Sản IT"}
              {activeMenu === "loai-thiet-bi" && "Danh Mục Loại Thiết Bị"}
            </h2>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Input Box (exact match screenshot) */}
            <div className="relative hidden sm:block w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={tuKhoaTimKiem}
                onChange={(e) => setTuKhoaTimKiem(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Profile badge & Quick nav buttons */}
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
              <Link
                href="/"
                className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Về Trang chủ"
              >
                <Home className="w-3.5 h-3.5 text-blue-600" />
                <span>Trang chủ</span>
              </Link>

              {taiKhoanHienTai ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/cap-nhat-thong-tin"
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                    title="Cập nhật thông tin cá nhân"
                  >
                    <UserPen className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">{taiKhoanHienTai.hoTen}</span>
                  </Link>

                  <button
                    onClick={() => dangXuat()}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/dang-nhap"
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* BODY WORKSPACE AREA */}
        <main className="p-6 md:p-8 space-y-6 flex-1 bg-[#f8fafc]">
          
          {/* Top Header Action Row & Sub-Tabs Container */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Sub-Tabs (Pills container: Máy tính / Máy in / Thiết bị mạng - exact match screenshot) */}
            {(activeMenu === "thiet-bi" || activeMenu === "nha-cung-cap" || activeMenu === "tong-quan") && (
              <div className="inline-flex p-1 bg-slate-200/70 rounded-xl space-x-1 self-start">
                {["Máy tính", "Máy in", "Thiết bị mạng"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSubTabLoai(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      subTabLoai === tab
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Top Right Action Button (Exact Dark Blue Rounded Button matching screenshot) */}
            <div className="self-end sm:self-auto">
              {activeMenu === "nha-cung-cap" && (
                <button
                  onClick={() => setIsAddNccModalOpen(true)}
                  className="px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md flex items-center space-x-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ THÊM NHÀ CUNG CẤP</span>
                </button>
              )}

              {(activeMenu === "thiet-bi" || activeMenu === "cap-phat") && (
                <button
                  onClick={() => setIsCreateRequestModalOpen(true)}
                  className="px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md flex items-center space-x-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ TẠO PHIẾU CẤP PHÁT / MƯỢN MÁY</span>
                </button>
              )}
            </div>
          </div>

          {/* PAGE CONTENT 1: NHÀ CUNG CẤP (Exact screenshot replica: NCC01 | Phong Vũ PC | 1800 6868 | Star Tốt | Pencil & Trash icons) */}
          {activeMenu === "nha-cung-cap" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-6 text-slate-400">MÃ NCC</th>
                      <th className="py-4 px-6 text-slate-400">Tên đối tác</th>
                      <th className="py-4 px-6 text-slate-400">Số điện thoại</th>
                      <th className="py-4 px-6 text-slate-400">Đánh giá</th>
                      <th className="py-4 px-6 text-slate-400 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {nhaCungCapHienThi.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                          Chưa có dữ liệu nhà cung cấp. Hãy bấm "+ THÊM NHÀ CUNG CẤP" phía trên.
                        </td>
                      </tr>
                    ) : (
                      nhaCungCapHienThi.map((ncc) => (
                        <tr key={ncc.maNcc} className="hover:bg-slate-50/80 transition-colors">
                          {/* MÃ NCC */}
                          <td className="py-4 px-6 font-semibold text-slate-500">{ncc.maNcc}</td>
                          
                          {/* Tên đối tác */}
                          <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                            {ncc.tenDoiTac}
                          </td>

                          {/* Số điện thoại */}
                          <td className="py-4 px-6 text-slate-600 font-mono">{ncc.soDienThoai}</td>

                          {/* Đánh giá */}
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center space-x-1 text-amber-500 font-bold text-xs">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{ncc.danhGia}</span>
                            </span>
                          </td>

                          {/* Thao tác (Edit pencil & Delete trash icons - exact screenshot match) */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end space-x-3">
                              <button
                                onClick={() => hienThongBao(`Chỉnh sửa nhà cung cấp ${ncc.tenDoiTac}`, "info")}
                                className="text-slate-600 hover:text-blue-600 transition-colors p-1"
                                title="Chỉnh sửa"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => xoaNhaCungCap(ncc.maNcc)}
                                className="text-rose-500 hover:text-rose-700 transition-colors p-1"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE CONTENT 2: DANH SÁCH THIẾT BỊ IT */}
          {activeMenu === "thiet-bi" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-6">MÃ MÁY</th>
                      <th className="py-4 px-6">Tên Thiết Bị</th>
                      <th className="py-4 px-6">Phân Loại</th>
                      <th className="py-4 px-6">Cấu Hình & Thông Số</th>
                      <th className="py-4 px-6">Nhà Cung Cấp</th>
                      <th className="py-4 px-6">Trạng Thái</th>
                      <th className="py-4 px-6 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {thietBiHienThi.map((may) => (
                      <tr key={may.maMay} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-mono font-bold text-blue-600">{may.maMay}</td>
                        <td className="py-4 px-6 font-extrabold text-slate-900">{may.tenMay}</td>
                        <td className="py-4 px-6 text-slate-600 font-semibold">{may.loai}</td>
                        <td className="py-4 px-6 text-slate-600 max-w-xs truncate" title={may.cauHinh}>
                          {may.cauHinh}
                        </td>
                        <td className="py-4 px-6 text-slate-700 font-semibold">
                          {may.nhaCungCap || "Phong Vũ PC"}
                        </td>
                        <td className="py-4 px-6">
                          {may.trangThai === "SanSang" && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                              Sẵn sàng
                            </span>
                          )}
                          {may.trangThai === "DangChoMuon" && (
                            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-[11px]">
                              Đang mượn
                            </span>
                          )}
                          {may.trangThai === "DangBaoTri" && (
                            <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 font-bold text-[11px]">
                              Đang bảo trì
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              setRequestForm({ ...requestForm, maMay: may.maMay });
                              setIsCreateRequestModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg font-bold text-[11px]"
                          >
                            Cấp Phát / Mượn
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE CONTENT 3: CẤP PHÁT & ĐỔI TRẢ */}
          {activeMenu === "cap-phat" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm">Danh Sách Phiếu Cấp Phát & Đổi Trả</h3>
                <span className="text-xs text-slate-400 font-medium">Tổng: {danhSachYeuCau.length} phiếu</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-4 px-6">MÃ PHIẾU</th>
                      <th className="py-4 px-6">Người Nhận / Sinh Viên</th>
                      <th className="py-4 px-6">Thiết Bị</th>
                      <th className="py-4 px-6">Loại Thao Tác</th>
                      <th className="py-4 px-6">Lý Do / Mục Đích</th>
                      <th className="py-4 px-6">Trạng Thái</th>
                      <th className="py-4 px-6 text-right">Duyệt Phiếu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {danhSachYeuCau.map((yc) => (
                      <tr key={yc.maYeuCau} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-mono font-bold text-blue-600">{yc.maYeuCau}</td>
                        <td className="py-4 px-6">
                          <strong className="text-slate-900 block">{yc.hoTen}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">@{yc.tenDangNhap}</span>
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-800">{yc.tenMay}</td>
                        <td className="py-4 px-6">
                          {yc.loaiYeuCau === "CapPhat" && (
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[10px]">
                              CẤP PHÁT
                            </span>
                          )}
                          {yc.loaiYeuCau === "Muon" && (
                            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold text-[10px]">
                              MƯỢN MÁY
                            </span>
                          )}
                          {yc.loaiYeuCau === "DoiTra" && (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold text-[10px]">
                              ĐỔI TRẢ
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-slate-600 max-w-xs truncate">{yc.lyDo}</td>
                        <td className="py-4 px-6">
                          {yc.trangThai === "ChoDuyet" && (
                            <span className="text-amber-600 font-bold">Chờ duyệt</span>
                          )}
                          {yc.trangThai === "DaDuyet" && (
                            <span className="text-emerald-600 font-bold">Đã duyệt</span>
                          )}
                          {yc.trangThai === "HoanThanh" && (
                            <span className="text-slate-500 font-bold">Hoàn thành</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          {yc.trangThai === "ChoDuyet" ? (
                            <button
                              onClick={() => capNhatTrangThaiYeuCau(yc.maYeuCau, "DaDuyet", "Đã duyệt phiếu.")}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px]"
                            >
                              Duyệt ngay
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Đã xử lý</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE CONTENT 4: BẢO TRÌ */}
          {activeMenu === "bao-tri" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Danh Sách Thiết Bị Đang Bảo Trì / Sửa Chữa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {danhSachMayTinh
                  .filter((m) => m.trangThai === "DangBaoTri")
                  .concat([
                    {
                      maMay: "HP-001",
                      tenMay: "HP Spectre x360 14",
                      loai: "Máy tính",
                      cauHinh: "Intel Core i7-1355U / 16GB RAM / 1TB SSD",
                      trangThai: "DangBaoTri",
                      hinhAnh: "",
                      nhaCungCap: "Phong Vũ PC",
                    },
                  ])
                  .map((m, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs text-rose-600 font-bold">{m.maMay}</span>
                        <h4 className="font-extrabold text-slate-900 text-sm">{m.tenMay}</h4>
                        <span className="text-xs text-slate-500 block">Đối tác bảo trì: {m.nhaCungCap}</span>
                      </div>
                      <span className="px-3 py-1 bg-rose-100 text-rose-700 font-extrabold rounded-full text-xs">
                        🛠️ Đang bảo trì
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* PAGE CONTENT 5: TỔNG QUAN */}
          {activeMenu === "tong-quan" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase">Tổng Thiết Bị IT</span>
                <span className="text-3xl font-black text-slate-900 block mt-2">{tongThietBi}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase">Sẵn Sàng Cấp Phát</span>
                <span className="text-3xl font-black text-emerald-600 block mt-2">{maySanSangCount}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase">Đang Cấp Phát / Mượn</span>
                <span className="text-3xl font-black text-amber-600 block mt-2">{mayDangMuonCount}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase">Nhà Cung Cấp Dịch Vụ</span>
                <span className="text-3xl font-black text-blue-600 block mt-2">{danhSachNhaCungCap.length}</span>
              </div>
            </div>
          )}

          {/* PAGE CONTENT 6: LOẠI THIẾT BỊ */}
          {activeMenu === "loai-thiet-bi" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Danh Mục Phân Loại Thiết Bị IT</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {danhSachLoaiThietBi.map((cat) => (
                  <div key={cat.maLoai} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-2">
                    <span className="font-mono text-xs text-blue-600 font-bold">{cat.maLoai}</span>
                    <h4 className="font-black text-slate-900 text-sm">{cat.tenLoai}</h4>
                    <p className="text-xs text-slate-500">{cat.moTa}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL 1: THÊM NHÀ CUNG CẤP (Matching screenshot fields: Mã NCC, Tên đối tác, Số điện thoại, Đánh giá) */}
      {isAddNccModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base uppercase">Thêm Nhà Cung Cấp Mới</h3>
              <button
                onClick={() => setIsAddNccModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={xuLyThemNcc} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">MÃ NCC *</label>
                <input
                  type="text"
                  required
                  value={nccForm.maNcc}
                  onChange={(e) => setNccForm({ ...nccForm, maNcc: e.target.value })}
                  placeholder="Vd: NCC05"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên đối tác *</label>
                <input
                  type="text"
                  required
                  value={nccForm.tenDoiTac}
                  onChange={(e) => setNccForm({ ...nccForm, tenDoiTac: e.target.value })}
                  placeholder="Vd: Phong Vũ PC, An Phát Computer..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Số điện thoại *</label>
                <input
                  type="text"
                  required
                  value={nccForm.soDienThoai}
                  onChange={(e) => setNccForm({ ...nccForm, soDienThoai: e.target.value })}
                  placeholder="Vd: 1800 6868"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Đánh giá chất lượng</label>
                <select
                  value={nccForm.danhGia}
                  onChange={(e) => setNccForm({ ...nccForm, danhGia: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Tốt">⭐ Tốt</option>
                  <option value="Xuất sắc">⭐⭐ Xuất sắc</option>
                  <option value="Khá">Khá</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddNccModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={dangXuLy}
                  className="px-5 py-2 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-bold"
                >
                  {dangXuLy ? "Đang lưu..." : "Lưu Nhà Cung Cấp"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TẠO PHIẾU CẤP PHÁT / MƯỢN MÁY */}
      {isCreateRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base uppercase">Tạo Phiếu Cấp Phát / Mượn Thiết Bị</h3>
              <button
                onClick={() => setIsCreateRequestModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={xuLyTaoYeuCau} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chọn thiết bị *</label>
                <select
                  value={requestForm.maMay}
                  onChange={(e) => setRequestForm({ ...requestForm, maMay: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Chọn thiết bị --</option>
                  {danhSachMayTinh.map((m) => (
                    <option key={m.maMay} value={m.maMay}>
                      [{m.maMay}] {m.tenMay} ({m.loai})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Loại thao tác *</label>
                <select
                  value={requestForm.loaiYeuCau}
                  onChange={(e) => setRequestForm({ ...requestForm, loaiYeuCau: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="CapPhat">Cấp phát thiết bị</option>
                  <option value="Muon">Mượn máy tính</option>
                  <option value="DoiTra">Đổi trả thiết bị</option>
                  <option value="BaoTri">Báo hỏng bảo trì</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lý do / Mục đích *</label>
                <textarea
                  rows={3}
                  required
                  value={requestForm.lyDo}
                  onChange={(e) => setRequestForm({ ...requestForm, lyDo: e.target.value })}
                  placeholder="Vd: Phục vụ thực hành đồ án phần mềm..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateRequestModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={dangXuLy}
                  className="px-5 py-2 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-bold"
                >
                  {dangXuLy ? "Đang gửi..." : "Gửi Yêu Cầu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
