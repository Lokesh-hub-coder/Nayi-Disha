"use client";

import { useRouter } from "next/navigation";

export default function InterviewerEditProfile() {
	const router = useRouter();

	// Mock data for the form
	const mockProfile = {
		firstName: "Priya",
		lastName: "Sharma",
		email: "priya.sharma@nayidisha.org",
		phone: "+91 98765 43210",
		company: "Nayi Disha Foundation",
		position: "Senior Interviewer & Accessibility Specialist",
		expertise: [
			"Inclusive Hiring Practices",
			"Disability Awareness",
			"Rural Employment Programs",
			"Skill Development",
			"Sign Language Interpretation",
			"Assistive Technology",
		],
		experience: 8,
		workExperience: [
			{
				company: "Nayi Disha Foundation",
				position: "Senior Interviewer & Accessibility Specialist",
				startDate: "2020-01",
				endDate: "present",
				description:
					"Leading interviews and assessments for underprivileged and disabled job seekers. Developed inclusive hiring practices and accessibility guidelines. Trained 50+ interviewers in disability awareness.",
			},
			{
				company: "Samarth Enterprises",
				position: "HR Manager - Special Projects",
				startDate: "2016-03",
				endDate: "2019-12",
				description:
					"Managed recruitment for rural and disabled candidates. Implemented accessibility programs and workplace accommodations. Successfully placed 200+ candidates from underprivileged backgrounds.",
			},
		],
		education: [
			{
				institution: "Tata Institute of Social Sciences",
				degree: "Master's",
				field: "Social Work (Disability Studies)",
				startDate: "2014",
				endDate: "2016",
			},
			{
				institution: "Delhi University",
				degree: "Bachelor's",
				field: "Psychology",
				startDate: "2010",
				endDate: "2014",
			},
		],
		skills: [
			"Sign Language (ISL)",
			"Disability Awareness",
			"Inclusive Hiring",
			"Rural Development",
			"Skill Assessment",
			"Accessibility Tools",
			"Assistive Technology",
			"Counseling",
		],
		languages: ["Hindi", "English", "Sign Language (ISL)", "Marathi"],
		certifications: [
			{
				name: "Certified Disability Employment Specialist",
				issuer:
					"National Institute for Empowerment of Persons with Disabilities",
				date: "2023",
			},
			{
				name: "Advanced Sign Language Interpreter",
				issuer: "Indian Sign Language Research and Training Centre",
				date: "2022",
			},
			{
				name: "Rural Employment Specialist",
				issuer: "Ministry of Rural Development",
				date: "2021",
			},
		],
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2">
						<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
							<div className="flex justify-between items-center">
								<h1 className="text-2xl font-bold text-gray-900">
									Edit Profile
								</h1>
								<button
									onClick={() => router.back()}
									className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-teal-600 shadow-sm"
								>
									Back to Profile
								</button>
							</div>
						</div>

						<div className="p-6 space-y-8">
							{/* Personal Information */}
							<section>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Personal Information
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700">
											First Name
										</label>
										<input
											type="text"
											value={mockProfile.firstName}
											readOnly
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Last Name
										</label>
										<input
											type="text"
											value={mockProfile.lastName}
											readOnly
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Email
										</label>
										<input
											type="email"
											value={mockProfile.email}
											readOnly
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Phone
										</label>
										<input
											type="tel"
											value={mockProfile.phone}
											readOnly
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
								</div>
							</section>

							{/* Professional Information */}
							<section>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Professional Information
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Company
										</label>
										<input
											type="text"
											value={mockProfile.company}
											readOnly
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Position
										</label>
										<input
											type="text"
											value={mockProfile.position}
											readOnly
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Years of Experience
										</label>
										<input
											type="number"
											value={mockProfile.experience}
											readOnly
											className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
										/>
									</div>
								</div>
							</section>

							{/* Expertise and Skills */}
							<section>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Expertise and Skills
								</h2>
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Areas of Expertise
										</label>
										<div className="mt-2 flex flex-wrap gap-2">
											{mockProfile.expertise.map((item, index) => (
												<span
													key={index}
													className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
												>
													{item}
												</span>
											))}
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">
											Technical Skills
										</label>
										<div className="mt-2 flex flex-wrap gap-2">
											{mockProfile.skills.map((skill, index) => (
												<span
													key={index}
													className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
												>
													{skill}
												</span>
											))}
										</div>
									</div>
								</div>
							</section>

							{/* Languages */}
							<section>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Languages
								</h2>
								<div className="flex flex-wrap gap-2">
									{mockProfile.languages.map((language, index) => (
										<span
											key={index}
											className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
										>
											{language}
										</span>
									))}
								</div>
							</section>

							{/* Work Experience */}
							<section>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Work Experience
								</h2>
								<div className="space-y-4">
									{mockProfile.workExperience.map((exp, index) => (
										<div key={index} className="border rounded-lg p-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Company
													</label>
													<input
														type="text"
														value={exp.company}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Position
													</label>
													<input
														type="text"
														value={exp.position}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Start Date
													</label>
													<input
														type="text"
														value={exp.startDate}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														End Date
													</label>
													<input
														type="text"
														value={exp.endDate}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div className="md:col-span-2">
													<label className="block text-sm font-medium text-gray-700">
														Description
													</label>
													<textarea
														value={exp.description}
														readOnly
														rows={3}
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</section>

							{/* Education */}
							<section>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Education
								</h2>
								<div className="space-y-4">
									{mockProfile.education.map((edu, index) => (
										<div key={index} className="border rounded-lg p-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Institution
													</label>
													<input
														type="text"
														value={edu.institution}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Degree
													</label>
													<input
														type="text"
														value={edu.degree}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Field
													</label>
													<input
														type="text"
														value={edu.field}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Year
													</label>
													<input
														type="text"
														value={`${edu.startDate} - ${edu.endDate}`}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</section>

							{/* Certifications */}
							<section>
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Certifications
								</h2>
								<div className="space-y-4">
									{mockProfile.certifications.map((cert, index) => (
										<div key={index} className="border rounded-lg p-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Name
													</label>
													<input
														type="text"
														value={cert.name}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Issuer
													</label>
													<input
														type="text"
														value={cert.issuer}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700">
														Date
													</label>
													<input
														type="text"
														value={cert.date}
														readOnly
														className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</section>

							{/* Save Button (Disabled for mock) */}
							<div className="flex justify-end pt-6">
								<button
									type="button"
									disabled
									className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
								>
									Save Changes (Disabled)
								</button>
							</div>
						</div>
					</div>

					<div className="space-y-6">
						{/* Quick Actions */}
						<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
							{/* Quick Actions content */}
						</div>

						{/* Interview Guidelines */}
						<div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-900">
							{/* Interview Guidelines content */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
