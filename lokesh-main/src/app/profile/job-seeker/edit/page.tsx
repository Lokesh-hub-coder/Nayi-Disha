"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EditJobSeekerProfile() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
	});

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		} else if (session?.user) {
			fetchProfile();
		}
	}, [status, session, router]);

	const fetchProfile = async () => {
		try {
			const response = await fetch("/api/profile/job-seeker");
			if (response.ok) {
				const data = await response.json();
				setFormData({
					...data,
				});
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/profile/job-seeker", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || "Failed to update profile");
			}

			// Redirect to dashboard on success
			router.push("/dashboard/job-seeker");
			router.refresh(); // Refresh the page to show updated data
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (status === "loading") {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-extrabold text-gray-900">
						Edit Job Seeker Profile
					</h2>
					<button
						onClick={() => router.push("/profile/job-seeker")}
						className="text-indigo-600 hover:text-indigo-500"
					>
						Cancel
					</button>
				</div>

				{error && (
					<div className="mb-4 p-4 bg-red-50 border border-red-400 rounded-md">
						<p className="text-red-700">{error}</p>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								First Name
							</label>
							<input
								type="text"
								required
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								value={formData.firstName}
								onChange={(e) =>
									setFormData({ ...formData, firstName: e.target.value })
								}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Last Name
							</label>
							<input
								type="text"
								required
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								value={formData.lastName}
								onChange={(e) =>
									setFormData({ ...formData, lastName: e.target.value })
								}
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Phone
						</label>
						<input
							type="tel"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							value={formData.phone}
							onChange={(e) =>
								setFormData({ ...formData, phone: e.target.value })
							}
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isSubmitting}
							className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
								isSubmitting ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							{isSubmitting ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
