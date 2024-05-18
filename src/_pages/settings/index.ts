import dynamic from "next/dynamic";

export const Settings = dynamic(() => import("./ui/page"));
