"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Schedule() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [schedules, setSchedules] = useState([
		{
			id: 1,
			candidateName: "Rahul Kumar",
			jobTitle: "Data Entry Operator",
			company: "TechSolutions India",
			date: "2024-03-20",
			time: "10:00 AM",
			duration: "60 minutes",
			background: "From rural Bihar",
			specialNeeds: "Requires screen reader software",
		},
		{
			id: 2,
			candidateName: "Priya Sharma",
			jobTitle: "Customer Support Associate",
			company: "ServiceFirst India",
			date: "2024-03-21",
			time: "2:30 PM",
			duration: "90 minutes",
			background: "From urban slum in Mumbai",
			specialNeeds: "Requires sign language interpreter",
		},
	]);

	const handleReschedule = (id: number) => {
		// Handle rescheduling logic
		console.log("Rescheduling interview:", id);
	};

	const handleCancel = (id: number) => {
		// Handle cancellation logic
		console.log("Cancelling interview:", id);
	};

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
					<h1 className="text-3xl font-bold text-gray-900">
						Interview Schedule
					</h1>
					<button
						onClick={() => router.push("/dashboard/interviewer")}
						className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
					>
						Back to Dashboard
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead>
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Candidate
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Job Details
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Schedule
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Background & Needs
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{schedules.map((schedule) => (
									<tr key={schedule.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">
												{schedule.candidateName}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{schedule.jobTitle}
											</div>
											<div className="text-sm text-gray-500">
												{schedule.company}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{schedule.date}
											</div>
											<div className="text-sm text-gray-500">
												{schedule.time} ({schedule.duration})
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="text-sm text-gray-900">
												{schedule.background}
											</div>
											<div className="text-sm text-gray-500">
												{schedule.specialNeeds}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<button
												onClick={() => handleReschedule(schedule.id)}
												className="text-purple-600 hover:text-purple-900 mr-4"
											>
												Reschedule
											</button>
											<button
												onClick={() => handleCancel(schedule.id)}
												className="text-red-600 hover:text-red-900"
											>
												Cancel
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Schedule Guidelines
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
								Please provide at least 24 hours notice for any schedule changes
								to accommodate candidates' needs.
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
								Consider candidates' time zones and accessibility needs when
								scheduling interviews.
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
					</div>
				</div>
			</div>
		</div>
	);
}
