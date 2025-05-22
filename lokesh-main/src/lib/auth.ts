import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "./mockData";

// Extend the built-in session types
declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			role: string;
			name: string;
		};
	}

	interface User {
		id: string;
		email: string;
		role: string;
		name: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		role: string;
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Please enter an email and password");
				}

				try {
					// Find user in mock data
					const user = users.find((u) => u.email === credentials.email);

					if (!user) {
						throw new Error("No user found with this email");
					}

					// In a real app, we would properly compare hashed passwords
					// For mock data, we're doing a simple comparison
					if (user.password !== credentials.password) {
						throw new Error("Invalid password");
					}

					return {
						id: user.id,
						email: user.email,
						role: user.role,
					};
				} catch (error) {
					console.error("Auth error:", error);
					throw error;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
	session: {
		strategy: "jwt",
	},
};
