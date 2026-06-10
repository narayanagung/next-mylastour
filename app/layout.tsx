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
		default: "endless journey | mylastour",
		template: "%s | mylastour",
	},

	description:
		"a personal motorcycle travel journal documenting roads, forgotten places, important and unimportant destinations,strange phenomenon, and the quiet moments found across Bali",

	openGraph: {
		title: "mylastour",
		description:
			"a personal motorcycle travel journal documenting roads, forgotten places, important and unimportant destinations,strange phenomenon, and the quiet moments found across Bali",
		url: "https://www.lastour.my.id",
		siteName: "mylastour",
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
			<body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
				{children}
			</body>
		</html>
	);
}
