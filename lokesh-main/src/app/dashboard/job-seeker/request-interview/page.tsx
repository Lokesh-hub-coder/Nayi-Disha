/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const TIME_SLOTS = [
	"1:00 PM – 3:00 PM",
	"3:00 PM – 6:00 PM",
	"6:00 PM – 9:00 PM",
	"9:00 PM – 12:00 AM",
];

export default function RequestInterview() {
	const { data: session } = useSession();
	const router = useRouter();
	const [formData, setFormData] = useState({
		jobRole: "",
		skills: "",
		timeSlot: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const skillsArray = formData.skills
				.split(",")
				.map((skill) => skill.trim());

			await axios.post("/api/interview/request", {
				userId: session?.user?.id,
				skills: skillsArray,
				jobRole: formData.jobRole,
				timeSlot: formData.timeSlot,
			});

			router.push("/dashboard/job-seeker");
		} catch (err: unknown) {
			if (err instanceof Error && 'isAxiosError' in err) {
				const axiosError = err as any;
				setError(axiosError.response?.data?.error || "Failed to submit request");
			} else {
				setError("Failed to submit request");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white shadow rounded-lg p-6">
					<h1 className="text-2xl font-bold text-gray-900 mb-6">
						Request Interview
					</h1>

					{error && (
						<div className="mb-4 bg-red-50 p-4 rounded-md">
							<p className="text-sm text-red-700">{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="jobRole"
								className="block text-sm font-medium text-gray-700"
							>
								Job Role
							</label>
							<input
								type="text"
								id="jobRole"
								value={formData.jobRole}
								onChange={(e) =>
									setFormData({ ...formData, jobRole: e.target.value })
								}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="skills"
								className="block text-sm font-medium text-gray-700"
							>
								Skills (comma-separated)
							</label>
							<input
								type="text"
								id="skills"
								value={formData.skills}
								onChange={(e) =>
									setFormData({ ...formData, skills: e.target.value })
								}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								required
							/>
							<p className="mt-1 text-sm text-gray-500">
								Example: React, TypeScript, Node.js
							</p>
						</div>

						<div>
							<label
								htmlFor="timeSlot"
								className="block text-sm font-medium text-gray-700"
							>
								Preferred Time Slot
							</label>
							<select
								id="timeSlot"
								value={formData.timeSlot}
								onChange={(e) =>
									setFormData({ ...formData, timeSlot: e.target.value })
								}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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

						<div className="flex justify-end space-x-4">
							<button
								type="button"
								onClick={() => router.back()}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={loading}
								className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
							>
								{loading ? "Submitting..." : "Submit Request"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
