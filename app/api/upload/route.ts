import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
	redirect("/admin/upload");
}

export async function POST(req: Request) {
	const cookieStore = await cookies();

	const token = cookieStore.get("token")?.value;

	if (!token || !verifyToken(token)) {
		return new Response("Unauthorized", {
			status: 401,
		});
	}

	const formData = await req.formData();

	const title = formData.get("title") as string;

	const description = formData.get("description") as string;

	const note = formData.get("note") as string;

	const date = new Date(formData.get("date") as string);

	const latitude = Number(formData.get("latitude"));

	const longitude = Number(formData.get("longitude"));

	const files = formData.getAll("photos") as File[];

	if (
		!title ||
		!description ||
		!note ||
		!date ||
		isNaN(date.getTime()) ||
		files.length === 0
	) {
		return Response.redirect(
			new URL("/admin/upload/?error=missingfieldvalue", req.url),
		);
	}

	if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
		return Response.redirect(
			new URL(
				"/admin/upload/?error=latitudeandlongitudemustbenumbers",
				req.url,
			),
		);
	}

	const slug = slugify(title, {
		lower: true,
		strict: true,
	});

	const uploadedPhotos: { url: string; publicId: string }[] = [];

	for (const file of files) {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const result = await new Promise<any>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						folder: "post",
					},
					(err, result) => {
						if (err) reject(err);
						else resolve(result);
					},
				)
				.end(buffer);
		});

		uploadedPhotos.push({
			url: result.secure_url,
			publicId: result.public_id,
		});
	}

	await prisma.post.create({
		data: {
			title,
			slug,
			description,
			note,
			date,
			latitude,
			longitude,

			photos: {
				create: uploadedPhotos.map((p) => ({
					url: p.url,
					publicId: p.publicId,
				})),
			},
		},
	});

	return Response.redirect(new URL("/", req.url));
}
