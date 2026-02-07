import Swal from "sweetalert2";

export const confirmAction = async (options: {
  title: string;
  text: string;
  icon?: 'warning' | 'error' | 'success' | 'info';
  confirmText?: string;
}) => {
  return await Swal.fire({
    title: options.title,
    text: options.text,
    icon: options.icon || "warning",
    showCancelButton: true,
    confirmButtonColor: "#18181b", 
    cancelButtonColor: "#ef4444",
    confirmButtonText: options.confirmText || "Yes, proceed!",
    cancelButtonText: "Cancel",
    background: "#ffffff",
    customClass: {
      popup: "rounded-[2rem] border-none shadow-2xl",
      title: "font-black uppercase tracking-tighter text-2xl",
      confirmButton: "rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest",
      cancelButton: "rounded-xl px-6 py-3 font-bold uppercase text-[10px] tracking-widest"
    }
  });
};