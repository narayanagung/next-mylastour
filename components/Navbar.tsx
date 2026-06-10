import Link from "next/link";
import { isAdmin } from "@/lib/isAdmin";
import { LogIn, LogOut, CirclePlus } from "lucide-react";

export default async function Navbar() {
	const admin = await isAdmin();

	return (
		<nav className="py-4 flex items-center justify-between text-lg md:text-xl">
			<div>
				<Link
					title="go to homepage"
					href="/"
					className="font-semibold cursor-pointer py-2 pr-4 hover:text-gray-500"
				>
					home
				</Link>

				<Link
					title="why"
					href="/about"
					className="font-semibold cursor-pointer py-2 pr-4 hover:text-gray-500"
				>
					about
				</Link>
			</div>
			<div className="flex items-center gap-4">
				{admin ? (
					<>
						<Link
							title="add new post"
							href="/admin/upload"
							className="border p-2 rounded-md cursor-pointer py-2 px-4 bg-black text-gray-100 hover:opacity-80 flex items-center gap-2"
						>
							<CirclePlus />
						</Link>

						<form action="/api/logout" method="POST">
							<button
								title="bye now"
								type="submit"
								className="border p-2 rounded-md cursor-pointer py-2 px-4 bg-black text-gray-100 hover:opacity-80"
							>
								<LogOut />
							</button>
						</form>
					</>
				) : (
					<Link
						title="hello there"
						href="/admin/login"
						className="border p-2 rounded-md cursor-pointer py-2 px-4 bg-black text-gray-100 hover:opacity-80"
					>
						<LogIn />
					</Link>
				)}
			</div>
		</nav>
	);
}
