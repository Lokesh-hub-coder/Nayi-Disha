"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InterviewRequest } from "@/lib/mockData";
import { interviewRequests } from "@/lib/mockData";
import Modal from "@/components/Modal";

export default function InterviewRequests() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [requests, setRequests] = useState<InterviewRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showAcceptModal, setShowAcceptModal] = useState(false);
	const [selectedRequest, setSelectedRequest] =
		useState<InterviewRequest | null>(null);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		} else if (status === "authenticated") {
			// Use mock data for interview requests
			setRequests(
				interviewRequests.filter((request) => request.status === "pending")
			);
			setIsLoading(false);
		}
	}, [status, router]);

	const handleAcceptRequest = (request: InterviewRequest) => {
		setSelectedRequest(request);
		setShowAcceptModal(true);
	};

	const confirmAcceptRequest = () => {
		if (selectedRequest) {
			// In a real app, you would make an API call here
			// For now, we'll just update the local state
			setRequests(requests.filter((req) => req.id !== selectedRequest.id));
			setShowAcceptModal(false);
			alert("Interview request accepted successfully!");
		}
	};

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
							Interview Requests
						</h1>
						<p className="mt-2 text-gray-600">
							Review and manage interview requests from job seekers
						</p>
					</div>
					<button
						onClick={() => router.back()}
						className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
					>
						Back to Dashboard
					</button>
				</div>

				<div className="space-y-6">
					{requests.length > 0 ? (
						requests.map((request) => (
							<div
								key={request.id}
								className="bg-white rounded-xl shadow-lg p-6"
							>
								<div className="flex justify-between items-start">
									<div>
										<h3 className="text-xl font-semibold text-gray-900">
											{request.jobSeekerName}
										</h3>
										<p className="text-gray-600">
											{request.jobTitle} at {request.company}
										</p>
										<p className="text-sm text-gray-500">
											{request.jobSeekerEmail}
										</p>
									</div>
									<button
										onClick={() => handleAcceptRequest(request)}
										className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
									>
										Accept Request
									</button>
								</div>
								<div className="mt-6">
									<h4 className="text-sm font-medium text-gray-900 mb-3">
										Preferred Time Slots:
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
										{request.preferredTimeSlots.map((slot, index) => (
											<div key={index} className="bg-gray-50 p-3 rounded-lg">
												<p className="text-sm font-medium text-gray-900">
													{slot.date}
												</p>
												<p className="text-sm text-gray-600">{slot.time}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						))
					) : (
						<div className="bg-white rounded-xl shadow-lg p-8 text-center">
							<p className="text-gray-600">No pending interview requests</p>
						</div>
					)}
				</div>
			</div>

			{/* Accept Request Modal */}
			<Modal
				isOpen={showAcceptModal}
				onClose={() => setShowAcceptModal(false)}
				title="Accept Interview Request"
			>
				<div className="space-y-4">
					<p>Are you sure you want to accept this interview request?</p>
					{selectedRequest && (
						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="font-medium">{selectedRequest.jobSeekerName}</p>
							<p className="text-sm text-gray-600">
								{selectedRequest.jobTitle} at {selectedRequest.company}
							</p>
							<div className="mt-3">
								<p className="text-sm font-medium text-gray-900">
									Preferred Time Slots:
								</p>
								<div className="mt-2 space-y-2">
									{selectedRequest.preferredTimeSlots.map((slot, index) => (
										<p key={index} className="text-sm text-gray-600">
											{slot.date} at {slot.time}
										</p>
									))}
								</div>
							</div>
						</div>
					)}
					<div className="flex justify-end space-x-4">
						<button
							onClick={() => setShowAcceptModal(false)}
							className="px-4 py-2 text-gray-600 hover:text-gray-800"
						>
							Cancel
						</button>
						<button
							onClick={confirmAcceptRequest}
							className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
						>
							Accept Request
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
