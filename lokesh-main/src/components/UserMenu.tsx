"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
	const { data: session } = useSession();

	return (
		<Menu as="div" className="relative">
			<Menu.Button className="flex items-center space-x-3 focus:outline-none">
				<div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-teal-500 flex items-center justify-center text-white font-medium">
					{session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
				</div>
				<span className="text-sm font-medium text-gray-700">
					{session?.user?.name || session?.user?.email}
				</span>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<Menu.Item>
						{({ active }) => (
							<Link
								href={`/profile/${session?.user?.role}`}
								className={`${
									active ? "bg-purple-50 text-purple-700" : "text-gray-700"
								} block px-4 py-2 text-sm`}
							>
								Profile
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<Link
								href="/dashboard"
								className={`${
									active ? "bg-purple-50 text-purple-700" : "text-gray-700"
								} block px-4 py-2 text-sm`}
							>
								Dashboard
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								onClick={() => signOut()}
								className={`${
									active ? "bg-purple-50 text-purple-700" : "text-gray-700"
								} block w-full text-left px-4 py-2 text-sm`}
							>
								Sign out
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
