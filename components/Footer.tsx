"use client";

import Link from "next/link";

export default function Footer() {
	return (
		<footer className="py-6 flex justify-center">
			<p className="flex items-center gap-1">
				made with ❤️ by
				<Link
					href="https://www.instagram.com/narayanagung"
					target="_blank"
					title="visit my instagram"
					className="font-semibold cursor-pointer hover:text-gray-500"
				>
					narayanagung
				</Link>
			</p>
		</footer>
	);
}
