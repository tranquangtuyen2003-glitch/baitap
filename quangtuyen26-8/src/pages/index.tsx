import Head from "next/head";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { TrangXacThuc } from "@/giao-dien/TrangXacThuc";
import { TrangChuRiengBiet } from "@/giao-dien/TrangChuRiengBiet";

export default function Home() {
  const { taiKhoanHienTai } = useNguoiDung();

  if (!taiKhoanHienTai) {
    return (
      <>
        <Head>
          <title>Đăng Nhập / Đăng Ký - QLPL DEMO</title>
        </Head>
        <TrangXacThuc cheDoMacDinh="dang-nhap" />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Trang Chủ - ${taiKhoanHienTai.hoTen} (${taiKhoanHienTai.mssv || "525000486"})`}</title>
      </Head>
      <TrangChuRiengBiet />
    </>
  );
}
