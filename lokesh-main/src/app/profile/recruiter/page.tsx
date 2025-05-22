"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import { ProfileData } from "@/components/ProfileInfoCard";

export default function RecruiterProfile() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [profile, setProfile] = useState<ProfileData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		} else if (session?.user) {
			fetchProfile();
		}
	}, [status, session, router]);

	const fetchProfile = async () => {
		try {
			const response = await fetch("/api/profile/recruiter");
			if (response.ok) {
				const data = await response.json();
				setProfile({
					...data,
					role: "recruiter",
					name: `${data.firstName} ${data.lastName}`,
					email: session?.user?.email || "",
				});
			} else {
				setError("Failed to load profile");
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
			setError("Failed to load profile");
		} finally {
			setIsLoading(false);
		}
	};

	if (status === "loading" || isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600">{error}</p>
					<button
						onClick={fetchProfile}
						className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			{profile ? (
				<ProfileInfoCard profile={profile} isLoading={isLoading} />
			) : (
				<div className="text-center">
					<p className="text-gray-600">No profile information found.</p>
					<button
						onClick={() => router.push("/profile/recruiter/edit")}
						className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
					>
						Create Profile
					</button>
				</div>
			)}
		</div>
	);
}
