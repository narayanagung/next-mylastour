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
		include: {
			photos: true,
		},
		orderBy: {
			createdAt: params.sort === "old" ? "asc" : "desc",
		},
	});

	return (
		<>
			<main className="max-w-7xl mx-auto px-5">
				<Navbar />

				<h1 className="text-5xl sm:text-6xl font-bold my-3 text-center">
					#mylastour
				</h1>

				<p className="text-xl text-center my-6 font-semibold">
					endless journey.
				</p>

				<p className="dark:text-gray-400 text-gray-600 text-center mt-5 mb-6 text-lg md:text-xl">
					a personal motorcycle travel journal documenting roads,
					forgotten places, important and unimportant destinations,
					strange phenomenon, and the quiet moments found across Bali
					and beyond.
				</p>

				<div className="flex gap-2 mb-6 justify-center text-xl">
					<a
						title="sort by newest"
						href="/?sort=new"
						className={`rounded-lg py-2 px-4 flex items-center gap-2 transition ${
							params.sort !== "old"
								? "bg-gray-950 text-gray-100 border"
								: "hover:opacity-80"
						}`}
					>
						newest
					</a>

					<a
						title="sort by oldest"
						href="/?sort=old"
						className={`rounded-lg py-2 px-4 flex items-center gap-2 transition ${
							params.sort === "old"
								? "bg-gray-950 text-gray-100 border"
								: "hover:opacity-80"
						}`}
					>
						oldest
					</a>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
					{posts.map((post) => (
						<div
							className="group overflow-hidden rounded-lg"
							key={post.id}
						>
							<Link href={`/post/${post.slug}`}>
								<Image
									width={1280}
									height={960}
									title={post.description}
									alt={`${post.title} photos`}
									src={post.photos[0]?.url}
									className="w-full max-w-full rounded-lg group-hover:scale-99 hover:brightness-90"
									priority
								/>
							</Link>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}
