import Navbar from "@/components/Navbar";

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
		<main className="max-w-7xl mx-auto px-5">
			<Navbar />

			<h1 className="text-4xl md:text-5xl font-bold mb-6">
				welcome back
			</h1>
			<form
				action="/api/login"
				method="POST"
				className="flex flex-col gap-3 max-w-sm"
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
		</main>
	);
}
