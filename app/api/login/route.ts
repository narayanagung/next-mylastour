import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const PASSWORD = process.env.ADMIN_PASSWORD!;

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
	const formData = await req.formData();

	const password = formData.get("password");

	if (password !== PASSWORD) {
		return Response.redirect(
			new URL("/admin/login?error=wrongpassword", req.url),
		);
	}

	const token = jwt.sign({ admin: true }, SECRET);

	return new Response("Logged in", {
		status: 302,
		headers: {
			Location: "/",
			"Set-Cookie": serialize("token", token, {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
			}),
		},
	});
}
