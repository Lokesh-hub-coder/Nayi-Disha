"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TimeSlot = {
	morning: boolean;
	afternoon: boolean;
	evening: boolean;
};

type AvailabilityState = {
	monday: TimeSlot;
	tuesday: TimeSlot;
	wednesday: TimeSlot;
	thursday: TimeSlot;
	friday: TimeSlot;
	saturday: TimeSlot;
	sunday: TimeSlot;
};

export default function Availability() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [availability, setAvailability] = useState<AvailabilityState>({
		monday: { morning: false, afternoon: false, evening: false },
		tuesday: { morning: false, afternoon: false, evening: false },
		wednesday: { morning: false, afternoon: false, evening: false },
		thursday: { morning: false, afternoon: false, evening: false },
		friday: { morning: false, afternoon: false, evening: false },
		saturday: { morning: false, afternoon: false, evening: false },
		sunday: { morning: false, afternoon: false, evening: false },
	});

	const handleCheckboxChange = (
		day: keyof AvailabilityState,
		timeSlot: keyof TimeSlot
	) => {
		setAvailability((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				[timeSlot]: !prev[day][timeSlot],
			},
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle availability submission
		console.log("Availability submitted:", availability);
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
						Set Interview Availability
					</h1>
					<button
						onClick={() => router.push("/dashboard/interviewer")}
						className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
					>
						Back to Dashboard
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Day
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Morning (9 AM - 12 PM)
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Afternoon (1 PM - 5 PM)
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Evening (6 PM - 9 PM)
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{Object.entries(availability).map(([day, slots]) => (
										<tr key={day}>
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												{day.charAt(0).toUpperCase() + day.slice(1)}
											</td>
											{Object.entries(slots).map(([timeSlot, isAvailable]) => (
												<td
													key={timeSlot}
													className="px-6 py-4 whitespace-nowrap"
												>
													<input
														type="checkbox"
														checked={isAvailable}
														onChange={() =>
															handleCheckboxChange(
																day as keyof AvailabilityState,
																timeSlot as keyof TimeSlot
															)
														}
														className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
													/>
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="flex justify-end">
							<button
								type="submit"
								className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
							>
								Save Availability
							</button>
						</div>
					</form>
				</div>

				<div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Special Considerations
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
								Ensure you have enough time between interviews to provide
								adequate feedback and prepare for the next candidate.
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
								Consider scheduling longer time slots for candidates who may
								need additional time due to special needs or accessibility
								requirements.
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
								Be mindful of time zone differences when scheduling interviews
								with candidates from different regions.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
