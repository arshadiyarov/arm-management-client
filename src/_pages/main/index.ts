import dynamic from "next/dynamic";

export const Main = dynamic(() => import("./ui/page"), { ssr: false });
