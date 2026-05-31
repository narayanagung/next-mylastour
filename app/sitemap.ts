import { prisma } from "@/lib/prisma";

export default async function sitemap() {
	const posts = await prisma.post.findMany();

	const postUrls = posts.map((post) => ({
		url: `https://www.lastour.my.id/post/${post.slug}`,
		lastModified: post.updatedAt || post.createdAt,
	}));

	return [
		{
			url: "https://www.lastour.my.id",
			lastModified: new Date(),
		},
		{
			url: "https://www.lastour.my.id/about",
			lastModified: new Date(),
		},

		...postUrls,
	];
}
