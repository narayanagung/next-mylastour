import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/isAdmin";
import { redirect, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export const metadata = {
	title: "edit",
};

export default async function EditPage({
	searchParams,
	params,
}: {
	searchParams: Promise<{
		error?: string;
	}>;
	params: Promise<{ id: string }>;
}) {
	const param = await searchParams;

	const admin = await isAdmin();

	if (!admin) {
		redirect("/admin/login");
	}

	const { id } = await params;

	const post = await prisma.post.findUnique({
		where: {
			id: Number(id),
		},
	});

	if (!post) {
		notFound();
	}

	return (
		<main className="max-w-7xl mx-auto px-5 py-5">
			<Navbar />

			<h1 className="text-4xl md:text-5xl font-bold mb-6">
				edit {post.title}
			</h1>
			<form
				action={`/api/edit/${post.id}`}
				method="POST"
				className="flex flex-col gap-3 max-w-md"
			>
				<input
					name="title"
					defaultValue={post.title}
					placeholder="title"
					className="border p-2 rounded-sm"
					required
				/>

				<textarea
					name="description"
					defaultValue={post.description}
					placeholder="description"
					className="border p-2 rounded-sm"
					required
				/>

				<textarea
					name="note"
					defaultValue={post.note}
					placeholder="note"
					className="border p-2 rounded-sm"
					required
				/>

				<input
					name="date"
					type="date"
					defaultValue={post.date?.toISOString().split("T")[0]}
					className="border p-2 rounded-sm"
					required
				/>

				<input
					name="latitude"
					defaultValue={post.latitude}
					placeholder="latitude"
					className="border p-2 rounded-sm"
					required
				/>

				<input
					name="longitude"
					defaultValue={post.longitude}
					placeholder="longitude"
					className="border p-2 rounded-sm"
					required
				/>

				{param.error && (
					<p className="border p-2 rounded-sm py-2 px-4 bg-red-600 text-gray-100 font-semibold">
						latitude and longitude value must be a number
					</p>
				)}

				<button
					type="submit"
					className="text-xl border p-2 rounded-sm cursor-pointer py-2 px-4 bg-blue-600 text-gray-100 font-semibold hover:opacity-80"
				>
					save changes
				</button>
			</form>
		</main>
	);
}
