// Types for better type safety
export interface User {
	id: string;
	name: string;
	email: string;
	role: "job-seeker" | "interviewer" | "admin";
	password: string;
	createdAt: string;
	updatedAt: string;
}

export interface Job {
	id: string;
	title: string;
	companyId: string;
	recruiterId: string;
	description: string;
	requirements: string[];
	location: string;
	salary: string;
	type: "full-time" | "part-time" | "contract";
	status: "open" | "closed";
	createdAt: string;
	updatedAt: string;
}

export interface Company {
	id: string;
	name: string;
	description: string;
	logo: string;
	website: string;
	location: string;
	industry: string;
	size: string;
	recruiterId: string;
	createdAt: string;
	updatedAt: string;
}

export interface Interview {
	id: string;
	jobId: string;
	candidateId: string;
	recruiterId: string;
	status: "scheduled" | "completed" | "cancelled";
	date: string;
	feedback?: string;
	createdAt: string;
	updatedAt: string;
}

export interface JobSeekerProfile {
	userId: string;
	firstName: string;
	lastName: string;
	phone: string;
	skills: string[];
	experience: Array<{
		id: string;
		company: string;
		position: string;
		startDate: string;
		endDate: string;
		description: string;
	}>;
	education: Array<{
		id: string;
		institution: string;
		degree: string;
		field: string;
		startDate: string;
		endDate: string;
	}>;
	resume: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface InterviewerProfile {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	phone: string;
	company: string;
	position: string;
	expertise: string[];
	experience: number;
	workExperience: Array<{
		id: string;
		company: string;
		position: string;
		startDate: string;
		endDate: string;
		description: string;
	}>;
	education: Array<{
		id: string;
		institution: string;
		degree: string;
		field: string;
		startDate: string;
		endDate: string;
	}>;
	skills: string[];
	languages: string[];
	certifications: Array<{
		id: string;
		name: string;
		issuer: string;
		date: string;
	}>;
	areasOfExpertise: string[];
	createdAt: string;
	updatedAt: string;
}

export interface JobApplication {
	id: string;
	jobId: string;
	userId: string;
	status: "pending" | "reviewed" | "interview" | "rejected" | "accepted";
	appliedAt: string;
	job: {
		title: string;
		company: string;
		location: string;
		type: "full-time" | "part-time" | "contract" | "internship";
		salary: string;
		description: string;
	};
	interview?: {
		date: string;
		time: string;
		type: "online" | "onsite";
		status: "scheduled" | "completed" | "cancelled";
	};
}

export interface InterviewRequest {
	id: string;
	jobSeekerId: string;
	jobSeekerName: string;
	jobSeekerEmail: string;
	jobTitle: string;
	company: string;
	preferredTimeSlots: Array<{
		date: string;
		time: string;
	}>;
	status: "pending" | "accepted" | "rejected";
	background: string;
	specialNeeds: string;
	createdAt: string;
	updatedAt: string;
}

// Mock Users Data
export const users: User[] = [
	{
		id: "1",
		name: "Admin User",
		email: "admin@example.com",
		role: "admin",
		password: "admin123",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane.smith@example.com",
		role: "interviewer",
		password: "interviewer123",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		name: "John Doe",
		email: "john.doe@example.com",
		role: "job-seeker",
		password: "jobseeker123",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	// Additional users
	{
		id: "4",
		name: "Sarah Johnson",
		email: "sarah.j@example.com",
		role: "job-seeker",
		password: "pass123",
		createdAt: "2024-01-02T00:00:00Z",
		updatedAt: "2024-01-02T00:00:00Z",
	},
	{
		id: "5",
		name: "Michael Chen",
		email: "m.chen@example.com",
		role: "job-seeker",
		password: "pass123",
		createdAt: "2024-01-02T00:00:00Z",
		updatedAt: "2024-01-02T00:00:00Z",
	},
	{
		id: "6",
		name: "Emily Brown",
		email: "emily.b@example.com",
		role: "interviewer",
		password: "pass123",
		createdAt: "2024-01-03T00:00:00Z",
		updatedAt: "2024-01-03T00:00:00Z",
	},
	{
		id: "7",
		name: "David Wilson",
		email: "d.wilson@example.com",
		role: "job-seeker",
		password: "pass123",
		createdAt: "2024-01-03T00:00:00Z",
		updatedAt: "2024-01-03T00:00:00Z",
	},
	// Add more users as needed...
];

// Mock Companies Data
export const companies: Company[] = [
	{
		id: "1",
		name: "Nayi Disha Foundation",
		description:
			"A non-profit organization dedicated to providing employment opportunities for underprivileged and disabled individuals",
		logo: "/images/companies/nayi-disha.png",
		website: "https://nayi-disha.org",
		location: "Mumbai, Maharashtra",
		industry: "Social Services",
		size: "50-200",
		recruiterId: "2",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		name: "Samarth Enterprises",
		description:
			"A social enterprise creating inclusive work environments for people with disabilities",
		logo: "/images/companies/samarth.png",
		website: "https://samarth.org",
		location: "Delhi, India",
		industry: "Social Enterprise",
		size: "100-500",
		recruiterId: "2",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		name: "Udaan Handicrafts",
		description: "A cooperative supporting artisans with disabilities",
		logo: "/images/companies/udaan.png",
		website: "https://udaan-handicrafts.org",
		location: "Jaipur, Rajasthan",
		industry: "Handicrafts",
		size: "20-100",
		recruiterId: "2",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
];

// Mock Jobs Data
export const jobs: Job[] = [
	{
		id: "1",
		title: "Handicraft Artisan",
		companyId: "3",
		recruiterId: "2",
		description:
			"Create beautiful handmade products. No prior experience required. Training will be provided. Suitable for people with physical disabilities.",
		requirements: [
			"Basic hand coordination",
			"Willingness to learn",
			"No formal education required",
			"Can work from home",
		],
		location: "Jaipur, Rajasthan",
		salary: "₹8,000 - ₹15,000 per month",
		type: "part-time",
		status: "open",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		title: "Data Entry Operator",
		companyId: "1",
		recruiterId: "2",
		description:
			"Work from home opportunity for people with mobility challenges. Basic computer skills required.",
		requirements: [
			"Basic computer knowledge",
			"Typing speed of 20 WPM",
			"10th standard pass",
			"Can work from home",
		],
		location: "Remote",
		salary: "₹6,000 - ₹12,000 per month",
		type: "part-time",
		status: "open",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		title: "Customer Support Associate",
		companyId: "2",
		recruiterId: "2",
		description:
			"Work from home customer support role. Training provided. Suitable for people with hearing impairments.",
		requirements: [
			"Basic English communication",
			"10th standard pass",
			"Can work from home",
			"Basic computer knowledge",
		],
		location: "Remote",
		salary: "₹7,000 - ₹14,000 per month",
		type: "full-time",
		status: "open",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "4",
		title: "Packaging Assistant",
		companyId: "1",
		recruiterId: "2",
		description:
			"Light packaging work in an inclusive environment. Suitable for people with mild physical disabilities.",
		requirements: [
			"Basic physical ability",
			"No formal education required",
			"Willingness to learn",
			"Can work in a team",
		],
		location: "Mumbai, Maharashtra",
		salary: "₹5,000 - ₹10,000 per month",
		type: "full-time",
		status: "open",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "5",
		title: "Content Writer",
		companyId: "2",
		recruiterId: "2",
		description:
			"Create simple content for social media. Training provided. Suitable for people with visual impairments.",
		requirements: [
			"Basic Hindi/English writing",
			"12th standard pass",
			"Can work from home",
			"Basic computer knowledge",
		],
		location: "Remote",
		salary: "₹6,000 - ₹12,000 per month",
		type: "part-time",
		status: "open",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
];

// Mock Interviews Data
export const interviews: Interview[] = [
	{
		id: "1",
		jobId: "1",
		candidateId: "1",
		recruiterId: "2",
		status: "scheduled",
		date: "2024-04-01T10:00:00Z",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
];

// Mock Profiles Data
export const profiles: {
	[key: string]: JobSeekerProfile | InterviewerProfile;
} = {
	"2": {
		id: "2",
		userId: "2",
		firstName: "Jane",
		lastName: "Smith",
		phone: "+1987654321",
		company: "TechCorp",
		position: "Senior Technical Interviewer",
		expertise: [
			"System Design",
			"Algorithms",
			"Web Development",
			"Cloud Architecture",
		],
		experience: 8,
		workExperience: [
			{
				id: "1",
				company: "Nayi Disha Foundation",
				position: "Senior Interviewer & Accessibility Specialist",
				startDate: "2020-01-01",
				endDate: "2024-12-31",
				description:
					"Leading inclusive hiring initiatives and conducting interviews for underprivileged and disabled candidates",
			},
		],
		education: [
			{
				id: "1",
				institution: "Tata Institute of Social Sciences",
				degree: "Master of Social Work",
				field: "Disability Studies",
				startDate: "2016-01-01",
				endDate: "2018-12-31",
			},
		],
		skills: [
			"JavaScript",
			"TypeScript",
			"React",
			"Node.js",
			"Python",
			"System Design",
			"Data Structures",
			"Algorithms",
		],
		languages: ["English", "Mandarin"],
		certifications: [
			{
				id: "1",
				name: "Certified Disability Employment Specialist",
				issuer:
					"National Centre for Promotion of Employment for Disabled People",
				date: "2019-06-01",
			},
		],
		areasOfExpertise: [
			"Inclusive Hiring",
			"Disability Awareness",
			"Sign Language Interpretation",
			"Career Counseling",
			"Accessibility Assessment",
		],
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-03-20T00:00:00Z",
	},
	"3": {
		userId: "3",
		firstName: "John",
		lastName: "Doe",
		phone: "+1234567890",
		skills: ["JavaScript", "React", "Node.js"],
		experience: [
			{
				id: "exp1",
				company: "Tech Corp",
				position: "Frontend Developer",
				startDate: "2020-01-01",
				endDate: "2022-12-31",
				description: "Worked on various web applications",
			},
		],
		education: [
			{
				id: "1",
				institution: "University of Technology",
				degree: "Bachelor's",
				field: "Computer Science",
				startDate: "2016-09-01",
				endDate: "2020-05-31",
			},
		],
		resume: "https://example.com/resume.pdf",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
	"1": {
		id: "1",
		userId: "1",
		firstName: "Priya",
		lastName: "Sharma",
		phone: "+919876543210",
		company: "Nayi Disha Foundation",
		position: "Senior Interviewer & Accessibility Specialist",
		expertise: ["Inclusive Hiring", "Disability Awareness", "Sign Language"],
		experience: 5,
		workExperience: [
			{
				id: "1",
				company: "Nayi Disha Foundation",
				position: "Senior Interviewer & Accessibility Specialist",
				startDate: "2020-01-01",
				endDate: "2024-12-31",
				description:
					"Leading inclusive hiring initiatives and conducting interviews for underprivileged and disabled candidates",
			},
		],
		education: [
			{
				id: "1",
				institution: "Tata Institute of Social Sciences",
				degree: "Master of Social Work",
				field: "Disability Studies",
				startDate: "2016-01-01",
				endDate: "2018-12-31",
			},
		],
		skills: [
			"Inclusive Hiring",
			"Disability Awareness",
			"Sign Language Interpretation",
			"Career Counseling",
			"Accessibility Assessment",
		],
		languages: ["English", "Hindi", "Indian Sign Language"],
		certifications: [
			{
				id: "1",
				name: "Certified Disability Employment Specialist",
				issuer:
					"National Centre for Promotion of Employment for Disabled People",
				date: "2019-06-01",
			},
		],
		areasOfExpertise: [
			"Inclusive Hiring",
			"Disability Awareness",
			"Sign Language Interpretation",
			"Career Counseling",
			"Accessibility Assessment",
		],
		createdAt: "2020-01-01T00:00:00Z",
		updatedAt: "2023-01-01T00:00:00Z",
	},
};

// Mock Job Applications Data
export const jobApplications: JobApplication[] = [
	{
		id: "1",
		jobId: "101",
		userId: "3", // John Doe's ID
		status: "interview",
		appliedAt: "2024-03-01T10:00:00Z",
		job: {
			title: "Senior Frontend Developer",
			company: "Tech Corp",
			location: "San Francisco, CA",
			type: "full-time",
			salary: "$120,000 - $150,000",
			description:
				"Looking for an experienced frontend developer to join our team.",
		},
		interview: {
			date: "2024-03-15",
			time: "14:00",
			type: "online",
			status: "scheduled",
		},
	},
	{
		id: "2",
		jobId: "102",
		userId: "3",
		status: "reviewed",
		appliedAt: "2024-02-28T15:30:00Z",
		job: {
			title: "React Developer",
			company: "Web Solutions Inc",
			location: "Remote",
			type: "full-time",
			salary: "$90,000 - $110,000",
			description: "Join our remote team as a React developer.",
		},
	},
	{
		id: "3",
		jobId: "103",
		userId: "3",
		status: "pending",
		appliedAt: "2024-03-05T09:15:00Z",
		job: {
			title: "Full Stack Developer",
			company: "StartupX",
			location: "New York, NY",
			type: "full-time",
			salary: "$100,000 - $130,000",
			description: "Full stack developer position with modern tech stack.",
		},
	},
];

// Mock Interview Requests Data
export const interviewRequests: InterviewRequest[] = [
	{
		id: "1",
		jobSeekerId: "3",
		jobSeekerName: "Rahul Kumar",
		jobSeekerEmail: "rahul.k@example.com",
		jobTitle: "Data Entry Operator",
		company: "Remote Solutions",
		preferredTimeSlots: [
			{ date: "2024-03-20", time: "10:00 AM" },
			{ date: "2024-03-20", time: "2:00 PM" },
			{ date: "2024-03-21", time: "11:00 AM" },
		],
		status: "accepted",
		background:
			"From rural Bihar, first-generation learner, completed 10th standard through government school",
		specialNeeds: "Requires screen reader software for visual impairment",
		createdAt: "2024-03-15T10:00:00Z",
		updatedAt: "2024-03-15T10:00:00Z",
	},
	{
		id: "2",
		jobSeekerId: "4",
		jobSeekerName: "Priya Sharma",
		jobSeekerEmail: "priya.s@example.com",
		jobTitle: "Customer Support Associate",
		company: "Support Solutions",
		preferredTimeSlots: [
			{ date: "2024-03-22", time: "9:00 AM" },
			{ date: "2024-03-22", time: "3:00 PM" },
			{ date: "2024-03-23", time: "10:00 AM" },
		],
		status: "accepted",
		background:
			"From urban slum in Mumbai, completed 12th standard through night school while working during the day",
		specialNeeds: "Hearing impairment, requires sign language interpreter",
		createdAt: "2024-03-16T14:30:00Z",
		updatedAt: "2024-03-16T14:30:00Z",
	},
	{
		id: "3",
		jobSeekerId: "5",
		jobSeekerName: "Amit Patel",
		jobSeekerEmail: "amit.p@example.com",
		jobTitle: "Handicraft Artisan",
		company: "Artisan Crafts",
		preferredTimeSlots: [
			{ date: "2024-03-21", time: "11:00 AM" },
			{ date: "2024-03-21", time: "3:00 PM" },
		],
		status: "accepted",
		background:
			"From tribal community in Odisha, traditional artisan family, no formal education",
		specialNeeds:
			"Mobility impairment, requires wheelchair-accessible workspace",
		createdAt: "2024-03-15T09:00:00Z",
		updatedAt: "2024-03-15T15:00:00Z",
	},
	{
		id: "4",
		jobSeekerId: "7",
		jobSeekerName: "Sneha Gupta",
		jobSeekerEmail: "sneha.g@example.com",
		jobTitle: "Content Writer",
		company: "Content Solutions",
		preferredTimeSlots: [
			{ date: "2024-03-23", time: "2:00 PM" },
			{ date: "2024-03-24", time: "10:00 AM" },
		],
		status: "accepted",
		background:
			"From rural Uttar Pradesh, completed graduation through distance education while supporting family",
		specialNeeds: "Visual impairment, requires screen magnification software",
		createdAt: "2024-03-16T11:00:00Z",
		updatedAt: "2024-03-16T16:00:00Z",
	},
];

export const interviewerProfiles: InterviewerProfile[] = [
	{
		id: "1",
		userId: "1",
		firstName: "Priya",
		lastName: "Sharma",
		phone: "+919876543210",
		company: "Nayi Disha Foundation",
		position: "Senior Interviewer & Accessibility Specialist",
		expertise: ["Inclusive Hiring", "Disability Awareness", "Sign Language"],
		experience: 5,
		workExperience: [
			{
				id: "1",
				company: "Nayi Disha Foundation",
				position: "Senior Interviewer & Accessibility Specialist",
				startDate: "2020-01-01",
				endDate: "2024-12-31",
				description:
					"Leading inclusive hiring initiatives and conducting interviews for underprivileged and disabled candidates",
			},
		],
		education: [
			{
				id: "1",
				institution: "Tata Institute of Social Sciences",
				degree: "Master of Social Work",
				field: "Disability Studies",
				startDate: "2016-01-01",
				endDate: "2018-12-31",
			},
		],
		skills: [
			"Inclusive Hiring",
			"Disability Awareness",
			"Sign Language Interpretation",
			"Career Counseling",
			"Accessibility Assessment",
		],
		languages: ["English", "Hindi", "Indian Sign Language"],
		certifications: [
			{
				id: "1",
				name: "Certified Disability Employment Specialist",
				issuer:
					"National Centre for Promotion of Employment for Disabled People",
				date: "2019-06-01",
			},
		],
		areasOfExpertise: [
			"Inclusive Hiring",
			"Disability Awareness",
			"Sign Language Interpretation",
			"Career Counseling",
			"Accessibility Assessment",
		],
		createdAt: "2020-01-01T00:00:00Z",
		updatedAt: "2023-01-01T00:00:00Z",
	},
];

export const jobSeekerProfiles: JobSeekerProfile[] = [
	{
		userId: "1",
		firstName: "Rahul",
		lastName: "Kumar",
		phone: "+91 98765 43210",
		skills: ["Data Entry", "MS Office", "Typing"],
		experience: [
			{
				id: "exp1",
				company: "Rural Development Center",
				position: "Data Entry Operator",
				startDate: "2022-01-01",
				endDate: "2023-12-31",
				description: "Managed data entry for rural development projects",
			},
		],
		education: [
			{
				id: "edu1",
				institution: "Bihar State University",
				degree: "Bachelor of Arts",
				field: "Economics",
				startDate: "2018-07-01",
				endDate: "2022-06-30",
			},
		],
		resume: null,
		createdAt: "2023-01-01T00:00:00Z",
		updatedAt: "2023-01-01T00:00:00Z",
	},
	{
		userId: "2",
		firstName: "Priya",
		lastName: "Sharma",
		phone: "+91 98765 43211",
		skills: ["Customer Service", "Communication", "Problem Solving"],
		experience: [
			{
				id: "exp2",
				company: "Urban Support Center",
				position: "Customer Support Associate",
				startDate: "2021-06-01",
				endDate: "2023-12-31",
				description: "Provided customer support and assistance",
			},
		],
		education: [
			{
				id: "edu2",
				institution: "Mumbai University",
				degree: "Bachelor of Commerce",
				field: "Business Administration",
				startDate: "2017-07-01",
				endDate: "2021-06-30",
			},
		],
		resume: null,
		createdAt: "2023-01-02T00:00:00Z",
		updatedAt: "2023-01-02T00:00:00Z",
	},
];
