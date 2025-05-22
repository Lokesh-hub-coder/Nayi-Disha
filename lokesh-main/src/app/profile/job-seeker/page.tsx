"use client";

import { JobSeekerProfile } from "@/lib/mockData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { profiles } from "@/lib/mockData";

export default function JobSeekerProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated" && session?.user) {
      const userProfile = profiles[session.user.id] as
        | JobSeekerProfile
        | undefined;

      if (!userProfile) {
        const defaultProfile: JobSeekerProfile = {
          userId: session.user.id,
          firstName: session.user.name?.split(" ")[0] || "",
          lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
          phone: "",
          skills: [],
          experience: [],
          education: [],
          resume: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        profiles[session.user.id] = defaultProfile;
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
                  onClick={() => router.push("/dashboard/job-seeker")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-600 shadow-sm"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => router.push("/profile/job-seeker/edit")}
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
              </div>
            </section>

            {/* Skills */}
            <section className="border-2 border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {(profile.skills.length > 0
                  ? profile.skills
                  : ["JavaScript", "React", "TypeScript", "Tailwind CSS"]
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

            {/* Education */}
            <section className="border-2 border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              {(profile.education.length > 0
                ? profile.education
                : [
                    {
                      institution: "Indian Institute of Technology",
                      degree: "B.Tech in Computer Science",
                      year: "2022",
                      marks: "8.9 CGPA",
                    },
                    {
                      institution: "ABC Junior College",
                      degree: "12th Grade",
                      year: "2018",
                      marks: "92%",
                    },
                  ]
              ).map((edu, idx) => (
                <div
                  key={idx}
                  className="border p-4 bg-gray-50 rounded-lg mb-2"
                >
                  <h3 className="font-medium">{edu.institution}</h3>
                  <p>
                    {edu.degree} 
                  </p>
                </div>
              ))}
            </section>

            {/* Experience */}
            <section className="border-2 border-blue-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Work Experience</h2>

              <div className="border p-4 bg-gray-50 rounded-lg mb-2">
                <h3 className="font-medium">Frontend Developer</h3>
                <p>Tech Solutions Inc. Jan 2023 – Present</p>
                <p className="mt-2">
                  Worked on building scalable UI components using React and
                  Tailwind CSS.
                </p>
              </div>
              <div className="border p-4 bg-gray-50 rounded-lg mb-2">
                <h3 className="font-medium">Web Development Intern</h3>
                <p>StartUpHub Jun 2022 – Dec 2022</p>
                <p className="mt-2">
                  Built landing pages and dashboards, collaborated with backend
                  teams.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
