import dynamic from "next/dynamic";

export const Login = dynamic(() => import("./ui/page"), { ssr: false });
