import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { NguoiDungProvider, useNguoiDung } from "@/context/NguoiDungContext";
import { ThanhDieuHuong } from "@/giao-dien/ThanhDieuHuong";
import { KhungThongBao } from "@/giao-dien/KhungThongBao";

function AppLayout({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { taiKhoanHienTai } = useNguoiDung();

  const isAuthPage =
    router.pathname.startsWith("/auth") ||
    router.pathname === "/xac-thuc" ||
    router.pathname === "/thiet-bi" ||
    (router.pathname === "/" && !taiKhoanHienTai);

  const tenHienThi = taiKhoanHienTai ? taiKhoanHienTai.hoTen : "Trần Quang Tuyến";
  const mssvHienThi = taiKhoanHienTai ? taiKhoanHienTai.mssv : "525000486";
  const lopHienThi = taiKhoanHienTai ? taiKhoanHienTai.lop : "25CT501";

  return (
    <>
      <Head>
        <title>
          {taiKhoanHienTai
            ? `Hệ Thống Sinh Viên - ${tenHienThi} (${mssvHienThi || "SV"})`
            : "Đăng Nhập / Đăng Ký - QLPL DEMO"}
        </title>
        <meta
          name="description"
          content={`Trang thông tin sinh viên ${tenHienThi} - MSSV: ${mssvHienThi} - Lớp: ${lopHienThi}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        {!isAuthPage && <ThanhDieuHuong />}
        <KhungThongBao />

        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        {!isAuthPage && (
          <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span>Sinh viên thực hiện: </span>
                <strong className="text-slate-800">{tenHienThi}</strong>
                {mssvHienThi && (
                  <>
                    <span> - MSSV: </span>
                    <strong className="text-slate-800">{mssvHienThi}</strong>
                  </>
                )}
                {lopHienThi && (
                  <>
                    <span> - Lớp: </span>
                    <strong className="text-slate-800">{lopHienThi}</strong>
                  </>
                )}
              </div>
              <div>
                <span>Hệ thống Quản lý Sinh viên & Tài sản IT</span>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}

import { ThietBiProvider } from "@/context/ThietBiContext";

export default function App(props: AppProps) {
  return (
    <NguoiDungProvider>
      <ThietBiProvider>
        <AppLayout {...props} />
      </ThietBiProvider>
    </NguoiDungProvider>
  );
}
