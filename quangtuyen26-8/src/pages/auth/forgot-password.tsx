import Head from "next/head";
import { TrangXacThuc } from "@/giao-dien/TrangXacThuc";

export default function PageAuthForgotPassword() {
  return (
    <>
      <Head>
        <title>Quên Mật Khẩu - QLPL DEMO</title>
      </Head>
      <TrangXacThuc cheDoMacDinh="quen-mat-khau" />
    </>
  );
}
