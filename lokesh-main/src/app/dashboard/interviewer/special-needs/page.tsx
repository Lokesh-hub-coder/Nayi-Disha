"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AccommodationCategory {
	screenReader?: boolean;
	highContrast?: boolean;
	largeText?: boolean;
	brailleMaterials?: boolean;
	signLanguage?: boolean;
	captioning?: boolean;
	writtenCommunication?: boolean;
	assistiveDevices?: boolean;
	extraTime?: boolean;
	breaks?: boolean;
	quietEnvironment?: boolean;
	assistiveTechnology?: boolean;
}

interface AccommodationsState {
	visualImpairment: AccommodationCategory;
	hearingImpairment: AccommodationCategory;
	cognitiveImpairment: AccommodationCategory;
	physicalImpairment: AccommodationCategory;
}

export default function SpecialNeeds() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [accommodations, setAccommodations] = useState<AccommodationsState>({
		visualImpairment: {
			screenReader: false,
			highContrast: false,
			largeText: false,
			brailleMaterials: false,
		},
		hearingImpairment: {
			signLanguage: false,
			captioning: false,
			writtenCommunication: false,
			assistiveDevices: false,
		},
		cognitiveImpairment: {
			extraTime: false,
			breaks: false,
			quietEnvironment: false,
			assistiveTechnology: false,
		},
		physicalImpairment: {
			extraTime: false,
			breaks: false,
			quietEnvironment: false,
			assistiveTechnology: false,
		},
	});

	const handleCheckboxChange = (
		category: keyof AccommodationsState,
		accommodation: keyof AccommodationCategory
	) => {
		setAccommodations((prev) => ({
			...prev,
			[category]: {
				...prev[category],
				[accommodation]: !prev[category][accommodation],
			},
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle accommodations submission
		console.log("Accommodations submitted:", accommodations);
	};

	if (status === "loading") {
		return (
			<div className="min-h-screen px-4 py-12 bg-gradient-to-br from-purple-50 to-teal-50 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="animate-pulse">
						<div className="w-1/4 h-8 mb-8 bg-gray-200 rounded"></div>
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
		<div className="min-h-screen px-4 py-12 bg-gradient-to-br from-purple-50 to-teal-50 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Special Needs Support
					</h1>
					<button
						onClick={() => router.push("/dashboard/interviewer")}
						className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600"
					>
						Back to Dashboard
					</button>
				</div>

				<div className="p-6 bg-white border-2 border-blue-900 shadow-lg rounded-xl">
					<form onSubmit={handleSubmit} className="space-y-8">
						{Object.entries(accommodations).map(([category, options]) => (
							<div key={category} className="space-y-4">
								<h3 className="text-lg font-medium text-gray-900">
									{category
										.split(/(?=[A-Z])/)
										.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1)
										)
										.join(" ")}
								</h3>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									{Object.entries(options as AccommodationCategory).map(
										([option, isSelected]: [string, boolean]) => (
											<div key={option} className="flex items-center">
												<input
													type="checkbox"
													id={`${category}-${option}`}
													checked={isSelected}
													onChange={() =>
														handleCheckboxChange(
															category as keyof AccommodationsState,
															option as keyof AccommodationCategory
														)
													}
													className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
												/>
												<label
													htmlFor={`${category}-${option}`}
													className="ml-3 text-sm text-gray-700"
												>
													{option
														.split(/(?=[A-Z])/)
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.slice(1)
														)
														.join(" ")}
												</label>
											</div>
										)
									)}
								</div>
							</div>
						))}

						<div className="flex justify-end">
							<button
								type="submit"
								className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600"
							>
								Save Accommodations
							</button>
						</div>
					</form>
				</div>

				<div className="p-6 mt-8 bg-white border-2 border-blue-900 shadow-lg rounded-xl">
					<h2 className="mb-4 text-xl font-semibold text-gray-900">
						Accommodation Guidelines
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
								Ensure all selected accommodations are available and properly
								set up before the interview.
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
								Be prepared to provide alternative accommodations if the
								selected ones are not suitable for the candidate.
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
								Communicate with the candidate beforehand to confirm their
								specific needs and preferences.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
