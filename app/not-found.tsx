import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
	return (
		<main className="min-h-screen flex items-center justify-center px-5">
			<div className="text-center flex flex-col items-center">
				<h1 className="text-6xl sm:text-7xl font-extrabold mb-2">
					404
				</h1>

				<p className="text-2xl font-semibold mb-2">you got lost</p>

				<p className="text-gray-400 mb-6 max-w-sm">
					the page you are looking for does not exist.
				</p>

				<Image
					src="/images/glt.gif"
					alt="chito and yuri from glt dancing"
					title="all credit to Tsukumizu"
					width={250}
					height={250}
				/>

				<Link
					title="let's go home"
					href="/"
					className="mt-6 font-semibold hover:text-gray-500"
				>
					back to homepage
				</Link>
			</div>
		</main>
	);
}
