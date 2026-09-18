import React, { useEffect } from "react";
import { useNguoiDung } from "@/context/NguoiDungContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export const KhungThongBao: React.FC = () => {
  const { thongBao, datThongBao } = useNguoiDung();

  useEffect(() => {
    if (thongBao) {
      const timer = setTimeout(() => {
        datThongBao(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [thongBao, datThongBao]);

  if (!thongBao) return null;

  const styles = {
    success: {
      bg: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
    error: {
      bg: "bg-rose-500/15 border-rose-500/40 text-rose-300",
      icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    },
    info: {
      bg: "bg-blue-500/15 border-blue-500/40 text-blue-300",
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    },
    warning: {
      bg: "bg-amber-500/15 border-amber-500/40 text-amber-300",
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    },
  };

  const currentStyle = styles[thongBao.type] || styles.info;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-center justify-between p-4 rounded-xl border backdrop-blur-md shadow-2xl ${currentStyle.bg}`}
      >
        <div className="flex items-center space-x-3">
          {currentStyle.icon}
          <p className="text-sm font-medium">{thongBao.message}</p>
        </div>
        <button
          onClick={() => datThongBao(null)}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          title="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
