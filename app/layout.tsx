import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.lastour.my.id"),

	title: {
		default: "mylastour",
		template: "%s | mylastour",
	},

	description: "narayanagung's personal photo sharing web",

	openGraph: {
		title: "my last tour",
		description: "narayanagung personal web",
		url: "https://www.lastour.my.id",
		siteName: "my last tour",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-gray-100 text-gray dark:bg-gray-950 dark:text-gray-100">
				{children}
			</body>
		</html>
	);
}
