import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import DeleteButton from "@/components/DeleteButton";
import { isAdmin } from "@/lib/isAdmin";
import { notFound } from "next/navigation";
import {
	MapPin,
	MapPinned,
	CalendarDays,
	SquarePen,
	NotebookPen,
} from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const post = await prisma.post.findUnique({
		where: { slug },
	});

	return {
		title: post?.title || slug,
		description: post?.description,
	};
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const admin = await isAdmin();

	const post = await prisma.post.findUnique({
		where: { slug },
		select: {
			id: true,
			title: true,
			description: true,
			note: true,
			latitude: true,
			longitude: true,
			date: true,
			photos: {
				select: {
					id: true,
					url: true,
				},
			},
		},
	});

	if (!post) {
		notFound();
	}

	function optimizeCloudinary(url: string) {
		return url.replace("/upload/", "/upload/f_auto,q_auto,w_1600/");
	}

	return (
		<>
			<main className="max-w-7xl mx-auto px-5 text-center">
				<Navbar />

				<h1 className="text-4xl md:text-5xl font-bold mb-3">
					{post.title}
				</h1>

				<div className="text-gray-400 flex items-center justify-center gap-4 my-5 md:text-xl">
					<a
						title="coordinates (lat, long)"
						href={`https://maps.google.com/?q=${post.latitude},${post.longitude}`}
						target="_blank"
						className="flex items-center justify-center rounded-lg cursor-pointer py-2 hover:text-gray-100"
					>
						<MapPin />
						{post.latitude}, {post.longitude}
					</a>
					<p
						title="date taken (dd/mm/yyyy)"
						className="flex items-center justify-center gap-1"
					>
						<CalendarDays />
						{post.date?.toLocaleDateString()}
					</p>
					{admin && (
						<>
							<form
								action={`/api/delete/${post.id}`}
								method="POST"
							>
								<DeleteButton />
							</form>

							<a
								title="edit this post"
								className="border p-2 rounded-lg cursor-pointer py-2 px-4 bg-black text-gray-100 hover:opacity-80"
								href={`/admin/edit/${post.id}`}
							>
								<SquarePen />
							</a>
						</>
					)}
				</div>

				<div className="grid grid-cols-1">
					{post.photos.map((photo) => (
						<Image
							width={2280}
							height={1960}
							alt={`${post.title} photos`}
							key={photo.id}
							src={optimizeCloudinary(photo.url)}
							sizes="(max-width: 768px) 100vw, 1200px"
							className="w-full rounded-lg object-cover lg:w-190 mx-auto border-2 border-gray-100"
							quality={80}
							loading="eager"
						/>
					))}
				</div>

				<p className="text-lg md:text-xl leading-relaxed my-5 italic text-gray-400 max-w-3xl mx-auto wrap-break-words">
					"{post.description}"
				</p>

				<p className="my-5 flex justify-center items-center font-semibold text-3xl gap-2">
					<NotebookPen size={40} />
				</p>

				<p className="text-lg md:text-xl leading-relaxed my-5 max-w-3xl mx-auto wrap-break-words md:text-justify">
					{post.note}
				</p>

				<p className="mt-8">
					<a
						title="precise location where the photos are taken"
						href={`https://maps.google.com/?q=${post.latitude},${post.longitude}`}
						target="_blank"
						className="text-2xl border rounded-lg cursor-pointer py-3 px-5 bg-blue-600 text-gray-100 font-semibold hover:opacity-80 inline-flex items-center gap-2 justify-center"
					>
						<MapPinned />
						take me there
					</a>
				</p>

				<iframe
					src={`https://www.google.com/maps?q=${post.latitude},${post.longitude}&t=p&z=13&output=embed`}
					className="mt-9 w-full max-w-3xl h-112.5 rounded-lg mx-auto border-2 border-gray-100"
					allowFullScreen
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</main>
			<Footer />
		</>
	);
}
