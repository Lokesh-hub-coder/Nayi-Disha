"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Feedback() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [feedback, setFeedback] = useState({
		candidateName: "",
		interviewDate: "",
		technicalSkills: 0,
		communicationSkills: 0,
		problemSolving: 0,
		adaptability: 0,
		overallRating: 0,
		strengths: "",
		areasForImprovement: "",
		additionalNotes: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFeedback((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleRatingChange = (name: string, value: number) => {
		setFeedback((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle feedback submission
		console.log("Feedback submitted:", feedback);
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
						Submit Interview Feedback
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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Candidate Name
								</label>
								<input
									type="text"
									name="candidateName"
									value={feedback.candidateName}
									onChange={handleInputChange}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Interview Date
								</label>
								<input
									type="date"
									name="interviewDate"
									value={feedback.interviewDate}
									onChange={handleInputChange}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
									required
								/>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-900">Ratings</h3>
							{[
								{ name: "technicalSkills", label: "Technical Skills" },
								{ name: "communicationSkills", label: "Communication Skills" },
								{ name: "problemSolving", label: "Problem Solving" },
								{ name: "adaptability", label: "Adaptability" },
								{ name: "overallRating", label: "Overall Rating" },
							].map((rating) => (
								<div key={rating.name} className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">
										{rating.label}
									</label>
									<div className="flex space-x-2">
										{[1, 2, 3, 4, 5].map((value) => (
											<button
												key={value}
												type="button"
												onClick={() => handleRatingChange(rating.name, value)}
												className={`w-8 h-8 rounded-full flex items-center justify-center ${
													(feedback[
														rating.name as keyof typeof feedback
													] as number) >= value
														? "bg-purple-600 text-white"
														: "bg-gray-200 text-gray-600"
												}`}
											>
												{value}
											</button>
										))}
									</div>
								</div>
							))}
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Strengths
								</label>
								<textarea
									name="strengths"
									value={feedback.strengths}
									onChange={handleInputChange}
									rows={3}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Areas for Improvement
								</label>
								<textarea
									name="areasForImprovement"
									value={feedback.areasForImprovement}
									onChange={handleInputChange}
									rows={3}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Additional Notes
								</label>
								<textarea
									name="additionalNotes"
									value={feedback.additionalNotes}
									onChange={handleInputChange}
									rows={3}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
								/>
							</div>
						</div>

						<div className="flex justify-end">
							<button
								type="submit"
								className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
							>
								Submit Feedback
							</button>
						</div>
					</form>
				</div>

				<div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Feedback Guidelines
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
								Be specific and provide examples when discussing strengths and
								areas for improvement.
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
								Consider the candidate's background and any special needs when
								providing feedback.
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
								Focus on constructive feedback that can help the candidate grow
								and improve.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
