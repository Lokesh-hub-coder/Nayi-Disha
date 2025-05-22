import { NextResponse } from "next/server";
import {
	users,
	profiles,
	type User,
	type JobSeekerProfile,
	type InterviewerProfile,
} from "@/lib/mockData";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {
			email,
			password,
			role,
			name,
			phone,
			company,
			position,
			expertise,
			experience,
		} = body;

		// Validate required fields
		if (!email || !password || !role || !name) {
			return NextResponse.json(
				{ message: "Email, password, role, and name are required" },
				{ status: 400 }
			);
		}

		// Validate role
		if (!["job-seeker", "interviewer", "admin"].includes(role)) {
			return NextResponse.json({ message: "Invalid role" }, { status: 400 });
		}

		// Check if user already exists
		if (users.find((u) => u.email === email)) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}

		// Create new user
		const newUser: User = {
			id: Date.now().toString(),
			name,
			email,
			password, // In a real app, you would hash this
			role,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// Create profile based on role
		if (role === "job-seeker") {
			const newProfile: JobSeekerProfile = {
				userId: newUser.id,
				firstName: name.split(" ")[0],
				lastName: name.split(" ").slice(1).join(" "),
				phone: phone || "",
				skills: [],
				experience: [],
				education: [],
				resume: null,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			profiles[newUser.id] = newProfile;
		} else if (role === "interviewer") {
			if (!phone || !company || !position) {
				return NextResponse.json(
					{
						message:
							"Phone, company, and position are required for interviewers",
					},
					{ status: 400 }
				);
			}

			const newProfile: InterviewerProfile = {
				id: newUser.id,
				userId: newUser.id,
				firstName: name.split(" ")[0],
				lastName: name.split(" ").slice(1).join(" "),
				phone,
				company,
				position,
				expertise: ["General"],
				experience: 0,
				workExperience: [
					{
						id: "1",
						company,
						position,
						startDate: new Date().toISOString(),
						endDate: new Date().toISOString(),
						description: "Current position",
					},
				],
				education: [
					{
						id: "1",
						institution: "University",
						degree: "Bachelor's",
						field: "Computer Science",
						startDate: new Date().toISOString(),
						endDate: new Date().toISOString(),
					},
				],
				skills: ["Communication", "Interviewing"],
				languages: ["English", "Hindi"],
				certifications: [
					{
						id: "1",
						name: "Certification",
						issuer: "Issuing Organization",
						date: new Date().toISOString(),
					},
				],
				areasOfExpertise: ["Interviewing", "Recruitment"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			profiles[newUser.id] = newProfile;
		}

		// In a real app, you would save this to a database
		users.push(newUser);

		return NextResponse.json(
			{
				message: "User created successfully",
				user: {
					id: newUser.id,
					name: newUser.name,
					email: newUser.email,
					role: newUser.role,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
