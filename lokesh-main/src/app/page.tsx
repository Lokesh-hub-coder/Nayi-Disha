"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session?.user?.role) {
			switch (session.user.role) {
				case "job-seeker":
					router.push("/dashboard/job-seeker");
					break;
				case "interviewer":
					router.push("/dashboard/interviewer");
					break;
				case "admin":
					router.push("/dashboard/admin");
					break;
				default:
					// If role is not recognized, stay on home page
					break;
			}
		}
	}, [session, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
			{/* Navigation */}
			<nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="flex-shrink-0 flex items-center">
								<h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
									NAYI DISHA
								</h1>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							{session ? (
								<>
									<Link
										href={`/dashboard/${session.user.role}`}
										className="text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200"
									>
										Dashboard
									</Link>
									<Link
										href="/api/auth/signout"
										className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors duration-200"
									>
										Sign out
									</Link>
								</>
							) : (
								<>
									<Link
										href="/auth/signin"
										className="text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200"
									>
										Sign in
									</Link>
									<Link
										href="/auth/signup"
										className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition-colors duration-200"
									>
										Sign up
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left side - Text content */}
					<div className="text-left space-y-8">
						<h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
							<span className="block text-gray-900">Empowering</span>
							<span className="block bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
								India's Job Seekers
							</span>
						</h1>
						<div className="space-y-6">
							<p className="text-lg text-gray-600">
								We believe every Indian deserves a fair chance at employment.
								Our platform connects job seekers from all backgrounds with
								opportunities that can transform their lives.
							</p>
							<div className="space-y-4">
								<div className="flex items-start space-x-3">
									<svg
										className="w-6 h-6 text-purple-600 mt-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<p className="text-gray-700">
										Free access to job opportunities across India
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<svg
										className="w-6 h-6 text-purple-600 mt-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<p className="text-gray-700">
										Support for underprivileged and first-time job seekers
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<svg
										className="w-6 h-6 text-purple-600 mt-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									<p className="text-gray-700">
										Skill development and career guidance resources
									</p>
								</div>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="rounded-md shadow">
								<Link
									href="/auth/signup"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 md:py-4 md:text-lg md:px-10"
								>
									Get Started
								</Link>
							</div>
							<div className="rounded-md shadow">
								<Link
									href="/about"
									className="w-full flex items-center justify-center px-8 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 md:py-4 md:text-lg md:px-10"
								>
									Learn More
								</Link>
							</div>
						</div>
					</div>

					{/* Right side - Image */}
					<div className="order-first lg:order-last">
						<img
							src="/homepage.jpg"
							alt="Empowering job seekers in India"
							className="rounded-xl shadow-xl w-full h-[600px] object-cover"
						/>
					</div>
				</div>

				{/* Additional Information Section */}
				<div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-white p-8 rounded-xl shadow-lg">
						<h3 className="text-xl font-semibold text-gray-900 mb-4">
							For Job Seekers
						</h3>
						<p className="text-gray-600">
							Create your profile, showcase your skills, and connect with
							employers who value your potential.
						</p>
					</div>
					<div className="bg-white p-8 rounded-xl shadow-lg">
						<h3 className="text-xl font-semibold text-gray-900 mb-4">
							Our Mission
						</h3>
						<p className="text-gray-600">
							To bridge the employment gap in India by connecting talented
							individuals with meaningful opportunities.
						</p>
					</div>
					<div className="bg-white p-8 rounded-xl shadow-lg">
						<h3 className="text-xl font-semibold text-gray-900 mb-4">
							Community Support
						</h3>
						<p className="text-gray-600">
							Join our growing community of job seekers and employers working
							together to create a better future.
						</p>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-white/80 backdrop-blur-sm border-t">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<div className="text-center text-sm text-gray-600">
						<p>© 2024 NAYI DISHA. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

// my comment
