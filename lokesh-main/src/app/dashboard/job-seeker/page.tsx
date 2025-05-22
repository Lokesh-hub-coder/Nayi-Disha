"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import { JobApplication, JobSeekerProfile } from "@/lib/mockData";
import { profiles } from "@/lib/mockData";

export default function JobSeekerDashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [applications, setApplications] = useState<JobApplication[]>([]);
	const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		} else if (session?.user) {
			// Fetch profile data
			const userProfile = profiles[session.user.id] as JobSeekerProfile;
			if (!userProfile) {
				// If profile doesn't exist, create a default one
				const defaultProfile: JobSeekerProfile = {
					userId: session.user.id,
					firstName: session.user.name?.split(" ")[0] || "",
					lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
					phone: "",
					skills: [],
					experience: [],
					education: [],
					resume: "",
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				};
				profiles[session.user.id] = defaultProfile;
				setProfile(defaultProfile);
			} else {
				setProfile(userProfile);
			}

			// Fetch applications (mock data)
			const userApplications: JobApplication[] = [
				{
					id: "1",
					jobId: "1",
					userId: session.user.id,
					status: "pending" as const,
					appliedAt: "2024-02-20",
					job: {
						title: "Frontend Developer",
						company: "Tech Corp",
						location: "Remote",
						type: "full-time",
						salary: "$80,000 - $100,000",
						description: "Looking for a skilled frontend developer...",
					},
				},
				{
					id: "2",
					jobId: "2",
					userId: session.user.id,
					status: "interview" as const,
					appliedAt: "2024-02-19",
					job: {
						title: "Backend Developer",
						company: "Dev Solutions",
						location: "New York",
						type: "full-time",
						salary: "$90,000 - $110,000",
						description: "Seeking an experienced backend developer...",
					},
					interview: {
						date: "2024-03-01",
						time: "14:00",
						type: "online",
						status: "scheduled",
					},
				},
			];
			setApplications(userApplications);
			setIsLoading(false);
		}
	}, [status, session, router]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "reviewed":
				return "bg-blue-100 text-blue-800";
			case "interview":
				return "bg-green-100 text-green-800";
			case "rejected":
				return "bg-red-100 text-red-800";
			case "accepted":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
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
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Welcome back, {profile?.firstName || "Job Seeker"}!
						</h1>
						<p className="mt-2 text-gray-600 dark:text-gray-300">
							Manage your profile and job applications
						</p>
					</div>
					<button
						onClick={() => router.push("/api/auth/signout")}
						className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg transition-colors hover:bg-red-600"
					>
						Logout
					</button>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2">
						<section className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-semibold text-gray-900">
									Recent Job Applications
								</h2>
								<button
									onClick={() => router.push("/jobs")}
									className="text-purple-600 hover:text-purple-700 font-medium"
								>
									Browse Jobs
								</button>
							</div>
							<div className="space-y-4">
								{/* Data Entry Operator */}
								<div className="border-2 border-blue-900 rounded-lg p-4 hover:shadow-md transition-shadow">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-lg font-medium text-gray-900">
												Data Entry Operator
											</h3>
											<p className="text-gray-600">Nayi Disha Foundation</p>
											<p className="text-gray-500 text-sm">
												Mumbai, Maharashtra
											</p>
										</div>
										<span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
											Interview
										</span>
									</div>
									<div className="mt-4 text-sm text-gray-600">
										<p>Interview scheduled for 2024-03-15 at 14:00</p>
										<p>Type: Online (with sign language interpreter)</p>
										<p className="text-gray-500">Applied on 3/1/2024</p>
									</div>
									<button
										onClick={() => router.push("/jobs/1")}
										className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
									>
										View Details
									</button>
								</div>

								{/* Customer Support Associate */}
								<div className="border-2 border-blue-900 rounded-lg p-4 hover:shadow-md transition-shadow">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-lg font-medium text-gray-900">
												Customer Support Associate
											</h3>
											<p className="text-gray-600">Rural Empowerment Trust</p>
											<p className="text-gray-500 text-sm">
												Remote (Work from Home)
											</p>
										</div>
										<span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
											Reviewed
										</span>
									</div>
									<div className="mt-4 text-sm text-gray-600">
										<p>Application under review</p>
										<p>
											Special accommodations: Written communication preferred
										</p>
										<p className="text-gray-500">Applied on 2/28/2024</p>
									</div>
									<button
										onClick={() => router.push("/jobs/2")}
										className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
									>
										View Details
									</button>
								</div>

								{/* Content Writer */}
								<div className="border-2 border-blue-900 rounded-lg p-4 hover:shadow-md transition-shadow">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-lg font-medium text-gray-900">
												Content Writer
											</h3>
											<p className="text-gray-600">
												Digital Inclusion Initiative
											</p>
											<p className="text-gray-500 text-sm">
												Remote (Work from Home)
											</p>
										</div>
										<span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
											New
										</span>
									</div>
									<div className="mt-4 text-sm text-gray-600">
										<p>Application received</p>
										<p>
											Special accommodations: Screen reader compatible workspace
										</p>
										<p className="text-gray-500">Applied on 2/25/2024</p>
									</div>
									<button
										onClick={() => router.push("/jobs/3")}
										className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
									>
										View Details
									</button>
								</div>
							</div>
						</section>

						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] p-6 border-2 border-blue-900">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
									Upcoming Interviews
								</h2>
								<button
									onClick={() => router.push("/interviews")}
									className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-teal-500 rounded-lg shadow-sm hover-gradient"
								>
									Schedule Interview
								</button>
							</div>
							<div className="space-y-4">
								{/* Data Entry Operator Interview */}
								<div className="p-4 rounded-lg border-2 border-blue-900 transition-shadow hover:shadow-md bg-blue-50">
									<h3 className="text-lg font-medium text-gray-900">
										Data Entry Operator
									</h3>
									<p className="text-gray-600">Nayi Disha Foundation</p>
									<div className="mt-2 space-y-1">
										<p className="text-sm text-gray-700">
											<span className="font-medium">Date:</span> 2024-03-15
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Time:</span> 14:00 IST
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Type:</span> Online (with
											sign language interpreter)
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Platform:</span> Google Meet
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Special Instructions:</span>{" "}
											Please ensure your internet connection is stable. The
											interpreter will be available throughout the interview.
										</p>
									</div>
								</div>

								{/* Customer Support Interview */}
								<div className="p-4 rounded-lg border-2 border-blue-900 transition-shadow hover:shadow-md bg-green-50">
									<h3 className="text-lg font-medium text-gray-900">
										Customer Support Associate
									</h3>
									<p className="text-gray-600">Rural Empowerment Trust</p>
									<div className="mt-2 space-y-1">
										<p className="text-sm text-gray-700">
											<span className="font-medium">Date:</span> 2024-03-20
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Time:</span> 11:00 IST
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Type:</span> In-person
											(Wheelchair accessible)
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Location:</span> Rural
											Empowerment Trust Office, Govandi, Mumbai
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Special Instructions:</span>{" "}
											Please bring your assistive devices. The office is fully
											accessible with ramps and elevators.
										</p>
									</div>
								</div>

								{/* Content Writer Interview */}
								<div className="p-4 rounded-lg border-2 border-blue-900 transition-shadow hover:shadow-md bg-purple-50">
									<h3 className="text-lg font-medium text-gray-900">
										Content Writer
									</h3>
									<p className="text-gray-600">Digital Inclusion Initiative</p>
									<div className="mt-2 space-y-1">
										<p className="text-sm text-gray-700">
											<span className="font-medium">Date:</span> 2024-03-25
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Time:</span> 15:30 IST
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Type:</span> Online (Screen
											reader compatible)
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Platform:</span> Microsoft
											Teams
										</p>
										<p className="text-sm text-gray-700">
											<span className="font-medium">Special Instructions:</span>{" "}
											The platform is fully accessible with screen readers.
											Please test your setup before the interview.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01] p-6 border-2 border-blue-900">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
									Your Profile
								</h2>
								<button
									onClick={() => router.push("/profile/job-seeker/edit")}
									className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
								>
									Edit Profile
								</button>
							</div>
							{profile ? (
								<div className="space-y-4">
									<div>
										<h3 className="mb-2 text-lg font-semibold text-gray-800">
											Personal Information
										</h3>
										<div className="grid grid-cols-1 gap-2">
											<p className="text-gray-600 dark:text-gray-300">
												<span className="font-medium">Name:</span>{" "}
												{profile.firstName} {profile.lastName}
											</p>
											<p className="text-gray-600 dark:text-gray-300">
												<span className="font-medium">Email:</span>{" "}
												{session?.user?.email}
											</p>
											<p className="text-gray-600 dark:text-gray-300">
												<span className="font-medium">Phone:</span>{" "}
												{profile.phone}
											</p>
										</div>
									</div>

									{profile.skills && profile.skills.length > 0 && (
										<div>
											<h3 className="mb-2 text-lg font-semibold text-gray-800">
												Skills
											</h3>
											<div className="flex flex-wrap gap-2">
												{profile.skills.map((skill, index) => (
													<span
														key={index}
														className="px-3 py-1 text-sm text-indigo-800 bg-indigo-100 rounded-full"
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									)}

									{profile.experience && profile.experience.length > 0 && (
										<div>
											<h3 className="mb-2 text-lg font-semibold text-gray-800">
												Experience
											</h3>
											<div className="space-y-3">
												{profile.experience.map((exp, index) => (
													<div
														key={index}
														className="pl-4 border-l-4 border-indigo-200"
													>
														<p className="font-medium">{exp.position}</p>
														<p className="text-gray-600 dark:text-gray-300">
															{exp.company}
														</p>
														<p className="text-sm text-gray-500 dark:text-gray-400">
															{exp.startDate} - {exp.endDate}
														</p>
														{exp.description && (
															<p className="mt-1 text-sm text-gray-700">
																{exp.description}
															</p>
														)}
													</div>
												))}
											</div>
										</div>
									)}

									{profile.education && profile.education.length > 0 && (
										<div>
											<h3 className="mb-2 text-lg font-semibold text-gray-800">
												Education
											</h3>
											<div className="space-y-3">
												{profile.education.map((edu, index) => (
													<div
														key={index}
														className="pl-4 border-l-4 border-indigo-200"
													>
														<p className="font-medium">{edu.degree}</p>
														<p className="text-gray-600 dark:text-gray-300">
															{edu.institution}
														</p>
														<p className="text-sm text-gray-500 dark:text-gray-400">
															{edu.startDate} - {edu.endDate}
														</p>
														{edu.field && (
															<p className="mt-1 text-sm text-gray-700">
																{edu.field}
															</p>
														)}
													</div>
												))}
											</div>
										</div>
									)}

									{profile.resume && (
										<div>
											<h3 className="mb-2 text-lg font-semibold text-gray-800">
												Resume
											</h3>
											<a
												href={profile.resume}
												target="_blank"
												rel="noopener noreferrer"
												className="text-indigo-600 hover:text-indigo-500"
											>
												View Resume
											</a>
										</div>
									)}
								</div>
							) : (
								<div className="py-8 text-center">
									<p className="text-gray-600 dark:text-gray-300">
										No profile information found
									</p>
									<button
										onClick={() => router.push("/profile/job-seeker/edit")}
										className="px-4 py-2 mt-4 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-teal-500 rounded-lg shadow-sm hover-gradient"
									>
										Create Profile
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
