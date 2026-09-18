import Head from "next/head";
import { TrangXacThuc } from "@/giao-dien/TrangXacThuc";

export default function PageXacThuc() {
  return (
    <>
      <Head>
        <title>Xác Thực - Đăng Nhập / Đăng Ký / Quên Mật Khẩu</title>
      </Head>
      <TrangXacThuc cheDoMacDinh="dang-nhap" />
    </>
  );
}
