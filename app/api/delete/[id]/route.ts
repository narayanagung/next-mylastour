import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
export async function POST(
	req: Request,
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {
	const cookieStore = await cookies();

	const token = cookieStore.get("token")?.value;

	if (!token || !verifyToken(token)) {
		new URL("/admin/login", req.url);
	}

	const { id } = await params;

	const post = await prisma.post.findUnique({
		where: {
			id: Number(id),
		},
		include: {
			photos: true,
		},
	});

	if (!post) {
		return new Response("Not found", {
			status: 404,
		});
	}

	for (const photo of post.photos) {
		if (photo.publicId) {
			await cloudinary.uploader.destroy(photo.publicId);
		}
	}

	await prisma.photo.deleteMany({
		where: {
			postId: post.id,
		},
	});

	await prisma.post.delete({
		where: {
			id: post.id,
		},
	});

	return Response.redirect(new URL("/", req.url));
}
