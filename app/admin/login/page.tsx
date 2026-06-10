import Link from "next/link";

export const metadata = {
	title: "login",
};

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{
		error?: string;
	}>;
}) {
	const params = await searchParams;
	return (
		<main className="max-w-7xl mx-auto px-5 min-h-screen flex flex-col">
			<div className="flex-1 flex flex-col items-center justify-center">
				<h1 className="text-4xl md:text-5xl font-bold mb-6">
					welcome back
				</h1>
				<form
					action="/api/login"
					method="POST"
					className="flex flex-col gap-3 w-full max-w-sm"
				>
					<input
						name="password"
						type="password"
						placeholder="password"
						className="border p-2 rounded-sm"
					/>

					{params.error && (
						<p className="border p-2 rounded-sm py-2 px-4 bg-red-600 text-gray-100 font-semibold">
							wrong password
						</p>
					)}

					<button
						type="submit"
						className="text-xl border p-2 rounded-sm cursor-pointer py-2 px-4 bg-blue-600 text-gray-100 hover:opacity-80 font-semibold"
					>
						login
					</button>
				</form>
				<Link
					title="let's go home"
					href="/"
					className="mt-6 font-semibold hover:text-gray-500"
				>
					back to homepage
				</Link>
			</div>
		</main>
	);
}
