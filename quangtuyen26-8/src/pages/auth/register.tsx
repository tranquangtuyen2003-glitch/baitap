import Head from "next/head";
import { TrangXacThuc } from "@/giao-dien/TrangXacThuc";

export default function PageAuthRegister() {
  return (
    <>
      <Head>
        <title>Đăng Ký - QLPL DEMO</title>
      </Head>
      <TrangXacThuc cheDoMacDinh="dang-ky" />
    </>
  );
}
