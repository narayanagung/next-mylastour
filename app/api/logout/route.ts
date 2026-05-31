import { serialize } from "cookie";

export async function POST() {
	return new Response("Logged out", {
		status: 302,
		headers: {
			Location: "/",
			"Set-Cookie": serialize("token", "", {
				path: "/",
				httpOnly: true,
				expires: new Date(0),
			}),
		},
	});
}
