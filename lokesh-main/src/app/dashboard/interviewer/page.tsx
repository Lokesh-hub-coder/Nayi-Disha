"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import { InterviewerProfile, InterviewRequest } from "@/lib/mockData";
import { interviewRequests } from "@/lib/mockData";

export default function InterviewerDashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [profile, setProfile] = useState<InterviewerProfile | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [acceptedInterviews, setAcceptedInterviews] = useState<
		InterviewRequest[]
	>([]);
	const [stats, setStats] = useState({
		totalInterviews: 0,
		completedInterviews: 0,
		upcomingInterviews: 0,
		pendingRequests: 0,
		averageRating: 0,
		totalFeedback: 0,
	});

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		} else if (status === "authenticated" && session?.user?.id) {
			fetchProfile(session.user.id);
			// Filter interview requests by status
			const accepted = interviewRequests.filter(
				(request) => request.status === "accepted"
			);
			const pending = interviewRequests.filter(
				(request) => request.status === "pending"
			);
			setAcceptedInterviews(accepted);
			setStats({
				totalInterviews: accepted.length,
				completedInterviews: 0, // This would come from actual data
				upcomingInterviews: accepted.length,
				pendingRequests: pending.length,
				averageRating: 4.8, // Mock data
				totalFeedback: 12, // Mock data
			});
		}
	}, [status, router, session]);

	const fetchProfile = async (userId: string) => {
		try {
			const response = await fetch(`/api/profile/interviewer?userId=${userId}`);
			if (response.ok) {
				const data = await response.json();
				setProfile(data);
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (status === "loading" || isLoading) {
		return (
			<div className="px-4 py-12 min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="animate-pulse">
						<div className="mb-8 w-1/4 h-8 bg-gray-200 rounded"></div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3].map((i) => (
								<div key={i} className="p-6 bg-white rounded-xl shadow-lg">
									<div className="mb-4 w-3/4 h-4 bg-gray-200 rounded"></div>
									<div className="space-y-3">
										<div className="w-1/2 h-4 bg-gray-200 rounded"></div>
										<div className="w-2/3 h-4 bg-gray-200 rounded"></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="px-4 py-12 min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Welcome back,{" "}
						{profile?.firstName || session?.user?.name || "Interviewer"}!
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-300">
						Help create opportunities for underprivileged and disabled job
						seekers
					</p>
				</div>

				{/* Stats Overview */}
				<div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] p-6 border-2 border-blue-900">
						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-300">
									Total Interviews
								</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">
									{stats.totalInterviews}
								</p>
							</div>
							<div className="p-3 bg-purple-100 rounded-full">
								<svg
									className="w-6 h-6 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] p-6 border-2 border-blue-900">
						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-300">
									Completed Interviews
								</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">
									{stats.completedInterviews}
								</p>
							</div>
							<div className="p-3 bg-green-100 rounded-full">
								<svg
									className="w-6 h-6 text-green-600"
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
						</div>
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] p-6 border-2 border-blue-900">
						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-300">
									Upcoming Interviews
								</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">
									{stats.upcomingInterviews}
								</p>
							</div>
							<div className="p-3 bg-blue-100 rounded-full">
								<svg
									className="w-6 h-6 text-blue-600"
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
							</div>
						</div>
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] p-6 border-2 border-blue-900">
						<div className="flex justify-between items-center">
							<div>
								<p className="text-sm font-medium text-gray-600 dark:text-gray-300">
									Pending Requests
								</p>
								<p className="text-2xl font-bold text-gray-900 dark:text-white">
									{stats.pendingRequests}
								</p>
							</div>
							<div className="p-3 bg-yellow-100 rounded-full">
								<svg
									className="w-6 h-6 text-yellow-600"
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
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<button
						onClick={() => router.push("/dashboard/interviewer/pending")}
						className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 border-2 border-blue-900"
					>
						<svg
							className="w-6 h-6 text-yellow-600"
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
						<span>View Pending Requests</span>
					</button>
					<button
						onClick={() => router.push("/dashboard/interviewer/accepted")}
						className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 border-2 border-blue-900"
					>
						<svg
							className="w-6 h-6 text-green-600"
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
						<span>View Accepted Interviews</span>
					</button>
					<button
						onClick={() => router.push("/dashboard/interviewer/availability")}
						className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 border-2 border-blue-900"
					>
						<svg
							className="w-6 h-6 text-blue-600"
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
						<span>Set Availability</span>
					</button>
					<button
						onClick={() => router.push("/dashboard/interviewer/feedback")}
						className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 border-2 border-blue-900"
					>
						<svg
							className="w-6 h-6 text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
						<span>Submit Feedback</span>
					</button>
				</div>

				{/* Interview Tips */}
				<div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-blue-900">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Interview Guidelines
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
								Be patient and understanding with candidates who may need more
								time to respond
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
								Focus on their abilities and potential rather than limitations
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
								Provide clear instructions and be open to different
								communication methods
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2">
						{/* Calendar View */}
						<div className="p-6 mb-6 bg-white rounded-xl shadow-lg border-2 border-blue-900">
							<h2 className="mb-4 text-xl font-semibold text-gray-900">
								Upcoming Schedule
							</h2>
							<div className="grid grid-cols-7 gap-2 mb-4">
								{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
									(day) => (
										<div
											key={day}
											className="text-sm font-medium text-center text-gray-500"
										>
											{day}
										</div>
									)
								)}
							</div>
							<div className="grid grid-cols-7 gap-2">
								{[...Array(35)].map((_, i) => (
									<div
										key={i}
										className={`aspect-square p-2 rounded-lg ${
											i === 15 ? "bg-purple-100" : "hover:bg-gray-50"
										}`}
									>
										<div className="text-sm font-medium text-gray-900">
											{i + 1}
										</div>
										{i === 15 && (
											<div className="mt-1 text-xs text-purple-600">
												2 interviews
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Accepted Interviews */}
						<div className="p-6 mb-6 bg-white rounded-xl shadow-lg border-2 border-blue-900">
							<h2 className="mb-4 text-xl font-semibold text-gray-900">
								Accepted Interviews
							</h2>
							<div className="space-y-4">
								{acceptedInterviews.length > 0 ? (
									<div className="space-y-4">
										{acceptedInterviews.slice(0, 2).map((interview) => (
											<div key={interview.id} className="p-4 rounded-lg border">
												<div className="flex justify-between items-start">
													<div>
														<h3 className="text-lg font-medium text-gray-900">
															{interview.jobSeekerName}
														</h3>
														<p className="text-gray-600">
															{interview.jobTitle} at {interview.company}
														</p>
														<p className="text-sm text-gray-500">
															Next slot: {interview.preferredTimeSlots[0].date}{" "}
															at {interview.preferredTimeSlots[0].time}
														</p>
														{interview.background && (
															<div className="mt-2">
																<p className="text-sm text-purple-600">
																	Background: {interview.background}
																</p>
															</div>
														)}
														{interview.specialNeeds && (
															<div className="mt-2">
																<p className="text-sm text-blue-600">
																	Special Needs: {interview.specialNeeds}
																</p>
															</div>
														)}
													</div>
													<div className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
														Accepted
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<p className="text-gray-600">No upcoming interviews</p>
								)}
								<div className="flex space-x-4">
									<button
										onClick={() =>
											router.push("/dashboard/interviewer/accepted")
										}
										className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-teal-500 rounded-lg shadow-sm hover:from-purple-700 hover:to-teal-600"
									>
										View All Accepted Interviews
									</button>
									<button
										onClick={() =>
											router.push("/dashboard/interviewer/pending")
										}
										className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200"
									>
										View Pending Requests
									</button>
								</div>
							</div>
						</div>

						{/* Recent Feedback */}
						<div className="p-6 mb-6 bg-white rounded-xl shadow-lg border-2 border-blue-900">
							<h2 className="mb-4 text-xl font-semibold text-gray-900">
								Recent Feedback
							</h2>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm font-medium text-gray-900">
											Average Rating
										</p>
										<div className="flex items-center mt-1">
											{[...Array(5)].map((_, i) => (
												<svg
													key={i}
													className={`w-5 h-5 ${
														i < Math.floor(stats.averageRating)
															? "text-yellow-400"
															: "text-gray-300"
													}`}
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
											<span className="ml-2 text-sm text-gray-600">
												{stats.averageRating} ({stats.totalFeedback} reviews)
											</span>
										</div>
									</div>
									<button
										onClick={() =>
											router.push("/dashboard/interviewer/feedback")
										}
										className="text-sm font-medium text-purple-600 hover:text-purple-700"
									>
										View All Feedback
									</button>
								</div>
								<div className="pt-4 border-t">
									<div className="space-y-4">
										{[1, 2].map((i) => (
											<div key={i} className="flex items-start space-x-4">
												<div className="flex-shrink-0">
													<div className="w-10 h-10 bg-gray-200 rounded-full"></div>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-900">
														Rahul Kumar
													</p>
													<p className="text-sm text-gray-600">
														"Thank you for giving me this opportunity despite my
														background. Your guidance helped me showcase my
														skills effectively."
													</p>
													<div className="flex items-center mt-1">
														{[...Array(5)].map((_, j) => (
															<svg
																key={j}
																className={`w-4 h-4 ${
																	j < 5 ? "text-yellow-400" : "text-gray-300"
																}`}
																fill="currentColor"
																viewBox="0 0 20 20"
															>
																<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
															</svg>
														))}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] p-6 border-2 border-blue-900">
							<h2 className="mb-4 text-xl font-semibold text-gray-900">
								Quick Actions
							</h2>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<button
									onClick={() => router.push("/dashboard/interviewer/schedule")}
									className="flex items-center p-4 space-x-2 rounded-lg border hover:bg-gray-50"
								>
									<svg
										className="w-6 h-6 text-purple-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<span>Manage Schedule</span>
								</button>
								<button
									onClick={() => router.push("/dashboard/interviewer/feedback")}
									className="flex items-center p-4 space-x-2 rounded-lg border hover:bg-gray-50"
								>
									<svg
										className="w-6 h-6 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
										/>
									</svg>
									<span>Submit Feedback</span>
								</button>
								<button
									onClick={() =>
										router.push("/dashboard/interviewer/availability")
									}
									className="flex items-center p-4 space-x-2 rounded-lg border hover:bg-gray-50"
								>
									<svg
										className="w-6 h-6 text-green-600"
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
									<span>Set Availability</span>
								</button>
								<button
									onClick={() =>
										router.push("/dashboard/interviewer/special-needs")
									}
									className="flex items-center p-4 space-x-2 rounded-lg border hover:bg-gray-50"
								>
									<svg
										className="w-6 h-6 text-teal-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
									<span>Special Needs Support</span>
								</button>
							</div>
						</div>
					</div>

					<div className="lg:col-span-1">
						<ProfileInfoCard
							profile={{
								role: "interviewer",
								name:
									profile?.firstName && profile?.lastName
										? `${profile.firstName} ${profile.lastName}`
										: session?.user?.name || "",
								email: session?.user?.email || "",
								phone: profile?.phone || "",
								company: profile?.company || "",
								position: profile?.position || "",
								expertise: profile?.expertise || [],
								yearsOfExperience: profile?.experience || 0,
								skills: profile?.skills || [],
								experience: profile?.workExperience || [],
								education: profile?.education || [],
								languages: profile?.languages || [],
								certifications: profile?.certifications || [],
							}}
							isLoading={isLoading}
						/>

						{/* Interview Tips */}
						<div className="p-6 mt-6 bg-white rounded-xl shadow-lg border-2 border-blue-900">
							<h2 className="mb-4 text-xl font-semibold text-gray-900">
								Interview Tips
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
										Prepare questions based on the candidate's resume and
										experience
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
										Create a comfortable environment for the candidate
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
										Provide constructive feedback after the interview
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
