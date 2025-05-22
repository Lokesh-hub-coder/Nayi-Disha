"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiMail,
  FiLock,
  FiUser,
  FiBriefcase,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import {
  inputStyles,
  primaryButtonStyles,
  formContainerStyles,
  labelStyles,
  errorStyles,
} from "@/components/ui/FormStyles.ts";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job-seeker",
    phone: "",
    company: "",
    position: "",
    expertise: "",
    experience: "", // keep as string for consistent input handling
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.role === "interviewer") {
      const { phone, company, position } = formData;
      if (!phone || !company || !position) {
        setError("All interviewer fields are required");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create account");

      router.push("/auth/signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-indigo-50 to-blue-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-xl">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Or{" "}
            <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>

        {error && <div className={errorStyles}>{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <InputField
            id="name"
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            icon={<FiUser />}
            placeholder="Enter your full name"
          />

          {/* Email */}
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            icon={<FiMail />}
            placeholder="Enter your email address"
          />

          {/* Password */}
          <InputField
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            icon={<FiLock />}
            placeholder="Create a password"
          />

          {/* Confirm Password */}
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            icon={<FiLock />}
            placeholder="Confirm your password"
          />

          {/* Phone (optional always visible field, adjust if needed) */}
          <InputField
            id="phone"
            label="Phone Number"
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            icon={<FiPhone />}
            placeholder="Enter your phone number"
          />

          {/* Role Selector */}
          <div>
            <label htmlFor="role" className={labelStyles}>
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiBriefcase className="w-5 h-5 text-gray-400" />
              </div>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="interviewer">Interviewer</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Job Seeker Fields */}
          {formData.role === "job-seeker" && (
            <InputField
              id="position"
              label="Position"
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              icon={<FiBriefcase />}
              placeholder="Enter position you are applying for"
            />
          )}

          {/* Interviewer Fields */}
          {formData.role === "interviewer" && (
            <>
              <InputField
                id="company"
                label="Company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                icon={<FiMapPin />}
                placeholder="Enter your company name"
              />
              <InputField
                id="position"
                label="Position"
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                icon={<FiBriefcase />}
                placeholder="Enter required Job position"
              />
            </>
          )}

          <div className="mt-6">
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-sm hover:shadow-md">
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div className="text-gray-400 w-5 h-5">
            {icon}
          </div>
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          required
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
