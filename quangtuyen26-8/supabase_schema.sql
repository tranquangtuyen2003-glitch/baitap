-- ==========================================
-- SCRIPT KHỞI TẠO HỆ THỐNG SUPABASE ĐẦY ĐỦ (IT ASSET MANAGEMENT)
-- Chạy script này trong Supabase Dashboard -> SQL Editor
-- ==========================================

-- 1. Bảng người dùng
CREATE TABLE IF NOT EXISTS public.nguoi_dung (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ten_dang_nhap VARCHAR(100) UNIQUE NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    so_dien_thoai VARCHAR(50),
    mssv VARCHAR(50),
    lop VARCHAR(100),
    ngay_sinh VARCHAR(50),
    gioi_tinh VARCHAR(20),
    bio TEXT,
    avatar TEXT,
    mat_khau TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng danh sách máy tính & thiết bị
CREATE TABLE IF NOT EXISTS public.may_tinh (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ma_may VARCHAR(50) UNIQUE NOT NULL,
    ten_may VARCHAR(255) NOT NULL,
    loai VARCHAR(50) NOT NULL DEFAULT 'Máy tính',
    cau_hinh TEXT NOT NULL,
    trang_thai VARCHAR(50) NOT NULL DEFAULT 'SanSang',
    hinh_anh TEXT,
    nha_cung_cap VARCHAR(255) DEFAULT 'Phong Vũ PC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng yêu cầu cấp phát, mượn, đổi trả và bảo trì
CREATE TABLE IF NOT EXISTS public.yeu_cau_thiet_bi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ma_yeu_cau VARCHAR(50) UNIQUE NOT NULL,
    ten_dang_nhap VARCHAR(100) NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    ma_may VARCHAR(50) NOT NULL,
    ten_may VARCHAR(255) NOT NULL,
    loai_yeu_cau VARCHAR(50) NOT NULL, -- 'CapPhat', 'Muon', 'DoiTra', 'BaoTri'
    ly_do TEXT NOT NULL,
    ngay_tao VARCHAR(50) NOT NULL,
    ngay_hen_tra VARCHAR(50),
    trang_thai VARCHAR(50) NOT NULL DEFAULT 'ChoDuyet',
    ghi_chu TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng nhà cung cấp (Mới theo mẫu thiết kế)
CREATE TABLE IF NOT EXISTS public.nha_cung_cap (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ma_ncc VARCHAR(50) UNIQUE NOT NULL,
    ten_doi_tac VARCHAR(255) NOT NULL,
    so_dien_thoai VARCHAR(50) NOT NULL,
    danh_gia VARCHAR(50) DEFAULT 'Tốt',
    dia_chi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bảng loại thiết bị
CREATE TABLE IF NOT EXISTS public.loai_thiet_bi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ma_loai VARCHAR(50) UNIQUE NOT NULL,
    ten_loai VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) & PHÂN QUYỀN
-- ==========================================

ALTER TABLE public.nguoi_dung ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.may_tinh ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yeu_cau_thiet_bi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nha_cung_cap ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loai_thiet_bi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Access nguoi_dung" ON public.nguoi_dung FOR ALL USING (true);
CREATE POLICY "Access may_tinh" ON public.may_tinh FOR ALL USING (true);
CREATE POLICY "Access yeu_cau_thiet_bi" ON public.yeu_cau_thiet_bi FOR ALL USING (true);
CREATE POLICY "Access nha_cung_cap" ON public.nha_cung_cap FOR ALL USING (true);
CREATE POLICY "Access loai_thiet_bi" ON public.loai_thiet_bi FOR ALL USING (true);

-- ==========================================
-- DỮ LIỆU MẪU BAN ĐẦU
-- ==========================================

-- Tài khoản người dùng mặc định
INSERT INTO public.nguoi_dung (
    ten_dang_nhap, ho_ten, email, so_dien_thoai, mssv, lop, ngay_sinh, gioi_tinh, bio, avatar, mat_khau
) VALUES (
    '525000486',
    'Trần Quang Tuyến',
    'tranquangtuyen@gmail.com',
    '0987654321',
    '525000486',
    '25CT501',
    '2003-08-23',
    'Nam',
    'Sinh viên chuyên ngành Công nghệ Thông tin. Đam mê thiết kế web và xây dựng ứng dụng hiện đại.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    '123456'
) ON CONFLICT (ten_dang_nhap) DO NOTHING;

-- Nhà cung cấp mẫu (Khớp 100% hình ảnh mẫu của người dùng: NCC01 - Phong Vũ PC - 1800 6868 - Tốt)
INSERT INTO public.nha_cung_cap (ma_ncc, ten_doi_tac, so_dien_thoai, danh_gia, dia_chi) VALUES
('NCC01', 'Phong Vũ PC', '1800 6868', 'Tốt', '264 Nguyễn Thị Minh Khai, Q.3, TP.HCM'),
('NCC02', 'FPT Shop IT Solution', '1800 6601', 'Tốt', '261 Khánh Hội, Q.4, TP.HCM'),
('NCC03', 'Thế Giới Di Động Enterprise', '1800 1060', 'Xuất sắc', '128 Trần Quang Khải, Q.1, TP.HCM'),
('NCC04', 'GearVN Technology', '1800 6975', 'Tốt', '78-80 Hoàng Hoa Thám, Q.Bình Thạnh, TP.HCM')
ON CONFLICT (ma_ncc) DO NOTHING;

-- Loại thiết bị mẫu
INSERT INTO public.loai_thiet_bi (ma_loai, ten_loai, mo_ta) VALUES
('CAT01', 'Máy tính', 'Laptop, Desktop Workstation, All-in-one'),
('CAT02', 'Máy in', 'Máy in laser, in màu, máy Scan đa năng'),
('CAT03', 'Thiết bị mạng', 'Router, Switch, Wi-Fi Access Point, Firewall')
ON CONFLICT (ma_loai) DO NOTHING;

-- Máy tính mẫu
INSERT INTO public.may_tinh (ma_may, ten_may, loai, cau_hinh, trang_thai, hinh_anh, nha_cung_cap) VALUES
('LAP-001', 'Dell XPS 15 9530', 'Máy tính', 'Intel Core i7-13700H / 16GB RAM / 512GB SSD / RTX 3050 6GB', 'SanSang', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80', 'Phong Vũ PC'),
('MAC-001', 'MacBook Pro 14 M2 Pro', 'Máy tính', 'Apple M2 Pro (10-core CPU, 16-core GPU) / 16GB RAM / 512GB SSD', 'DangChoMuon', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', 'FPT Shop IT Solution'),
('PRN-001', 'Canon ImageCLASS LBP236dw', 'Máy in', 'In hai mặt tự động / Tốc độ 38 trang/phút / Wi-Fi, LAN, USB', 'SanSang', 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80', 'Phong Vũ PC'),
('NET-001', 'Cisco Catalyst 1000 24-Port', 'Thiết bị mạng', '24x GbE PoE+ / 4x 10G SFP+ Uplink / Managed Switch Layer 2', 'SanSang', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80', 'GearVN Technology'),
('THINK-001', 'Lenovo ThinkPad X1 Carbon Gen 11', 'Máy tính', 'Intel Core i7-1365U / 32GB RAM / 1TB NVMe SSD', 'SanSang', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80', 'Phong Vũ PC')
ON CONFLICT (ma_may) DO NOTHING;

-- Yêu cầu mẫu
INSERT INTO public.yeu_cau_thiet_bi (
    ma_yeu_cau, ten_dang_nhap, ho_ten, ma_may, ten_may, loai_yeu_cau, ly_do, ngay_tao, ngay_hen_tra, trang_thai, ghi_chu
) VALUES (
    'REQ-2026-001',
    '525000486',
    'Trần Quang Tuyến',
    'MAC-001',
    'MacBook Pro 14 M2 Pro',
    'CapPhat',
    'Cấp phát máy tính học tập đồ án môn học công nghệ phần mềm.',
    '2026-08-25',
    '2026-09-10',
    'DaDuyet',
    'Bàn giao đầy đủ thiết bị.'
) ON CONFLICT (ma_yeu_cau) DO NOTHING;
