import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function DetailPage() {
  return (
    <>
      <Head>
        <title>Trang Cấp 2 - Bức Tranh Nghệ Thuật</title>
        <meta name="description" content="Trang cấp 2 hiển thị bức tranh phong cảnh tối giản" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-6 font-sans">
        <main className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Trang Cấp 2
          </h1>

          {/* Picture frame */}
          <div className="w-full overflow-hidden rounded-lg border border-gray-200 mb-4 shadow-inner">
            <Image
              src="/landscape.png"
              alt="Bức tranh phong cảnh tối giản"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-6">
            Bức tranh phong cảnh bình minh tối giản — Góc thư giãn cho trang cấp 2 của Trần Quang Tuyến (MSSV: 525000486).
          </p>

          {/* Back link button */}
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition duration-150"
          >
            ← Quay lại trang chủ
          </Link>
        </main>
      </div>
    </>
  );
}

