"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { jobService } from "@/lib/services";
import type { Job, Company } from "@/lib/types";

export default function JobDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [job, setJob] = useState<Job | null>(null);
	const [company, setCompany] = useState<Company | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				const { job: jobData, company: companyData } = await jobService.getJobDetails(
					params.id
				);
				setJob(jobData);
				setCompany(companyData);
			} catch (error) {
				console.error("Error fetching job details:", error);
				setError("Failed to load job details");
			} finally {
				setIsLoading(false);
			}
		};

		fetchJobDetails();
	}, [params.id]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<div className="animate-pulse">
						<div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
						<div className="space-y-4">
							<div className="h-4 bg-gray-200 rounded w-1/4"></div>
							<div className="h-4 bg-gray-200 rounded w-1/3"></div>
							<div className="h-4 bg-gray-200 rounded w-3/4"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error || !job || !company) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						{error || "Job not found"}
					</h1>
					<button
						onClick={() => router.push("/jobs")}
						className="text-purple-600 hover:text-purple-700 font-medium"
					>
						Back to Jobs
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-900">
					<div className="p-6">
						<div className="flex justify-between items-start mb-6">
							<div>
								<h1 className="text-3xl font-bold text-gray-900 mb-2">
									{job.title}
								</h1>
								<p className="text-xl text-gray-600">{company.name}</p>
							</div>
							<button
								onClick={() => router.push("/jobs")}
								className="text-purple-600 hover:text-purple-700 font-medium"
							>
								Back to Jobs
							</button>
						</div>

						<div className="grid grid-cols-2 gap-4 mb-6">
							<div>
								<p className="text-sm text-gray-600">Location</p>
								<p className="font-medium">{job.location}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Job Type</p>
								<p className="font-medium">{job.type}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Salary</p>
								<p className="font-medium">{job.salary}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">Posted</p>
								<p className="font-medium">
									{new Date(job.postedAt).toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-3">
								Job Description
							</h2>
							<div className="prose prose-purple max-w-none">
								<p className="text-gray-600 whitespace-pre-line">
									{job.description}
								</p>
							</div>
						</div>

						<div className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-3">
								Requirements
							</h2>
							<ul className="list-disc list-inside space-y-2 text-gray-600">
								{job.requirements.map((req, index) => (
									<li key={index}>{req}</li>
								))}
							</ul>
						</div>

						<div className="mb-6">
							<h2 className="text-xl font-semibold text-gray-900 mb-3">
								About {company.name}
							</h2>
							<p className="text-gray-600">{company.description}</p>
						</div>

						<div className="flex justify-end">
							<button
								onClick={() => {
									// Handle apply action
									console.log("Applying for job:", job.id);
								}}
								className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
							>
								Apply Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 