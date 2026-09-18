import Head from "next/head";
import { TrangXacThuc } from "@/giao-dien/TrangXacThuc";

export default function PageAuthLogin() {
  return (
    <>
      <Head>
        <title>Đăng Nhập - QLPL DEMO</title>
      </Head>
      <TrangXacThuc cheDoMacDinh="dang-nhap" />
    </>
  );
}
