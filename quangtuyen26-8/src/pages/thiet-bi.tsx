import Head from "next/head";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { QuanLyThietBi } from "@/giao-dien/QuanLyThietBi";
import { TrangXacThuc } from "@/giao-dien/TrangXacThuc";

export default function ThietBiPage() {
  const { taiKhoanHienTai } = useNguoiDung();

  if (!taiKhoanHienTai) {
    return (
      <>
        <Head>
          <title>Đăng Nhập Để Quản Lý Thiết Bị - QLPL DEMO</title>
        </Head>
        <TrangXacThuc cheDoMacDinh="dang-nhap" />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Mượn & Bảo Trì Máy Tính - ${taiKhoanHienTai.hoTen}`}</title>
        <meta
          name="description"
          content="Hệ thống quản lý mượn máy tính, đổi trả thiết bị và báo hỏng bảo trì cho sinh viên"
        />
      </Head>
      <QuanLyThietBi />
    </>
  );
}
