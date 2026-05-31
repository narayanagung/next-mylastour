"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton() {
	return (
		<button
			title="delete this post"
			type="submit"
			className="border p-2 rounded-lg cursor-pointer py-2 px-4 bg-black text-gray-100 hover:opacity-80"
			onClick={(e) => {
				const ok = confirm("delete this post?");

				if (!ok) {
					e.preventDefault();
				}
			}}
		>
			<Trash2 />
		</button>
	);
}
