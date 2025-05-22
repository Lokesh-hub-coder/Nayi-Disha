"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { jobService } from "@/lib/services";
import type { Job } from "@/lib/types";

export default function JobsPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [jobs, setJobs] = useState<Job[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterLocation, setFilterLocation] = useState("");

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const jobsList = await jobService.listJobs({ status: "open" });
				setJobs(jobsList);
			} catch (error) {
				console.error("Error fetching jobs:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchJobs();
	}, []);

	const filteredJobs = jobs.filter((job) => {
		const matchesSearch =
			job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.description.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesLocation = !filterLocation || job.location.includes(filterLocation);

		return matchesSearch && matchesLocation;
	});

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="animate-pulse">
						<div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200"
								>
									<div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
									<div className="h-4 bg-gray-200 rounded w-1/3"></div>
								</div>
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
					<h1 className="text-3xl font-bold text-gray-900">Available Jobs</h1>
					<button
						onClick={() => router.push("/dashboard/job-seeker")}
						className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
					>
						Back to Dashboard
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900 mb-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="search"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Search Jobs
							</label>
							<input
								type="text"
								id="search"
								placeholder="Search by title, company, or keywords"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							/>
						</div>
						<div>
							<label
								htmlFor="location"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Location
							</label>
							<input
								type="text"
								id="location"
								placeholder="Filter by location"
								value={filterLocation}
								onChange={(e) => setFilterLocation(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							/>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredJobs.map((job) => (
						<div
							key={job.id}
							className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] p-6 border-2 border-blue-900"
						>
							<h2 className="text-xl font-semibold text-gray-900 mb-2">
								{job.title}
							</h2>
							<p className="text-gray-600 mb-1">{job.company}</p>
							<p className="text-gray-500 text-sm mb-4">{job.location}</p>
							<div className="space-y-2 mb-4">
								<p className="text-sm text-gray-600">
									<span className="font-medium">Type:</span> {job.type}
								</p>
								<p className="text-sm text-gray-600">
									<span className="font-medium">Salary:</span> {job.salary}
								</p>
							</div>
							<p className="text-sm text-gray-600 mb-4 line-clamp-3">
								{job.description}
							</p>
							<button
								onClick={() => router.push(`/jobs/${job.id}`)}
								className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
							>
								View Details
							</button>
						</div>
					))}

					{filteredJobs.length === 0 && (
						<div className="col-span-full text-center py-12">
							<p className="text-gray-600">No jobs found matching your criteria</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
} 