"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { users, profiles } from "@/lib/mockData";

export default function AdminUsers() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [filterRole, setFilterRole] = useState("all");
	const [filteredUsers, setFilteredUsers] = useState(users);

	useEffect(() => {
		if (status === "authenticated" && session?.user?.role !== "admin") {
			router.push("/");
		}
	}, [status, session, router]);

	useEffect(() => {
		let result = users;

		// Filter by role
		if (filterRole !== "all") {
			result = result.filter((user) => user.role === filterRole);
		}

		// Filter by search term
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			result = result.filter((user) => {
				const profile = profiles[user.id];
				const profileName = profile
					? `${profile.firstName} ${profile.lastName}`
					: user.name;
				return (
					user.email.toLowerCase().includes(term) ||
					profileName.toLowerCase().includes(term)
				);
			});
		}

		setFilteredUsers(result);
	}, [searchTerm, filterRole]);

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
					<h1 className="text-3xl font-bold text-gray-900">User Management</h1>
					<button
						onClick={() => router.push("/dashboard/admin")}
						className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
					>
						Back to Dashboard
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900 mb-8">
					<div className="flex flex-col md:flex-row gap-4 mb-6">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search users..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							/>
						</div>
						<div className="w-full md:w-48">
							<select
								value={filterRole}
								onChange={(e) => setFilterRole(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							>
								<option value="all">All Roles</option>
								<option value="job-seeker">Job Seekers</option>
								<option value="interviewer">Interviewers</option>
								<option value="admin">Admins</option>
							</select>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Role
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredUsers.map((user) => {
									const profile = profiles[user.id];
									return (
										<tr key={user.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm font-medium text-gray-900">
													{profile
														? `${profile.firstName} ${profile.lastName}`
														: user.name}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-500">
													{user.email}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
													{user.role}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													Active
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
												<button
													onClick={() => console.log("Edit user:", user.id)}
													className="text-purple-600 hover:text-purple-900 mr-4"
												>
													Edit
												</button>
												<button
													onClick={() => console.log("Delete user:", user.id)}
													className="text-red-600 hover:text-red-900"
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						User Management Guidelines
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
								Verify user information before making any changes to their
								accounts.
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
								Exercise caution when deleting user accounts and ensure proper
								documentation.
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
								Maintain proper access levels and permissions for all users.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
