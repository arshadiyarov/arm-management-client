import dynamic from "next/dynamic";

export const HistoryDetails = dynamic(() => import("./ui/page"), {
  ssr: false,
});
