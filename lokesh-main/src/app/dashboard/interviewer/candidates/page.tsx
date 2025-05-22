"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import Modal from "@/components/Modal";

interface TimeSlot {
	_id: string;
	userId: {
		_id: string;
		name: string;
		email: string;
	};
	skills: string[];
	jobRole: string;
	timeSlot: string;
	createdAt: string;
}

export default function CandidatesPage() {
	const [requests, setRequests] = useState<TimeSlot[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [filters, setFilters] = useState({
		jobRole: "",
		skill: "",
		timeSlot: "",
	});
	const [uniqueValues, setUniqueValues] = useState({
		jobRoles: [] as string[],
		skills: [] as string[],
		timeSlots: [] as string[],
	});

	// Move unique value calculations into useEffect
	useEffect(() => {
		if (requests.length > 0) {
			setUniqueValues({
				jobRoles: [...new Set(requests.map((req) => req.jobRole))],
				skills: [...new Set(requests.flatMap((req) => req.skills))],
				timeSlots: [...new Set(requests.map((req) => req.timeSlot))],
			});
		}
	}, [requests]);

	// Filter requests based on search and filters
	const filteredRequests = requests.filter((request) => {
		const matchesSearch =
			request.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			request.userId.email.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesJobRole =
			!filters.jobRole || request.jobRole === filters.jobRole;
		const matchesSkill =
			!filters.skill || request.skills.includes(filters.skill);
		const matchesTimeSlot =
			!filters.timeSlot || request.timeSlot === filters.timeSlot;

		return matchesSearch && matchesJobRole && matchesSkill && matchesTimeSlot;
	});

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const response = await axios.get("/api/interview/requests");
				setRequests(response.data as TimeSlot[]);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("Failed to fetch requests");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchRequests();
	}, []);

	const handleAcceptRequest = async (requestId: string) => {
		try {
			await axios.post(`/api/interview/accept/${requestId}`);
			setRequests(requests.filter((req) => req._id !== requestId));
			setError("");
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Failed to accept request");
			}
			setShowErrorModal(true);
			const response = await axios.get("/api/interview/requests");
			setRequests(response.data as TimeSlot[]);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Interview Requests
				</h1>

				{/* Error Modal */}
				<Modal
					isOpen={showErrorModal}
					onClose={() => {
						setShowErrorModal(false);
						setError("");
					}}
					title="Error"
				>
					{error}
				</Modal>

				{/* Search and Filters Section */}
				<div className="bg-white p-6 rounded-lg shadow-md mb-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Search Bar */}
						<div className="lg:col-span-2">
							<label
								htmlFor="search"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Search by na me or email
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg
										className="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
								<input
									type="text"
									id="search"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
									placeholder="Search candidates..."
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
									>
										<svg
											className="h-5 w-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								)}
							</div>
						</div>

						{/* Job Role Filter */}
						<div>
							<label
								htmlFor="jobRole"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Job Role
							</label>
							<select
								id="jobRole"
								value={filters.jobRole}
								onChange={(e) =>
									setFilters({ ...filters, jobRole: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="">All Roles</option>
								{uniqueValues.jobRoles.map((role) => (
									<option key={role} value={role}>
										{role}
									</option>
								))}
							</select>
						</div>

						{/* Skills Filter */}
						<div>
							<label
								htmlFor="skill"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Skills
							</label>
							<select
								id="skill"
								value={filters.skill}
								onChange={(e) =>
									setFilters({ ...filters, skill: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="">All Skills</option>
								{uniqueValues.skills.map((skill) => (
									<option key={skill} value={skill}>
										{skill}
									</option>
								))}
							</select>
						</div>

						{/* Time Slot Filter */}
						<div>
							<label
								htmlFor="timeSlot"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Time Slot
							</label>
							<select
								id="timeSlot"
								value={filters.timeSlot}
								onChange={(e) =>
									setFilters({ ...filters, timeSlot: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="">All Time Slots</option>
								{uniqueValues.timeSlots.map((slot) => (
									<option key={slot} value={slot}>
										{slot}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Clear Filters Button */}
					<div className="mt-4 flex justify-end">
						<button
							onClick={() => {
								setSearchQuery("");
								setFilters({ jobRole: "", skill: "", timeSlot: "" });
							}}
							className="text-sm text-indigo-600 hover:text-indigo-800"
						>
							Clear all filters
						</button>
					</div>
				</div>

				{filteredRequests.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">
							No matching interview requests found.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredRequests.map((request, index) => (
							<div
								key={request._id}
								className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
									index % 6 === 0
										? "bg-gradient-to-br from-blue-50 to-blue-100"
										: index % 6 === 1
										? "bg-gradient-to-br from-purple-50 to-purple-100"
										: index % 6 === 2
										? "bg-gradient-to-br from-green-50 to-green-100"
										: index % 6 === 3
										? "bg-gradient-to-br from-pink-50 to-pink-100"
										: index % 6 === 4
										? "bg-gradient-to-br from-yellow-50 to-yellow-100"
										: "bg-gradient-to-br from-indigo-50 to-indigo-100"
								}`}
							>
								<div className="p-6">
									<div className="flex items-center justify-between mb-4">
										<div>
											<h2 className="text-xl font-semibold text-gray-900">
												{request.userId.name}
											</h2>
											<p className="text-sm text-gray-600">
												{request.userId.email}
											</p>
										</div>
										<div
											className={`h-12 w-12 rounded-full flex items-center justify-center ${
												index % 6 === 0
													? "bg-blue-100"
													: index % 6 === 1
													? "bg-purple-100"
													: index % 6 === 2
													? "bg-green-100"
													: index % 6 === 3
													? "bg-pink-100"
													: index % 6 === 4
													? "bg-yellow-100"
													: "bg-indigo-100"
											}`}
										>
											<span
												className={`font-semibold text-lg ${
													index % 6 === 0
														? "text-blue-600"
														: index % 6 === 1
														? "text-purple-600"
														: index % 6 === 2
														? "text-green-600"
														: index % 6 === 3
														? "text-pink-600"
														: index % 6 === 4
														? "text-yellow-600"
														: "text-indigo-600"
												}`}
											>
												{request.userId.name.charAt(0)}
											</span>
										</div>
									</div>

									<div className="space-y-3">
										<div className="flex items-center">
											<svg
												className={`h-5 w-5 mr-2 ${
													index % 6 === 0
														? "text-blue-400"
														: index % 6 === 1
														? "text-purple-400"
														: index % 6 === 2
														? "text-green-400"
														: index % 6 === 3
														? "text-pink-400"
														: index % 6 === 4
														? "text-yellow-400"
														: "text-indigo-400"
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
											<span className="text-sm text-gray-900">
												{request.jobRole}
											</span>
										</div>

										<div className="flex items-start">
											<svg
												className={`h-5 w-5 mr-2 mt-1 ${
													index % 6 === 0
														? "text-blue-400"
														: index % 6 === 1
														? "text-purple-400"
														: index % 6 === 2
														? "text-green-400"
														: index % 6 === 3
														? "text-pink-400"
														: index % 6 === 4
														? "text-yellow-400"
														: "text-indigo-400"
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
												/>
											</svg>
											<div>
												<span className="text-sm font-medium text-gray-500">
													Skills:
												</span>
												<div className="flex flex-wrap gap-2 mt-1">
													{request.skills.map((skill, skillIndex) => (
														<span
															key={skillIndex}
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
																index % 6 === 0
																	? "bg-blue-100 text-blue-800"
																	: index % 6 === 1
																	? "bg-purple-100 text-purple-800"
																	: index % 6 === 2
																	? "bg-green-100 text-green-800"
																	: index % 6 === 3
																	? "bg-pink-100 text-pink-800"
																	: index % 6 === 4
																	? "bg-yellow-100 text-yellow-800"
																	: "bg-indigo-100 text-indigo-800"
															}`}
														>
															{skill}
														</span>
													))}
												</div>
											</div>
										</div>

										<div className="flex items-center">
											<svg
												className={`h-5 w-5 mr-2 ${
													index % 6 === 0
														? "text-blue-400"
														: index % 6 === 1
														? "text-purple-400"
														: index % 6 === 2
														? "text-green-400"
														: index % 6 === 3
														? "text-pink-400"
														: index % 6 === 4
														? "text-yellow-400"
														: "text-indigo-400"
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span className="text-sm text-gray-900">
												{request.timeSlot}
											</span>
										</div>
									</div>

									<div className="mt-6">
										<button
											onClick={() => handleAcceptRequest(request._id)}
											className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
												index % 6 === 0
													? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
													: index % 6 === 1
													? "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
													: index % 6 === 2
													? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
													: index % 6 === 3
													? "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
													: index % 6 === 4
													? "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
													: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
											}`}
										>
											Accept Request
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
