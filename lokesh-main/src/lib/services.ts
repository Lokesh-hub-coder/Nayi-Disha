import {
	findUserByEmail,
	findUserById,
	getJobs,
	findJobById,
	getCompanies,
	findCompanyById,
	getInterviews,
	findProfileByUserId,
} from "./utils";
import type { User, Job, Company, Interview, Profile } from "./mockData";

// Auth Service
export const authService = {
	async login(email: string, password: string): Promise<User> {
		const user = findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}
		if (user.password !== password) {
			// In real app, use proper password comparison
			throw new Error("Invalid password");
		}
		return user;
	},

	async getUserProfile(
		userId: string
	): Promise<{ user: User; profile: Profile }> {
		const user = findUserById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		const profile = findProfileByUserId(userId);
		if (!profile) {
			throw new Error("Profile not found");
		}
		return { user, profile };
	},
};

// Job Service
export const jobService = {
	async listJobs(filters?: {
		companyId?: string;
		recruiterId?: string;
		status?: "open" | "closed";
	}): Promise<Job[]> {
		return getJobs(filters);
	},

	async getJobDetails(jobId: string): Promise<{ job: Job; company: Company }> {
		const job = findJobById(jobId);
		if (!job) {
			throw new Error("Job not found");
		}
		const company = findCompanyById(job.companyId);
		if (!company) {
			throw new Error("Company not found");
		}
		return { job, company };
	},
};

// Company Service
export const companyService = {
	async listCompanies(recruiterId?: string): Promise<Company[]> {
		return getCompanies(recruiterId);
	},

	async getCompanyDetails(companyId: string): Promise<{
		company: Company;
		jobs: Job[];
	}> {
		const company = findCompanyById(companyId);
		if (!company) {
			throw new Error("Company not found");
		}
		const jobs = getJobs({ companyId });
		return { company, jobs };
	},
};

// Interview Service
export const interviewService = {
	async listInterviews(filters: {
		candidateId?: string;
		recruiterId?: string;
		jobId?: string;
		status?: "scheduled" | "completed" | "cancelled";
	}): Promise<Interview[]> {
		return getInterviews(filters);
	},

	async getInterviewDetails(interviewId: string): Promise<{
		interview: Interview;
		job: Job;
		candidate: User;
		recruiter: User;
	}> {
		const interview = getInterviews({}).find((i) => i.id === interviewId);
		if (!interview) {
			throw new Error("Interview not found");
		}

		const job = findJobById(interview.jobId);
		if (!job) {
			throw new Error("Job not found");
		}

		const candidate = findUserById(interview.candidateId);
		if (!candidate) {
			throw new Error("Candidate not found");
		}

		const recruiter = findUserById(interview.recruiterId);
		if (!recruiter) {
			throw new Error("Recruiter not found");
		}

		return { interview, job, candidate, recruiter };
	},
};

// Profile Service
export const profileService = {
	async getProfile(userId: string): Promise<Profile> {
		const profile = findProfileByUserId(userId);
		if (!profile) {
			throw new Error("Profile not found");
		}
		return profile;
	},

	async getProfileWithUser(userId: string): Promise<{
		profile: Profile;
		user: User;
	}> {
		const profile = findProfileByUserId(userId);
		if (!profile) {
			throw new Error("Profile not found");
		}

		const user = findUserById(userId);
		if (!user) {
			throw new Error("User not found");
		}

		return { profile, user };
	},
};
