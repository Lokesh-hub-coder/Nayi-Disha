"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface TimeSlot {
	_id: string;
	userId: string;
	interviewerId: string | null;
	skills: string[];
	jobRole: string;
	interviewDone: boolean;
	timeSlot: string;
	createdAt: string;
}

const TIME_SLOTS = [
	"1:00 PM – 3:00 PM",
	"3:00 PM – 6:00 PM",
	"6:00 PM – 9:00 PM",
	"9:00 PM – 12:00 AM",
];

export default function InterviewSchedule() {
	const { data: session } = useSession();
	const userId = session?.user?.id;

	const [scheduledInterview, setScheduledInterview] = useState<TimeSlot | null>(
		null
	);
	const [showScheduleForm, setShowScheduleForm] = useState(false);
	const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
	const [jobRole, setJobRole] = useState("");
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState(""); // <-- For success messages
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (userId) {
			fetchScheduledInterview();
		}
	}, [userId]);

	const fetchScheduledInterview = async () => {
		setLoading(true);
		setMessage("");
		setError(null);
		try {
			const response = await axios.get<TimeSlot>("/api/interview/schedule");
			setScheduledInterview(response.data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Failed to fetch scheduled interviews");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleCancelInterview = async () => {
		setLoading(true);
		setMessage("");
		setError(null);
		try {
			await axios.delete("/api/interview/schedule");
			setScheduledInterview(null);
			setMessage("Interview is canceled; now schedule interview.");
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Failed to cancel interview");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleRescheduleClick = () => {
		if (scheduledInterview) {
			setShowScheduleForm(true);
			setSelectedTimeSlot(scheduledInterview.timeSlot);
			setJobRole(scheduledInterview.jobRole);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			let response;
			if (scheduledInterview) {
				response = await axios.put<TimeSlot>("/api/interview/schedule", {
					timeSlot: selectedTimeSlot,
					jobRole,
				});
				setMessage("Interview rescheduled successfully.");
			} else {
				response = await axios.post<TimeSlot>("/api/interview/schedule", {
					timeSlot: selectedTimeSlot,
					jobRole,
				});
				setMessage("Interview scheduled successfully.");
			}

			setScheduledInterview(response.data);
			setShowScheduleForm(false);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Failed to reschedule interview");
			}
		}
	};

	if (loading) {
		return <div className="text-center">Loading...</div>;
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			{message && <div className="text-green-500 mb-4">{message}</div>}
			{error && <div className="text-red-500 mb-4">{error}</div>}

			{scheduledInterview && !showScheduleForm ? (
				<>
					<h2 className="text-2xl font-bold mb-4">Scheduled Interview</h2>
					<div className="space-y-2">
						<p>
							<span className="font-semibold">Job Role:</span>{" "}
							{scheduledInterview.jobRole}
						</p>
						<p>
							<span className="font-semibold">Time Slot:</span>{" "}
							{scheduledInterview.timeSlot}
						</p>
						<p>
							<span className="font-semibold">Status:</span>{" "}
							{scheduledInterview.interviewDone ? (
								<span className="text-green-600 font-medium">Completed</span>
							) : scheduledInterview.interviewerId ? (
								<span className="text-blue-600 font-medium">
									Accepted by Interviewer
								</span>
							) : (
								<span className="text-yellow-600 font-medium">
									Pending Interviewer Acceptance
								</span>
							)}
						</p>
						{scheduledInterview.interviewerId && (
							<p className="text-sm text-gray-500">
								An interviewer has accepted your request. You will receive
								further details soon.
							</p>
						)}
					</div>
					{!scheduledInterview.interviewDone &&
						!scheduledInterview.interviewerId && (
							<div className="mt-4 flex space-x-4">
								<button
									onClick={handleRescheduleClick}
									className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
								>
									Reschedule Interview
								</button>
								<button
									onClick={handleCancelInterview}
									className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
								>
									Cancel Interview
								</button>
							</div>
						)}
				</>
			) : (
				<div className="text-center">
					<button
						onClick={() => setShowScheduleForm(true)}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
					>
						Schedule Interview
					</button>
				</div>
			)}

			{showScheduleForm && (
				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Job Role
						</label>
						<input
							type="text"
							value={jobRole}
							onChange={(e) => setJobRole(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Select Time Slot
						</label>
						<select
							value={selectedTimeSlot}
							onChange={(e) => setSelectedTimeSlot(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							required
						>
							<option value="">Select a time slot</option>
							{TIME_SLOTS.map((slot) => (
								<option key={slot} value={slot}>
									{slot}
								</option>
							))}
						</select>
					</div>
					<div className="flex space-x-4">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
						>
							{scheduledInterview ? "Confirm Reschedule" : "Confirm Schedule"}
						</button>
						<button
							type="button"
							onClick={() => setShowScheduleForm(false)}
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
						>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
