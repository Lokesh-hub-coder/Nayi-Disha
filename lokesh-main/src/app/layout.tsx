import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NAYI DISHA",
	description: "Your Ultimate Job Search Platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<body className={`${inter.className} h-full antialiased dark:bg-[#121212]`}>
				<Providers>
					<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
						<main className="relative">
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
