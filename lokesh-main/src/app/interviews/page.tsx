"use client";

import { useState } from "react";
import { interviewRequests } from "@/lib/mockData";

export default function Interviews() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [filteredInterviews, setFilterInterviews] = useState(interviewRequests);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		filterInterviews(term, filterStatus);
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const status = e.target.value;
		setFilterStatus(status);
		filterInterviews(searchTerm, status);
	};

	const filterInterviews = (term: string, status: string) => {
		let result = interviewRequests;

		// Filter by status
		if (status !== "all") {
			result = result.filter((interview) => interview.status === status);
		}

		// Filter by search term
		if (term) {
			result = result.filter(
				(interview) =>
					interview.jobSeekerName.toLowerCase().includes(term) ||
					interview.jobTitle.toLowerCase().includes(term) ||
					interview.company.toLowerCase().includes(term)
			);
		}

		setFilterInterviews(result);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Interview Requests
					</h1>
					<p className="mt-2 text-lg text-gray-600">
						View and manage all interview requests
					</p>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900 mb-8">
					<div className="flex flex-col md:flex-row gap-4 mb-6">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search interviews..."
								value={searchTerm}
								onChange={handleSearch}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							/>
						</div>
						<div className="w-full md:w-48">
							<select
								value={filterStatus}
								onChange={handleFilterChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							>
								<option value="all">All Status</option>
								<option value="pending">Pending</option>
								<option value="accepted">Accepted</option>
								<option value="completed">Completed</option>
								<option value="rejected">Rejected</option>
							</select>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Job Seeker
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Job Title
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Company
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Background
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Special Needs
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
								{filteredInterviews.map((interview) => (
									<tr key={interview.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">
												{interview.jobSeekerName}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{interview.jobTitle}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{interview.company}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-gray-900">
												{interview.background}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-gray-900">
												{interview.specialNeeds}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													interview.status === "scheduled"
														? "bg-yellow-100 text-yellow-800"
														: interview.status === "completed"
														? "bg-green-100 text-green-800"
														: "bg-red-100 text-red-800"
												}`}
											>
												{interview.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<button
												onClick={() =>
													console.log("View interview:", interview.id)
												}
												className="text-purple-600 hover:text-purple-900 mr-4"
											>
												View
											</button>
											<button
												onClick={() =>
													console.log("Edit interview:", interview.id)
												}
												className="text-blue-600 hover:text-blue-900"
											>
												Edit
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Interview Management Guidelines
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
								Review each interview request carefully, considering the
								candidate's background and special needs.
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
								Ensure all necessary accommodations are arranged before the
								interview.
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
								Maintain clear communication with both interviewers and
								candidates throughout the process.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
