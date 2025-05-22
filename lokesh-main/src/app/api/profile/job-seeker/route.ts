import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { profiles } from "@/lib/mockData";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const profile = profiles[session.user.id];

		if (!profile) {
			return NextResponse.json(
				{ message: "Profile not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(profile);
	} catch (error) {
		console.error("Error fetching profile:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const {
			firstName,
			lastName,
			phone,
			skills,
			experience,
			education,
			resume,
		} = body;

		// Create or update profile
		profiles[session.user.id] = {
			userId: session.user.id,
			firstName,
			lastName,
			phone,
			skills: skills.split(",").map((skill: string) => skill.trim()),
			experience,
			education,
			resume,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		return NextResponse.json(
			{ message: "Profile updated successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating profile:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
