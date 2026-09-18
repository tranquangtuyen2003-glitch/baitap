import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export interface NguoiDung {
  tenDangNhap: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  mssv: string;
  lop: string;
  ngaySinh: string;
  gioiTinh: string;
  bio: string;
  avatar: string;
  matKhau: string;
}

interface ThongBaoState {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

interface NguoiDungContextType {
  taiKhoanHienTai: NguoiDung | null;
  danhSachTaiKhoan: NguoiDung[];
  thongBao: ThongBaoState | null;
  isSupabaseActive: boolean;
  datThongBao: (thongBao: ThongBaoState | null) => void;
  hienThongBao: (message: string, type?: "success" | "error" | "info" | "warning") => void;
  dangNhap: (tenDangNhapHoacEmail: string, matKhau: string) => Promise<{ success: boolean; message: string }>;
  dangKy: (data: Omit<NguoiDung, "avatar" | "bio">) => Promise<{ success: boolean; message: string }>;
  dangXuat: () => void;
  capNhatThongTin: (data: Partial<NguoiDung>) => Promise<{ success: boolean; message: string }>;
  doiMatKhau: (matKhauCu: string, matKhauMoi: string) => Promise<{ success: boolean; message: string }>;
  loadDuLieu: () => Promise<void>;
}

const TAI_KHOAN_MAC_DINH: NguoiDung = {
  tenDangNhap: "525000486",
  hoTen: "Trần Quang Tuyến",
  email: "tranquangtuyen@gmail.com",
  soDienThoai: "0987654321",
  mssv: "525000486",
  lop: "25CT501",
  ngaySinh: "2003-08-23",
  gioiTinh: "Nam",
  bio: "Sinh viên chuyên ngành Công nghệ Thông tin. Đam mê thiết kế web và xây dựng ứng dụng hiện đại.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  matKhau: "123456",
};

// Map dữ liệu từ Supabase (snake_case) sang TypeScript (camelCase)
const mapDbToNguoiDung = (item: any): NguoiDung => ({
  tenDangNhap: item.ten_dang_nhap || "",
  hoTen: item.ho_ten || "",
  email: item.email || "",
  soDienThoai: item.so_dien_thoai || "",
  mssv: item.mssv || "",
  lop: item.lop || "",
  ngaySinh: item.ngay_sinh || "",
  gioiTinh: item.gioi_tinh || "",
  bio: item.bio || "",
  avatar: item.avatar || "",
  matKhau: item.mat_khau || "",
});

// Map dữ liệu từ TypeScript (camelCase) sang Supabase (snake_case)
const mapNguoiDungToDb = (item: Partial<NguoiDung>) => {
  const dbObj: Record<string, any> = {};
  if (item.tenDangNhap !== undefined) dbObj.ten_dang_nhap = item.tenDangNhap;
  if (item.hoTen !== undefined) dbObj.ho_ten = item.hoTen;
  if (item.email !== undefined) dbObj.email = item.email;
  if (item.soDienThoai !== undefined) dbObj.so_dien_thoai = item.soDienThoai;
  if (item.mssv !== undefined) dbObj.mssv = item.mssv;
  if (item.lop !== undefined) dbObj.lop = item.lop;
  if (item.ngaySinh !== undefined) dbObj.ngay_sinh = item.ngaySinh;
  if (item.gioiTinh !== undefined) dbObj.gioi_tinh = item.gioiTinh;
  if (item.bio !== undefined) dbObj.bio = item.bio;
  if (item.avatar !== undefined) dbObj.avatar = item.avatar;
  if (item.matKhau !== undefined) dbObj.mat_khau = item.matKhau;
  return dbObj;
};

const NguoiDungContext = createContext<NguoiDungContextType | undefined>(undefined);

const LOCAL_STORAGE_DANH_SACH = "QT_DANH_SACH_TAI_KHOAN_V1";
const LOCAL_STORAGE_HIEN_TAI = "QT_TAI_KHOAN_HIEN_TAI_V1";

export const NguoiDungProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [danhSachTaiKhoan, setDanhSachTaiKhoan] = useState<NguoiDung[]>([]);
  const [taiKhoanHienTai, setTaiKhoanHienTai] = useState<NguoiDung | null>(null);
  const [thongBao, setThongBao] = useState<ThongBaoState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSupabaseActive, setIsSupabaseActive] = useState(false);

  // Tải dữ liệu từ Supabase hoặc LocalStorage
  const loadDuLieu = useCallback(async () => {
    const supabaseConfigured = isSupabaseConfigured();
    setIsSupabaseActive(supabaseConfigured);

    if (supabaseConfigured) {
      try {
        const { data, error } = await supabase.from("nguoi_dung").select("*");
        if (error) {
          console.error("Lỗi kết nối Supabase, chuyển sang dùng LocalStorage:", error.message);
          loadFromLocalStorage();
        } else if (data) {
          const formattedList = data.map(mapDbToNguoiDung);
          setDanhSachTaiKhoan(formattedList);

          // Cập nhật người dùng hiện tại từ session/LocalStorage
          const savedUser = localStorage.getItem(LOCAL_STORAGE_HIEN_TAI);
          if (savedUser) {
            const userObj = JSON.parse(savedUser);
            const match = formattedList.find(
              (u) => u.tenDangNhap === userObj.tenDangNhap || u.email === userObj.email
            );
            setTaiKhoanHienTai(match || userObj);
          }
        }
      } catch (err) {
        console.error("Ngoại lệ khi tải Supabase:", err);
        loadFromLocalStorage();
      }
    } else {
      loadFromLocalStorage();
    }
    setIsLoaded(true);
  }, []);

  const loadFromLocalStorage = () => {
    try {
      const savedList = localStorage.getItem(LOCAL_STORAGE_DANH_SACH);
      let parsedList: NguoiDung[] = [];
      if (savedList) {
        parsedList = JSON.parse(savedList);
      } else {
        parsedList = [TAI_KHOAN_MAC_DINH];
        localStorage.setItem(LOCAL_STORAGE_DANH_SACH, JSON.stringify(parsedList));
      }
      setDanhSachTaiKhoan(parsedList);

      const savedUser = localStorage.getItem(LOCAL_STORAGE_HIEN_TAI);
      if (savedUser) {
        const userObj = JSON.parse(savedUser);
        const match = parsedList.find(
          (u) => u.tenDangNhap === userObj.tenDangNhap || u.email === userObj.email
        );
        setTaiKhoanHienTai(match || userObj);
      } else {
        setTaiKhoanHienTai(null);
      }
    } catch (e) {
      console.error("Lỗi khi đọc dữ liệu từ LocalStorage", e);
      setDanhSachTaiKhoan([TAI_KHOAN_MAC_DINH]);
      setTaiKhoanHienTai(TAI_KHOAN_MAC_DINH);
    }
  };

  useEffect(() => {
    loadDuLieu();
  }, [loadDuLieu]);

  const luuDanhSachLocalStorage = (list: NguoiDung[]) => {
    setDanhSachTaiKhoan(list);
    try {
      localStorage.setItem(LOCAL_STORAGE_DANH_SACH, JSON.stringify(list));
    } catch (e) {
      console.error("Không thể lưu danh sách tài khoản", e);
    }
  };

  const luuUserHienTai = (user: NguoiDung | null) => {
    setTaiKhoanHienTai(user);
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_HIEN_TAI, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_HIEN_TAI);
      }
    } catch (e) {
      console.error("Không thể lưu tài khoản hiện tại", e);
    }
  };

  const hienThongBao = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    setThongBao({ message, type });
  };

  const dangNhap = async (tenDangNhapHoacEmail: string, matKhau: string) => {
    const inputClean = tenDangNhapHoacEmail.trim().toLowerCase();

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from("nguoi_dung")
          .select("*")
          .or(`ten_dang_nhap.ilike.${inputClean},email.ilike.${inputClean},mssv.eq.${tenDangNhapHoacEmail.trim()}`)
          .eq("mat_khau", matKhau)
          .maybeSingle();

        if (error) {
          console.error("Lỗi truy vấn Supabase:", error);
        }

        if (data) {
          const userFound = mapDbToNguoiDung(data);
          luuUserHienTai(userFound);
          hienThongBao(`Đăng nhập thành công qua Supabase! Chào mừng ${userFound.hoTen}`, "success");
          return { success: true, message: "Đăng nhập thành công" };
        }
      } catch (err) {
        console.error("Lỗi khi kết nối tới Supabase trong dangNhap:", err);
      }
    }

    // Fallback LocalStorage
    const userFound = danhSachTaiKhoan.find(
      (u) =>
        (u.tenDangNhap.toLowerCase() === inputClean ||
          u.email.toLowerCase() === inputClean ||
          u.mssv === tenDangNhapHoacEmail.trim()) &&
        u.matKhau === matKhau
    );

    if (userFound) {
      luuUserHienTai(userFound);
      hienThongBao(`Đăng nhập thành công! Chào mừng ${userFound.hoTen}`, "success");
      return { success: true, message: "Đăng nhập thành công" };
    } else {
      hienThongBao("Tên đăng nhập / Email hoặc mật khẩu không chính xác!", "error");
      return { success: false, message: "Mật khẩu hoặc tên đăng nhập không đúng!" };
    }
  };

  const dangKy = async (data: Omit<NguoiDung, "avatar" | "bio">) => {
    const newNguoiDung: NguoiDung = {
      ...data,
      tenDangNhap: data.tenDangNhap.trim(),
      email: data.email.trim(),
      bio: "Thành viên mới gia nhập hệ thống.",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.tenDangNhap)}`,
    };

    if (isSupabaseConfigured()) {
      try {
        const dbData = mapNguoiDungToDb(newNguoiDung);
        const { error } = await supabase.from("nguoi_dung").insert([dbData]);

        if (error) {
          console.error("Lỗi đăng ký Supabase:", error);
          if (error.code === "23505") {
            hienThongBao("Tên đăng nhập hoặc Email đã tồn tại trên Supabase!", "error");
            return { success: false, message: "Tên đăng nhập hoặc Email đã tồn tại" };
          }
          hienThongBao(`Lỗi Supabase: ${error.message}`, "error");
          return { success: false, message: error.message };
        }

        setDanhSachTaiKhoan((prev) => [...prev, newNguoiDung]);
        luuUserHienTai(newNguoiDung);
        hienThongBao(`Đăng ký thành công trên Supabase! Đã tự động đăng nhập làm ${newNguoiDung.hoTen}`, "success");
        return { success: true, message: "Đăng ký thành công" };
      } catch (err: any) {
        console.error("Ngoại lệ Supabase đăng ký:", err);
      }
    }

    // Fallback LocalStorage
    const duplicate = danhSachTaiKhoan.some(
      (u) =>
        u.tenDangNhap.toLowerCase() === data.tenDangNhap.trim().toLowerCase() ||
        u.email.toLowerCase() === data.email.trim().toLowerCase()
    );

    if (duplicate) {
      hienThongBao("Tên đăng nhập hoặc Email đã tồn tại trên hệ thống!", "error");
      return { success: false, message: "Tên đăng nhập hoặc Email đã tồn tại" };
    }

    const newList = [...danhSachTaiKhoan, newNguoiDung];
    luuDanhSachLocalStorage(newList);
    luuUserHienTai(newNguoiDung);

    hienThongBao(`Đăng ký thành công! Đã tự động đăng nhập làm ${newNguoiDung.hoTen}`, "success");
    return { success: true, message: "Đăng ký thành công" };
  };

  const dangXuat = () => {
    luuUserHienTai(null);
    hienThongBao("Đã đăng xuất khỏi hệ thống.", "info");
  };

  const capNhatThongTin = async (data: Partial<NguoiDung>) => {
    if (!taiKhoanHienTai) {
      hienThongBao("Bạn chưa đăng nhập!", "error");
      return { success: false, message: "Chưa đăng nhập" };
    }

    const updatedUser: NguoiDung = {
      ...taiKhoanHienTai,
      ...data,
    };

    if (isSupabaseConfigured()) {
      try {
        const dbData = mapNguoiDungToDb(data);
        const { error } = await supabase
          .from("nguoi_dung")
          .update(dbData)
          .eq("ten_dang_nhap", taiKhoanHienTai.tenDangNhap);

        if (error) {
          console.error("Lỗi cập nhật Supabase:", error);
          hienThongBao(`Lỗi cập nhật Supabase: ${error.message}`, "error");
          return { success: false, message: error.message };
        }

        setDanhSachTaiKhoan((prev) =>
          prev.map((u) => (u.tenDangNhap === taiKhoanHienTai.tenDangNhap ? updatedUser : u))
        );
        luuUserHienTai(updatedUser);
        hienThongBao("Cập nhật thông tin trên Supabase thành công!", "success");
        return { success: true, message: "Cập nhật thành công" };
      } catch (err: any) {
        console.error("Ngoại lệ Supabase cập nhật:", err);
      }
    }

    // Fallback LocalStorage
    const newList = danhSachTaiKhoan.map((u) =>
      u.tenDangNhap === taiKhoanHienTai.tenDangNhap ? updatedUser : u
    );
    luuDanhSachLocalStorage(newList);
    luuUserHienTai(updatedUser);

    hienThongBao("Cập nhật thông tin cá nhân thành công!", "success");
    return { success: true, message: "Cập nhật thành công" };
  };

  const doiMatKhau = async (matKhauCu: string, matKhauMoi: string) => {
    if (!taiKhoanHienTai) {
      hienThongBao("Vui lòng đăng nhập trước khi đổi mật khẩu!", "error");
      return { success: false, message: "Chưa đăng nhập" };
    }

    if (taiKhoanHienTai.matKhau !== matKhauCu) {
      hienThongBao("Mật khẩu hiện tại không chính xác!", "error");
      return { success: false, message: "Mật khẩu hiện tại sai" };
    }

    if (matKhauCu === matKhauMoi) {
      hienThongBao("Mật khẩu mới không được trùng với mật khẩu cũ!", "warning");
      return { success: false, message: "Mật khẩu trùng mật khẩu cũ" };
    }

    const updatedUser: NguoiDung = {
      ...taiKhoanHienTai,
      matKhau: matKhauMoi,
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("nguoi_dung")
          .update({ mat_khau: matKhauMoi })
          .eq("ten_dang_nhap", taiKhoanHienTai.tenDangNhap);

        if (error) {
          console.error("Lỗi đổi mật khẩu Supabase:", error);
          hienThongBao(`Lỗi Supabase: ${error.message}`, "error");
          return { success: false, message: error.message };
        }

        setDanhSachTaiKhoan((prev) =>
          prev.map((u) => (u.tenDangNhap === taiKhoanHienTai.tenDangNhap ? updatedUser : u))
        );
        luuUserHienTai(updatedUser);
        hienThongBao("Đổi mật khẩu thành công trên Supabase!", "success");
        return { success: true, message: "Đổi mật khẩu thành công" };
      } catch (err: any) {
        console.error("Ngoại lệ Supabase đổi mật khẩu:", err);
      }
    }

    // Fallback LocalStorage
    const newList = danhSachTaiKhoan.map((u) =>
      u.tenDangNhap === taiKhoanHienTai.tenDangNhap ? updatedUser : u
    );
    luuDanhSachLocalStorage(newList);
    luuUserHienTai(updatedUser);

    hienThongBao("Đổi mật khẩu thành công!", "success");
    return { success: true, message: "Đổi mật khẩu thành công" };
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-sans">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Đang kết nối cơ sở dữ liệu...</span>
        </div>
      </div>
    );
  }

  return (
    <NguoiDungContext.Provider
      value={{
        taiKhoanHienTai,
        danhSachTaiKhoan,
        thongBao,
        isSupabaseActive,
        datThongBao: setThongBao,
        hienThongBao,
        dangNhap,
        dangKy,
        dangXuat,
        capNhatThongTin,
        doiMatKhau,
        loadDuLieu,
      }}
    >
      {children}
    </NguoiDungContext.Provider>
  );
};

export const useNguoiDung = () => {
  const context = useContext(NguoiDungContext);
  if (!context) {
    throw new Error("useNguoiDung phải được sử dụng bên trong NguoiDungProvider");
  }
  return context;
};
