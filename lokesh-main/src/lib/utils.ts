import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { users, jobs, companies, interviews, profiles } from "./mockData";
import type { User, Job, Company, Interview, Profile } from "./mockData";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// User related utilities
export const findUserByEmail = (email: string): User | undefined => {
	return users.find((user) => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
	return users.find((user) => user.id === id);
};

// Job related utilities
export const getJobs = (filters?: {
	companyId?: string;
	recruiterId?: string;
	status?: "open" | "closed";
}): Job[] => {
	let filteredJobs = [...jobs];

	if (filters?.companyId) {
		filteredJobs = filteredJobs.filter(
			(job) => job.companyId === filters.companyId
		);
	}
	if (filters?.recruiterId) {
		filteredJobs = filteredJobs.filter(
			(job) => job.recruiterId === filters.recruiterId
		);
	}
	if (filters?.status) {
		filteredJobs = filteredJobs.filter((job) => job.status === filters.status);
	}

	return filteredJobs;
};

export const findJobById = (id: string): Job | undefined => {
	return jobs.find((job) => job.id === id);
};

// Company related utilities
export const getCompanies = (recruiterId?: string): Company[] => {
	if (recruiterId) {
		return companies.filter((company) => company.recruiterId === recruiterId);
	}
	return companies;
};

export const findCompanyById = (id: string): Company | undefined => {
	return companies.find((company) => company.id === id);
};

// Interview related utilities
export const getInterviews = (filters: {
	candidateId?: string;
	recruiterId?: string;
	jobId?: string;
	status?: "scheduled" | "completed" | "cancelled";
}): Interview[] => {
	let filteredInterviews = [...interviews];

	if (filters.candidateId) {
		filteredInterviews = filteredInterviews.filter(
			(interview) => interview.candidateId === filters.candidateId
		);
	}
	if (filters.recruiterId) {
		filteredInterviews = filteredInterviews.filter(
			(interview) => interview.recruiterId === filters.recruiterId
		);
	}
	if (filters.jobId) {
		filteredInterviews = filteredInterviews.filter(
			(interview) => interview.jobId === filters.jobId
		);
	}
	if (filters.status) {
		filteredInterviews = filteredInterviews.filter(
			(interview) => interview.status === filters.status
		);
	}

	return filteredInterviews;
};

// Profile related utilities
export const findProfileByUserId = (userId: string): Profile | undefined => {
	return profiles[userId];
};

// Date formatting utility
export const formatDate = (date: string): string => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
