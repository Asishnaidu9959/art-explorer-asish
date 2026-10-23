import "./globals.css";
import MainNav from "@/components/MainNav";
export const metadata={title:"Art Explorer | ITE5425",description:"React and Next.js mastery lab"};
export default function RootLayout({children}){return <html lang="en"><body><MainNav/><main className="container">{children}</main></body></html>}
