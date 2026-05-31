import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function isAdmin() {
	const cookieStore = await cookies();

	const token = cookieStore.get("token")?.value;

	if (!token) {
		return false;
	}

	const valid = verifyToken(token);

	return !!valid;
}
