import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export interface MayTinh {
  id?: string;
  maMay: string;
  tenMay: string;
  loai: string; // 'Máy tính' | 'Máy in' | 'Thiết bị mạng'
  cauHinh: string;
  trangThai: "SanSang" | "DangChoMuon" | "DangBaoTri";
  hinhAnh: string;
  nhaCungCap?: string;
}

export interface YeuCauThietBi {
  id?: string;
  maYeuCau: string;
  tenDangNhap: string;
  hoTen: string;
  maMay: string;
  tenMay: string;
  loaiYeuCau: "CapPhat" | "Muon" | "DoiTra" | "BaoTri";
  lyDo: string;
  ngayTao: string;
  ngayHenTra?: string;
  trangThai: "ChoDuyet" | "DaDuyet" | "DangThucHien" | "HoanThanh" | "TuChoi";
  ghiChu?: string;
}

export interface NhaCungCap {
  id?: string;
  maNcc: string;
  tenDoiTac: string;
  soDienThoai: string;
  danhGia: string;
  diaChi?: string;
}

export interface LoaiThietBi {
  id?: string;
  maLoai: string;
  tenLoai: string;
  moTa?: string;
}

interface ThietBiContextType {
  danhSachMayTinh: MayTinh[];
  danhSachYeuCau: YeuCauThietBi[];
  danhSachNhaCungCap: NhaCungCap[];
  danhSachLoaiThietBi: LoaiThietBi[];
  isLoading: boolean;
  taoYeuCau: (data: {
    tenDangNhap: string;
    hoTen: string;
    maMay: string;
    tenMay: string;
    loaiYeuCau: "CapPhat" | "Muon" | "DoiTra" | "BaoTri";
    lyDo: string;
    ngayHenTra?: string;
  }) => Promise<{ success: boolean; message: string }>;
  capNhatTrangThaiYeuCau: (
    idHoacMa: string,
    trangThaiMoi: YeuCauThietBi["trangThai"],
    ghiChu?: string
  ) => Promise<{ success: boolean; message: string }>;
  traMayHoacDoiMay: (
    maYeuCauCu: string,
    loaiHanhDong: "TraMay" | "DoiMay" | "BaoTri",
    lyDoBonus?: string
  ) => Promise<{ success: boolean; message: string }>;
  themNhaCungCap: (data: Omit<NhaCungCap, "id">) => Promise<{ success: boolean; message: string }>;
  xoaNhaCungCap: (maNcc: string) => Promise<{ success: boolean; message: string }>;
  refreshData: () => Promise<void>;
}

const NHA_CUNG_CAP_MAC_DINH: NhaCungCap[] = [
  {
    maNcc: "NCC01",
    tenDoiTac: "Phong Vũ PC",
    soDienThoai: "1800 6868",
    danhGia: "Tốt",
    diaChi: "264 Nguyễn Thị Minh Khai, Q.3, TP.HCM",
  },
  {
    maNcc: "NCC02",
    tenDoiTac: "FPT Shop IT Solution",
    soDienThoai: "1800 6601",
    danhGia: "Tốt",
    diaChi: "261 Khánh Hội, Q.4, TP.HCM",
  },
  {
    maNcc: "NCC03",
    tenDoiTac: "Thế Giới Di Động Enterprise",
    soDienThoai: "1800 1060",
    danhGia: "Xuất sắc",
    diaChi: "128 Trần Quang Khải, Q.1, TP.HCM",
  },
  {
    maNcc: "NCC04",
    tenDoiTac: "GearVN Technology",
    soDienThoai: "1800 6975",
    danhGia: "Tốt",
    diaChi: "78-80 Hoàng Hoa Thám, Q.Bình Thạnh, TP.HCM",
  },
];

const LOAI_THIET_BI_MAC_DINH: LoaiThietBi[] = [
  { maLoai: "CAT01", tenLoai: "Máy tính", moTa: "Laptop, Desktop Workstation, All-in-one" },
  { maLoai: "CAT02", tenLoai: "Máy in", moTa: "Máy in laser, in màu, máy Scan đa năng" },
  { maLoai: "CAT03", tenLoai: "Thiết bị mạng", moTa: "Router, Switch, Wi-Fi Access Point, Firewall" },
];

const MAY_TINH_MAC_DINH: MayTinh[] = [
  {
    maMay: "LAP-001",
    tenMay: "Dell XPS 15 9530",
    loai: "Máy tính",
    cauHinh: "Intel Core i7-13700H / 16GB RAM / 512GB SSD / RTX 3050 6GB",
    trangThai: "SanSang",
    hinhAnh: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    nhaCungCap: "Phong Vũ PC",
  },
  {
    maMay: "MAC-001",
    tenMay: "MacBook Pro 14 M2 Pro",
    loai: "Máy tính",
    cauHinh: "Apple M2 Pro (10-core CPU, 16-core GPU) / 16GB RAM / 512GB SSD",
    trangThai: "DangChoMuon",
    hinhAnh: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    nhaCungCap: "FPT Shop IT Solution",
  },
  {
    maMay: "PRN-001",
    tenMay: "Canon ImageCLASS LBP236dw",
    loai: "Máy in",
    cauHinh: "In hai mặt tự động / Tốc độ 38 trang/phút / Wi-Fi, LAN, USB",
    trangThai: "SanSang",
    hinhAnh: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80",
    nhaCungCap: "Phong Vũ PC",
  },
  {
    maMay: "NET-001",
    tenMay: "Cisco Catalyst 1000 24-Port",
    loai: "Thiết bị mạng",
    cauHinh: "24x GbE PoE+ / 4x 10G SFP+ Uplink / Managed Switch Layer 2",
    trangThai: "SanSang",
    hinhAnh: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    nhaCungCap: "GearVN Technology",
  },
  {
    maMay: "THINK-001",
    tenMay: "Lenovo ThinkPad X1 Carbon Gen 11",
    loai: "Máy tính",
    cauHinh: "Intel Core i7-1365U / 32GB RAM / 1TB NVMe SSD / 14 inch 2.8K OLED",
    trangThai: "SanSang",
    hinhAnh: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    nhaCungCap: "Phong Vũ PC",
  },
];

const YEU_CAU_MAC_DINH: YeuCauThietBi[] = [
  {
    id: "1",
    maYeuCau: "REQ-2026-001",
    tenDangNhap: "525000486",
    hoTen: "Trần Quang Tuyến",
    maMay: "MAC-001",
    tenMay: "MacBook Pro 14 M2 Pro",
    loaiYeuCau: "CapPhat",
    lyDo: "Cấp phát máy tính học tập đồ án môn học công nghệ phần mềm.",
    ngayTao: "2026-08-25",
    ngayHenTra: "2026-09-10",
    trangThai: "DaDuyet",
    ghiChu: "Bàn giao đầy đủ thiết bị.",
  },
];

const LOCAL_STORAGE_MAY_TINH = "QT_MAY_TINH_V2";
const LOCAL_STORAGE_YEU_CAU = "QT_YEU_CAU_THIET_BI_V2";
const LOCAL_STORAGE_NCC = "QT_NHA_CUNG_CAP_V2";

const ThietBiContext = createContext<ThietBiContextType | undefined>(undefined);

export const ThietBiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [danhSachMayTinh, setDanhSachMayTinh] = useState<MayTinh[]>([]);
  const [danhSachYeuCau, setDanhSachYeuCau] = useState<YeuCauThietBi[]>([]);
  const [danhSachNhaCungCap, setDanhSachNhaCungCap] = useState<NhaCungCap[]>([]);
  const [danhSachLoaiThietBi, setDanhSachLoaiThietBi] = useState<LoaiThietBi[]>(LOAI_THIET_BI_MAC_DINH);
  const [isLoading, setIsLoading] = useState(true);

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedMay = localStorage.getItem(LOCAL_STORAGE_MAY_TINH);
      setDanhSachMayTinh(savedMay ? JSON.parse(savedMay) : MAY_TINH_MAC_DINH);

      const savedYeuCau = localStorage.getItem(LOCAL_STORAGE_YEU_CAU);
      setDanhSachYeuCau(savedYeuCau ? JSON.parse(savedYeuCau) : YEU_CAU_MAC_DINH);

      const savedNcc = localStorage.getItem(LOCAL_STORAGE_NCC);
      setDanhSachNhaCungCap(savedNcc ? JSON.parse(savedNcc) : NHA_CUNG_CAP_MAC_DINH);
    } catch (e) {
      console.error(e);
      setDanhSachMayTinh(MAY_TINH_MAC_DINH);
      setDanhSachYeuCau(YEU_CAU_MAC_DINH);
      setDanhSachNhaCungCap(NHA_CUNG_CAP_MAC_DINH);
    }
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    if (isSupabaseConfigured()) {
      try {
        const { data: mayData, error: mayErr } = await supabase.from("may_tinh").select("*");
        const { data: ycData, error: ycErr } = await supabase.from("yeu_cau_thiet_bi").select("*");
        const { data: nccData, error: nccErr } = await supabase.from("nha_cung_cap").select("*");

        if (mayErr || ycErr || nccErr) {
          loadFromLocalStorage();
        } else if (mayData && ycData) {
          setDanhSachMayTinh(
            mayData.map((item) => ({
              id: item.id,
              maMay: item.ma_may,
              tenMay: item.ten_may,
              loai: item.loai || "Máy tính",
              cauHinh: item.cau_hinh,
              trangThai: item.trang_thai,
              hinhAnh: item.hinh_anh,
              nhaCungCap: item.nha_cung_cap || "Phong Vũ PC",
            }))
          );
          setDanhSachYeuCau(
            ycData.map((item) => ({
              id: item.id,
              maYeuCau: item.ma_yeu_cau,
              tenDangNhap: item.ten_dang_nhap,
              hoTen: item.ho_ten,
              maMay: item.ma_may,
              tenMay: item.ten_may,
              loaiYeuCau: item.loai_yeu_cau,
              lyDo: item.ly_do,
              ngayTao: item.ngay_tao,
              ngayHenTra: item.ngay_hen_tra,
              trangThai: item.trang_thai,
              ghiChu: item.ghi_chu,
            }))
          );
          if (nccData && nccData.length > 0) {
            setDanhSachNhaCungCap(
              nccData.map((n) => ({
                id: n.id,
                maNcc: n.ma_ncc,
                tenDoiTac: n.ten_doi_tac,
                soDienThoai: n.so_dien_thoai,
                danhGia: n.danh_gia || "Tốt",
                diaChi: n.dia_chi,
              }))
            );
          } else {
            setDanhSachNhaCungCap(NHA_CUNG_CAP_MAC_DINH);
          }
        } else {
          loadFromLocalStorage();
        }
      } catch (e) {
        loadFromLocalStorage();
      }
    } else {
      loadFromLocalStorage();
    }
    setIsLoading(false);
  }, [loadFromLocalStorage]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const saveNccLS = (list: NhaCungCap[]) => {
    setDanhSachNhaCungCap(list);
    try {
      localStorage.setItem(LOCAL_STORAGE_NCC, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  const taoYeuCau = async (data: {
    tenDangNhap: string;
    hoTen: string;
    maMay: string;
    tenMay: string;
    loaiYeuCau: "CapPhat" | "Muon" | "DoiTra" | "BaoTri";
    lyDo: string;
    ngayHenTra?: string;
  }) => {
    const today = new Date().toISOString().split("T")[0];
    const maYeuCauRandom = `REQ-${Date.now().toString().slice(-6)}`;

    const newYeuCau: YeuCauThietBi = {
      maYeuCau: maYeuCauRandom,
      tenDangNhap: data.tenDangNhap,
      hoTen: data.hoTen,
      maMay: data.maMay,
      tenMay: data.tenMay,
      loaiYeuCau: data.loaiYeuCau,
      lyDo: data.lyDo,
      ngayTao: today,
      ngayHenTra: data.ngayHenTra || "",
      trangThai: "ChoDuyet",
      ghiChu: "Yêu cầu mới đã tạo thành công.",
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("yeu_cau_thiet_bi").insert([
          {
            ma_yeu_cau: newYeuCau.maYeuCau,
            ten_dang_nhap: newYeuCau.tenDangNhap,
            ho_ten: newYeuCau.hoTen,
            ma_may: newYeuCau.maMay,
            ten_may: newYeuCau.tenMay,
            loai_yeu_cau: newYeuCau.loaiYeuCau,
            ly_do: newYeuCau.lyDo,
            ngay_tao: newYeuCau.ngayTao,
            ngay_hen_tra: newYeuCau.ngayHenTra,
            trang_thai: newYeuCau.trangThai,
            ghi_chu: newYeuCau.ghiChu,
          },
        ]);
        if (!error) {
          await refreshData();
          return { success: true, message: "Đã gửi yêu cầu cấp phát / mượn thiết bị thành công!" };
        }
      } catch (err) {
        console.error(err);
      }
    }

    const updated = [newYeuCau, ...danhSachYeuCau];
    setDanhSachYeuCau(updated);
    localStorage.setItem(LOCAL_STORAGE_YEU_CAU, JSON.stringify(updated));
    return { success: true, message: "Đã tạo phiếu cấp phát / mượn thiết bị thành công!" };
  };

  const capNhatTrangThaiYeuCau = async (
    idHoacMa: string,
    trangThaiMoi: YeuCauThietBi["trangThai"],
    ghiChu?: string
  ) => {
    const target = danhSachYeuCau.find((y) => y.id === idHoacMa || y.maYeuCau === idHoacMa);
    if (!target) return { success: false, message: "Không tìm thấy yêu cầu" };

    if (isSupabaseConfigured() && target.id) {
      try {
        const { error } = await supabase
          .from("yeu_cau_thiet_bi")
          .update({ trang_thai: trangThaiMoi, ghi_chu: ghiChu || target.ghiChu })
          .eq("id", target.id);
        if (!error) {
          await refreshData();
          return { success: true, message: "Cập nhật trạng thái thành công!" };
        }
      } catch (e) {
        console.error(e);
      }
    }

    const updated = danhSachYeuCau.map((y) =>
      y.id === idHoacMa || y.maYeuCau === idHoacMa
        ? { ...y, trangThai: trangThaiMoi, ghiChu: ghiChu || y.ghiChu }
        : y
    );
    setDanhSachYeuCau(updated);
    localStorage.setItem(LOCAL_STORAGE_YEU_CAU, JSON.stringify(updated));
    return { success: true, message: "Đã cập nhật trạng thái phiếu thành công!" };
  };

  const traMayHoacDoiMay = async (
    maYeuCauCu: string,
    loaiHanhDong: "TraMay" | "DoiMay" | "BaoTri",
    lyDoBonus?: string
  ) => {
    const ycCu = danhSachYeuCau.find((y) => y.maYeuCau === maYeuCauCu);
    if (!ycCu) return { success: false, message: "Yêu cầu không tồn tại" };

    if (loaiHanhDong === "TraMay") {
      return await capNhatTrangThaiYeuCau(maYeuCauCu, "HoanThanh", "Đã hoàn trả thiết bị.");
    } else if (loaiHanhDong === "DoiMay") {
      return await taoYeuCau({
        tenDangNhap: ycCu.tenDangNhap,
        hoTen: ycCu.hoTen,
        maMay: ycCu.maMay,
        tenMay: ycCu.tenMay,
        loaiYeuCau: "DoiTra",
        lyDo: lyDoBonus || "Yêu cầu đổi máy tính mới do cần thay đổi cấu hình.",
      });
    } else {
      return await taoYeuCau({
        tenDangNhap: ycCu.tenDangNhap,
        hoTen: ycCu.hoTen,
        maMay: ycCu.maMay,
        tenMay: ycCu.tenMay,
        loaiYeuCau: "BaoTri",
        lyDo: lyDoBonus || "Báo sự cố thiết bị cần bảo trì.",
      });
    }
  };

  const themNhaCungCap = async (data: Omit<NhaCungCap, "id">) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("nha_cung_cap").insert([
          {
            ma_ncc: data.maNcc,
            ten_doi_tac: data.tenDoiTac,
            so_dien_thoai: data.soDienThoai,
            danh_gia: data.danhGia,
            dia_chi: data.diaChi,
          },
        ]);
        if (!error) {
          await refreshData();
          return { success: true, message: "Thêm nhà cung cấp mới thành công lên Supabase!" };
        }
      } catch (e) {
        console.error(e);
      }
    }

    const updated = [data, ...danhSachNhaCungCap];
    saveNccLS(updated);
    return { success: true, message: "Thêm nhà cung cấp mới thành công!" };
  };

  const xoaNhaCungCap = async (maNcc: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("nha_cung_cap").delete().eq("ma_ncc", maNcc);
        if (!error) {
          await refreshData();
          return { success: true, message: "Đã xóa nhà cung cấp trên Supabase!" };
        }
      } catch (e) {
        console.error(e);
      }
    }

    const updated = danhSachNhaCungCap.filter((n) => n.maNcc !== maNcc);
    saveNccLS(updated);
    return { success: true, message: "Đã xóa nhà cung cấp!" };
  };

  return (
    <ThietBiContext.Provider
      value={{
        danhSachMayTinh,
        danhSachYeuCau,
        danhSachNhaCungCap,
        danhSachLoaiThietBi,
        isLoading,
        taoYeuCau,
        capNhatTrangThaiYeuCau,
        traMayHoacDoiMay,
        themNhaCungCap,
        xoaNhaCungCap,
        refreshData,
      }}
    >
      {children}
    </ThietBiContext.Provider>
  );
};

export const useThietBi = () => {
  const context = useContext(ThietBiContext);
  if (!context) {
    throw new Error("useThietBi phải được sử dụng trong ThietBiProvider");
  }
  return context;
};
