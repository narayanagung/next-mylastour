import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
	description:
		"personal story behind #mylastour inspired by Girl's Last Tour, motorcycles, photography, solitude, and traveling across Bali.",
	keywords: [
		"Girl's Last Tour",
		"Tsukumizu",
		"motorcycle travel",
		"Bali travel",
		"photography blog",
		"personal blog",
		"travel journal",
		"slice of life",
		"urban exploration",
		"mylastour",
	],

	openGraph: {
		description:
			"a travel journal inspired by Girl's Last Tour across Bali by motorcycle.",
		url: "https://www.lastour.my.id",
		siteName: "mylastour",
	},

	authors: [{ name: "narayanagung" }],

	alternates: { canonical: "/" },

	category: "travel journal",
};

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ sort?: string }>;
}) {
	const params = await searchParams;

	const posts = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			slug: true,
			photos: {
				select: {
					url: true,
				},
				take: 1,
			},
		},
		orderBy: {
			createdAt: params.sort === "old" ? "asc" : "desc",
		},
	});

	function optimizeCloudinary(url: string) {
		return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
	}

	return (
		<>
			<main className="max-w-7xl mx-auto px-5">
				<Navbar />

				<h1 className="text-5xl sm:text-6xl font-bold my-3 text-center">
					endless journey
				</h1>

				<p className="text-xl text-center my-6 font-semibold">
					#mylastour
				</p>

				<p className="text-gray-400  text-center mt-5 mb-6 text-lg md:text-xl">
					a personal motorcycle travel journal documenting roads,
					forgotten places, important and unimportant destinations,
					strange phenomenon, and the quiet moments found across Bali
					and beyond.
				</p>

				<div className="flex gap-2 mb-6 justify-center text-xl">
					<Link
						title="sort by newest"
						href="/?sort=new"
						className={`rounded-md pt-2 pb-3 px-4 flex items-center gap-2 transition ${
							params.sort !== "old"
								? "bg-gray-950 text-gray-100 border"
								: "hover:opacity-80"
						}`}
					>
						newest
					</Link>

					<Link
						title="sort by oldest"
						href="/?sort=old"
						className={`rounded-md pt-2 pb-3 px-4 flex items-center gap-2 transition ${
							params.sort === "old"
								? "bg-gray-950 text-gray-100 border"
								: "hover:opacity-80"
						}`}
					>
						oldest
					</Link>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
					{posts.map((post) => (
						<div
							key={post.id}
							className="group relative overflow-hidden rounded-lg"
						>
							<Link href={`/post/${post.slug}`}>
								<Image
									width={1280}
									height={960}
									sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
									src={optimizeCloudinary(
										post.photos[0]?.url,
									)}
									alt={`${post.title} photos`}
									className="w-full rounded-lg transition-transform duration-300 group-hover:scale-101"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
									<h2 className="text-white font-bold text-lg md:text-xl">
										{post.title}
									</h2>
									<p className="text-gray-200 text-sm line-clamp-2 mt-1 italic">
										"{post.description}"
									</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}
