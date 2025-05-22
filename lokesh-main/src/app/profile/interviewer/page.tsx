"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InterviewerProfile {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  expertise: string[];
  experience: number;
  company: string;
  position: string;
  availability: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// Mock data - replace with your actual data source
const mockInterviewerProfiles: { [key: string]: InterviewerProfile } = {};

export default function InterviewerProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<InterviewerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated" && session?.user) {
      const userProfile = mockInterviewerProfiles[session.user.id] as
        | InterviewerProfile
        | undefined;

      if (!userProfile) {
        const defaultProfile: InterviewerProfile = {
          userId: session.user.id,
          firstName: session.user.name?.split(" ")[0] || "",
          lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
          phone: "",
          expertise: [],
          experience: 0,
          company: "",
          position: "",
          availability: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockInterviewerProfiles[session.user.id] = defaultProfile;
        setProfile(defaultProfile);
      } else {
        setProfile(userProfile);
      }
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (status === "loading" || isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-900">
          <div className="bg-gradient-to-r from-purple-50 to-teal-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/dashboard/interviewer")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-600 shadow-sm"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => router.push("/profile/interviewer/edit")}
                  className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Personal Info */}
            <section className="border-2 border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <p className="mt-1">
                    {profile.firstName} {profile.lastName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <p className="mt-1">{session?.user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <p className="mt-1">{profile.phone || "9684235410"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Experience</label>
                  <p className="mt-1">{profile.experience || 5} years</p>
                </div>
              </div>
            </section>

            {/* Professional Info */}
            <section className="border-2 border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium">Company</label>
                  <p className="mt-1">{profile.company || "Tech Solutions Inc."}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Position</label>
                  <p className="mt-1">{profile.position || "Senior Software Engineer"}</p>
                </div>
              </div>
            </section>

            {/* Expertise */}
            <section className="border-2 border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {(profile.expertise.length > 0
                  ? profile.expertise
                  : ["JavaScript", "React", "Node.js", "System Design", "Database Design"]
                ).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Availability */}
            <section className="border-2 border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              {(profile.availability.length > 0
                ? profile.availability
                : [
                    {
                      day: "Monday",
                      startTime: "09:00",
                      endTime: "17:00",
                    },
                    {
                      day: "Tuesday",
                      startTime: "09:00",
                      endTime: "17:00",
                    },
                    {
                      day: "Wednesday",
                      startTime: "09:00",
                      endTime: "17:00",
                    },
                    {
                      day: "Thursday",
                      startTime: "09:00",
                      endTime: "17:00",
                    },
                    {
                      day: "Friday",
                      startTime: "09:00",
                      endTime: "15:00",
                    },
                  ]
              ).map((slot, idx) => (
                <div
                  key={idx}
                  className="border p-4 bg-gray-50 rounded-lg mb-2"
                >
                  <h3 className="font-medium">{slot.day}</h3>
                  <p className="text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}