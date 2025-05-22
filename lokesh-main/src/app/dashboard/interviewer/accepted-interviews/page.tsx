"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InterviewRequest } from "@/lib/mockData";
import { interviewRequests } from "@/lib/mockData";

export default function AcceptedInterviews() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [interviews, setInterviews] = useState<InterviewRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		} else if (status === "authenticated") {
			// Use mock data for accepted interviews
			setInterviews(
				interviewRequests.filter((request) => request.status === "accepted")
			);
			setIsLoading(false);
		}
	}, [status, router]);

	if (status === "loading" || isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse space-y-4">
						{[1, 2, 3].map((i) => (
							<div key={i} className="bg-white rounded-xl shadow-lg p-6">
								<div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
								<div className="space-y-3">
									<div className="h-4 bg-gray-200 rounded w-1/2"></div>
									<div className="h-4 bg-gray-200 rounded w-2/3"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Accepted Interviews
						</h1>
						<p className="mt-2 text-gray-600">View your upcoming interviews</p>
					</div>
					<button
						onClick={() => router.back()}
						className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
					>
						Back to Dashboard
					</button>
				</div>

				<div className="space-y-6">
					{interviews.length > 0 ? (
						interviews.map((interview) => (
							<div
								key={interview.id}
								className="bg-white rounded-xl shadow-lg p-6"
							>
								<div className="flex justify-between items-start">
									<div>
										<h3 className="text-xl font-semibold text-gray-900">
											{interview.jobSeekerName}
										</h3>
										<p className="text-gray-600">
											{interview.jobTitle} at {interview.company}
										</p>
										<p className="text-sm text-gray-500">
											{interview.jobSeekerEmail}
										</p>
									</div>
									<div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
										Accepted
									</div>
								</div>
								<div className="mt-6">
									<h4 className="text-sm font-medium text-gray-900 mb-3">
										Selected Time Slots:
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
										{interview.preferredTimeSlots.map((slot, index) => (
											<div key={index} className="bg-gray-50 p-3 rounded-lg">
												<p className="text-sm font-medium text-gray-900">
													{slot.date}
												</p>
												<p className="text-sm text-gray-600">{slot.time}</p>
											</div>
										))}
									</div>
								</div>
								<div className="mt-6 flex justify-end space-x-4">
									<button
										onClick={() =>
											window.open(`mailto:${interview.jobSeekerEmail}`)
										}
										className="text-purple-600 hover:text-purple-700 font-medium text-sm"
									>
										Contact Candidate
									</button>
									<button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
										Start Interview
									</button>
								</div>
							</div>
						))
					) : (
						<div className="bg-white rounded-xl shadow-lg p-8 text-center">
							<p className="text-gray-600">No accepted interviews yet</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
