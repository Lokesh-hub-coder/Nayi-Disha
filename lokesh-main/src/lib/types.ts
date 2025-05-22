export interface WorkExperience {
	id: string;
	company: string;
	position: string;
	startDate: string;
	endDate: string | null;
	description: string;
}

export interface Education {
	id: string;
	institution: string;
	degree: string;
	field: string;
	startDate: string;
	endDate: string;
}

export interface Certification {
	id: string;
	name: string;
	issuer: string;
	date: string;
}

export interface InterviewerProfile {
	id: string;
	userId: string;
	workExperience: WorkExperience[];
	education: Education[];
	certifications: Certification[];
	areasOfExpertise: string[];
	languages: string[];
	createdAt: string;
	updatedAt: string;
}

export interface JobSeekerEducation {
	institution: string;
	degree: string;
	field: string;
	startDate: string;
	endDate: string;
	id?: string;
}

export interface JobSeekerExperience {
	company: string;
	position: string;
	startDate: string;
	endDate: string;
	description: string;
	id?: string;
}

export interface JobSeekerProfile {
	userId: string;
	firstName: string;
	lastName: string;
	phone: string;
	skills: string[];
	experience: JobSeekerExperience[];
	education: JobSeekerEducation[];
	resume: string | null;
	createdAt: string;
	updatedAt: string;
}
