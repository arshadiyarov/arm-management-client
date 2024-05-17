import dynamic from "next/dynamic";

export const History = dynamic(() => import("./ui/page"));
