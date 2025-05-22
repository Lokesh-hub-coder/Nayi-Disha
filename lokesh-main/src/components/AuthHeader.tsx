"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function AuthHeader() {
	const { data: session } = useSession();

	return (
		<header className="bg-white border-b border-gray-100 shadow-sm">
			<nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<Link
							href="/"
							className="flex items-center"
						>
							<span className="text-2xl font-bold gradient-text">NAYI DISHA</span>
						</Link>
					</div>

					<div className="flex items-center">
						{session ? (
							<UserMenu />
						) : (
							<div className="flex items-center space-x-4">
								<Link
									href="/auth/signin"
									className="px-3 py-2 text-sm font-medium text-gray-600 transition-colors rounded-md hover:text-gray-900"
								>
									Sign in
								</Link>
								<Link
									href="/auth/signup"
									className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-gradient-to-r from-purple-600 to-teal-500 hover-gradient"
								>
									Sign up
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}
