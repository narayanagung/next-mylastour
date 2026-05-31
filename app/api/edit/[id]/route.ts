import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import slugify from "slugify";

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

	const formData = await req.formData();

	const title = formData.get("title") as string;

	const description = formData.get("description") as string;

	const note = formData.get("note") as string;

	const date = new Date(formData.get("date") as string);

	const latitude = Number(formData.get("latitude"));

	const longitude = Number(formData.get("longitude"));

	if (!title || !description || !note || !date || isNaN(date.getTime())) {
		return Response.redirect(
			new URL(`/admin/edit/${id}?error=missingfieldvalue`, req.url),
		);
	}

	if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
		return Response.redirect(
			new URL(
				`/admin/edit/${id}?error=latitudeandlongitudemustbenumbers`,
				req.url,
			),
		);
	}

	const slug = slugify(title, {
		lower: true,
		strict: true,
	});

	await prisma.post.update({
		where: {
			id: Number(id),
		},
		data: {
			title,
			slug,
			description,
			note,
			date,
			latitude,
			longitude,
		},
	});

	return Response.redirect(new URL(`/post/${slug}`, req.url));
}
