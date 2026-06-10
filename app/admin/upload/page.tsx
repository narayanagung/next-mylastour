import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/isAdmin";
import Navbar from "@/components/Navbar";

export const metadata = {
	title: "upload",
};

export default async function UploadPage({
	searchParams,
}: {
	searchParams: Promise<{
		error?: string;
	}>;
}) {
	const params = await searchParams;

	const admin = await isAdmin();

	if (!admin) {
		redirect("/admin/login");
	}

	return (
		<main className="max-w-7xl mx-auto px-5">
			<Navbar />

			<h1 className="text-4xl md:text-5xl font-bold mb-6">
				create new post
			</h1>

			<form
				action="/api/upload"
				method="POST"
				encType="multipart/form-data"
				className="flex flex-col gap-6 max-w-md"
			>
				<input
					name="title"
					placeholder="title"
					className="border p-2 rounded-sm"
					required
				/>

				<textarea
					name="description"
					placeholder="description"
					className="border p-2 rounded-sm"
					required
				/>

				<textarea
					name="note"
					placeholder="note"
					className="border p-2 rounded-sm"
					required
				/>

				<input
					name="date"
					type="date"
					className="border p-2 rounded-sm"
					required
				/>

				<input
					name="latitude"
					placeholder="latitude"
					className="border p-2 rounded-sm"
					required
				/>

				<input
					name="longitude"
					placeholder="longitude"
					className="border p-2 rounded-sm"
					required
				/>

				<input
					type="file"
					name="photos"
					className="border p-2 rounded-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0  file:bg-gray-100 file:text-gray-950 file:cursor-pointer hover:file:opacity-80"
					multiple
					required
				/>

				{params.error && (
					<p className="border p-2 rounded-sm py-2 px-4 bg-red-600 text-gray-100 font-semibold">
						latitude and longitude value must be a number
					</p>
				)}

				<button
					type="submit"
					className="text-xl border p-2 rounded-sm cursor-pointer py-2 px-4 bg-blue-600 text-gray-100 font-semibold hover:opacity-80"
				>
					upload
				</button>
			</form>
		</main>
	);
}
