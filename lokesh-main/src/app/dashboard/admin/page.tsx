"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { users, profiles, interviewRequests } from "@/lib/mockData";

export default function AdminDashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [stats, setStats] = useState({
		totalUsers: 0,
		jobSeekers: 0,
		interviewers: 0,
		totalInterviews: 0,
		pendingInterviews: 0,
		completedInterviews: 0,
	});

	useEffect(() => {
		if (status === "authenticated" && session?.user?.role !== "admin") {
			router.push("/");
		}

		// Calculate statistics
		const totalUsers = users.length;
		const jobSeekers = users.filter((u) => u.role === "job-seeker").length;
		const interviewers = users.filter((u) => u.role === "interviewer").length;
		const totalInterviews = interviewRequests.length;
		const pendingInterviews = interviewRequests.filter(
			(req) => req.status === "pending"
		).length;
		const acceptedInterviews = interviewRequests.filter(
			(req) => req.status === "accepted"
		).length;

		setStats({
			totalUsers,
			jobSeekers,
			interviewers,
			totalInterviews,
			pendingInterviews,
			completedInterviews: acceptedInterviews,
		});
	}, [status, session, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse">
						<div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div key={i} className="h-24 bg-gray-200 rounded"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
					<button
						onClick={() => router.push("/")}
						className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
					>
						Back to Home
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							Total Users
						</h3>
						<p className="text-3xl font-bold text-purple-600">
							{stats.totalUsers}
						</p>
						<div className="mt-4 flex justify-between text-sm text-gray-500">
							<span>Job Seekers: {stats.jobSeekers}</span>
							<span>Interviewers: {stats.interviewers}</span>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							Total Interviews
						</h3>
						<p className="text-3xl font-bold text-purple-600">
							{stats.totalInterviews}
						</p>
						<div className="mt-4 flex justify-between text-sm text-gray-500">
							<span>Pending: {stats.pendingInterviews}</span>
							<span>Completed: {stats.completedInterviews}</span>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							Quick Actions
						</h3>
						<div className="space-y-2">
							<button
								onClick={() => router.push("/dashboard/admin/users")}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
							>
								Manage Users
							</button>
							<button
								onClick={() => router.push("/dashboard/admin/interviews")}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
							>
								Manage Interviews
							</button>
							<button
								onClick={() => router.push("/dashboard/admin/settings")}
								className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
							>
								System Settings
							</button>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900 mb-8">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Recent Activity
					</h2>
					<div className="space-y-4">
						{interviewRequests.slice(0, 5).map((request) => (
							<div
								key={request.id}
								className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
							>
								<div>
									<p className="text-sm font-medium text-gray-900">
										{request.jobSeekerName} requested an interview for{" "}
										{request.jobTitle} at {request.company}
									</p>
									<p className="text-sm text-gray-500">
										Status: {request.status}
									</p>
								</div>
								<span className="text-sm text-gray-500">
									{new Date(request.createdAt).toLocaleDateString()}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Admin Guidelines
					</h2>
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0">
								<svg
									className="w-5 h-5 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<p className="text-sm text-gray-600">
								Regularly monitor user activity and interview requests to ensure
								smooth operation of the platform.
							</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0">
								<svg
									className="w-5 h-5 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<p className="text-sm text-gray-600">
								Ensure all users have appropriate access levels and permissions.
							</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="flex-shrink-0">
								<svg
									className="w-5 h-5 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<p className="text-sm text-gray-600">
								Address any issues or concerns raised by users promptly.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
