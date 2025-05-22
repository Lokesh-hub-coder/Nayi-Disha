"use client";

import { useRouter } from "next/navigation";

export interface ProfileData {
	role: "job-seeker" | "interviewer";
	name: string;
	email: string;
	phone?: string;
	skills?: string[];
	experience?: Array<{
		company: string;
		position: string;
		startDate: string;
		endDate: string;
		description: string;
	}>;
	education?: Array<{
		institution: string;
		degree: string;
		field: string;
		startDate: string;
		endDate: string;
	}>;
	resume?: string;
	company?: string;
	position?: string;
	expertise?: string[];
	yearsOfExperience?: number;
	languages?: string[];
	certifications?: Array<{
		name: string;
		issuer: string;
		date: string;
	}>;
}

interface ProfileInfoCardProps {
	profile: ProfileData;
	isLoading: boolean;
}

export default function ProfileInfoCard({
	profile,
	isLoading,
}: ProfileInfoCardProps) {
	const router = useRouter();

	if (isLoading) {
		return (
			<div className="bg-white shadow rounded-lg p-6 mb-6">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
					<div className="space-y-3">
						<div className="h-4 bg-gray-200 rounded w-3/4"></div>
						<div className="h-4 bg-gray-200 rounded w-1/2"></div>
						<div className="h-4 bg-gray-200 rounded w-2/3"></div>
					</div>
				</div>
			</div>
		);
	}

	const handleEditClick = () => {
		const editPath =
			profile.role === "job-seeker"
				? "/profile/job-seeker/edit"
				: "/profile/interviewer/edit";
		router.push(editPath);
	};

	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden">
			<div className="bg-gradient-to-r from-purple-50 to-teal-50 px-6 py-4 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold text-gray-900">
						{profile.role === "job-seeker"
							? "Professional Information"
							: "Interviewer Profile"}
					</h2>
					<button
						onClick={handleEditClick}
						className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
					>
						Edit Profile
					</button>
				</div>
			</div>

			<div className="p-6 space-y-6">
				{/* Personal Information */}
				<div>
					<h3 className="text-lg font-semibold text-gray-800 mb-4">
						Personal Information
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-gray-500">Name</p>
							<p className="font-medium">{profile.name || "Not provided"}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Email</p>
							<p className="font-medium">{profile.email || "Not provided"}</p>
						</div>
						{profile.phone && (
							<div>
								<p className="text-sm text-gray-500">Phone</p>
								<p className="font-medium">{profile.phone}</p>
							</div>
						)}
					</div>
				</div>

				{/* Professional Information */}
				{profile.role === "interviewer" && (
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							Professional Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{profile.company && (
								<div>
									<p className="text-sm text-gray-500">Company</p>
									<p className="font-medium">{profile.company}</p>
								</div>
							)}
							{profile.position && (
								<div>
									<p className="text-sm text-gray-500">Position</p>
									<p className="font-medium">{profile.position}</p>
								</div>
							)}
							{profile.yearsOfExperience && (
								<div>
									<p className="text-sm text-gray-500">Years of Experience</p>
									<p className="font-medium">
										{profile.yearsOfExperience} years
									</p>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Skills and Expertise */}
				{((profile.role === "interviewer" && profile.expertise) ||
					(profile.role === "job-seeker" && profile.skills)) && (
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							{profile.role === "interviewer" ? "Areas of Expertise" : "Skills"}
						</h3>
						<div className="flex flex-wrap gap-2">
							{(profile.role === "interviewer"
								? profile.expertise
								: profile.skills
							)?.map((skill, index) => (
								<span
									key={index}
									className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Languages */}
				{profile.languages && profile.languages.length > 0 && (
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							Languages
						</h3>
						<div className="flex flex-wrap gap-2">
							{profile.languages.map((language, index) => (
								<span
									key={index}
									className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
								>
									{language}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Work Experience */}
				{profile.experience && profile.experience.length > 0 && (
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							Work Experience
						</h3>
						<div className="space-y-4">
							{profile.experience.map((exp, index) => (
								<div key={index} className="border-l-4 border-indigo-200 pl-4">
									<p className="font-medium">{exp.position}</p>
									<p className="text-gray-600">{exp.company}</p>
									<p className="text-sm text-gray-500">
										{exp.startDate} - {exp.endDate}
									</p>
									{exp.description && (
										<p className="mt-2 text-gray-700">{exp.description}</p>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* Education */}
				{profile.education && profile.education.length > 0 && (
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							Education
						</h3>
						<div className="space-y-4">
							{profile.education.map((edu, index) => (
								<div key={index} className="border-l-4 border-indigo-200 pl-4">
									<p className="font-medium">{edu.degree}</p>
									<p className="text-gray-600">{edu.institution}</p>
									<p className="text-sm text-gray-500">
										{edu.startDate} - {edu.endDate}
									</p>
									{edu.field && (
										<p className="mt-2 text-gray-700">{edu.field}</p>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{/* Certifications */}
				{profile.certifications && profile.certifications.length > 0 && (
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							Certifications
						</h3>
						<div className="space-y-4">
							{profile.certifications.map((cert, index) => (
								<div key={index} className="border-l-4 border-green-200 pl-4">
									<p className="font-medium">{cert.name}</p>
									<p className="text-gray-600">{cert.issuer}</p>
									<p className="text-sm text-gray-500">{cert.date}</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Resume Link for Job Seekers */}
				{profile.role === "job-seeker" && profile.resume && (
					<div>
						<h3 className="text-lg font-semibold text-gray-800 mb-4">Resume</h3>
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
		</div>
	);
}
