"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
			</div>
		);
	}

	if (status === "unauthenticated") {
		router.push("/auth/signin");
		return null;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50">
			{/* Navigation */}
			<nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="flex-shrink-0 flex items-center">
								<Link
									href="/"
									className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent"
								>
									NAYI DISHA
								</Link>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<Link
								href="/"
								className="text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200"
							>
								Home
							</Link>
							<Link
								href="/api/auth/signout"
								className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors duration-200"
							>
								Sign out
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
		</div>
	);
}
