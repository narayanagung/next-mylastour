import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "about",
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
		title: "about | endless journey",
		description:
			"the story behind #mylastour, inspired by Girl's Last Tour and traveling across Bali by motorcycle.",
		url: "https://www.lastour.my.id/about",
		siteName: "mylastour",
		images: [
			{
				url: "/images/tour.jpg",
				width: 1379,
				height: 974,
				alt: "an image from Girl's Last Tour manga that i'm trying to replicate",
			},
		],
		locale: "en_US",
		type: "website",
	},

	authors: [{ name: "narayanagung" }],

	alternates: { canonical: "https://www.lastour.my.id/about" },

	category: "travel journal",
};

export default function AboutPage() {
	return (
		<>
			<main className="max-w-7xl mx-auto px-5">
				<Navbar />

				<h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
					summary
				</h1>

				<p className="text-lg md:text-xl leading-relaxed my-5 max-w-3xl mx-auto wrap-break-words text-center md:text-justify italic">
					"as they traverse a desolate world aboard their motorized
					vehicle. the world they inhabit is on the brink of total
					collapse, with vast, decaying cityscapes and empty factories
					devoid of life. society as they once knew it has long
					disappeared, leaving them to scavenge for food, fuel, and
					shelter while exploring the ruins of civilization"
				</p>

				<Image
					src="/images/tour.jpg"
					alt="an image from Girl's Last Tour manga that i'm trying to replicate"
					title="all credit to Tsukumizu"
					width={1379}
					height={974}
					sizes="(max-width: 768px) 100vw, 1200px"
					className="w-full max-w-3xl mx-auto h-auto rounded-lg border-2 border-gray-100"
					quality={80}
				/>

				<p className="font-bold text-2xl md:text-4xl leading-relaxed mb-5 mt-6 max-w-3xl mx-auto wrap-break-words text-center">
					***
				</p>

				<p className="text-lg md:text-xl leading-relaxed my-5 max-w-3xl mx-auto wrap-break-words text-center md:text-justify">
					<i>Girl's Last Tour</i> is a six-volume comic by Tsukumizu
					that profoundly changed the way i live in this world. during
					some of the most exhausting and fearful moments of my life,
					this comic influenced me to let go and not overthink the
					small details of life, saving me from many of the dangers
					that were constantly on my mind. the instagram account,
					along with the theme and photos I post, stemmed from my
					decision to approach social media more honestly, no longer
					obsessing over the 'image' that used to make me anxious and
					fearful about what to share with others.
				</p>
				<p className="text-lg md:text-xl leading-relaxed my-5 max-w-3xl mx-auto wrap-break-words text-center md:text-justify">
					the shift began during what I consider the worst year i've
					ever experienced and i'm sure many would agree-2020, the
					start of the COVID-19 pandemic. having so much free time
					didn't necessarily bring happiness, especially since school
					at that time didn't feel like it used to be at all. after
					graduating from vocational school, working immediately
					became a necessity due to our financial situation, which
					was, well, not great.
				</p>
				<p className="text-lg md:text-xl leading-relaxed my-5 max-w-3xl mx-auto wrap-break-words text-center md:text-justify">
					2021, i found that working was much more enjoyable than i
					had expected. yes, there were stressful and overwhelming
					moments, just like in school, but at least there was
					compensation for the stress in the end of each month. of
					course, i couldn't use all of it for myself, definitely
					not-but it was enough to cover a month's worth of fuel for
					my motorcycle and maybe a little for snacks.
				</p>
				<p className="text-lg md:text-xl leading-relaxed my-5 max-w-3xl mx-auto wrap-break-words text-center md:text-justify">
					commuting to work monday through friday and then go home
					from my rented room over the course of a year really made me
					fall in love with riding my motorcycles. it all started with
					my daily school commute in 2016, covering about 16
					kilometers a day, and then evolved into weekly trips of
					around 120 kilometers to return home from where I was
					working in 2021, i became very familiar with the roads I
					traveled regularly.
				</p>
				<p className="text-lg md:text-xl leading-relaxed my-5 max-w-3xl mx-auto wrap-break-words text-center md:text-justify">
					that's when an idea struck me{" "}
					<i>
						"if i can ride 120 kilometers a week on my motorcycle,
						wouldn't it be easy to ride all around Bali in just
						three days?"{" "}
					</i>
					i thought to myself. and with that thought, combined with my
					love for traveling, i began{" "}
					<Link
						title="start here"
						href="/"
						className="font-semibold cursor-pointer hover:text-gray-500"
					>
						#mylastour.
					</Link>
				</p>
				<Image
					src="/images/glt.png"
					alt="glt png"
					title="all credit to Tsukumizu"
					width={1459}
					height={1041}
					sizes="(max-width: 768px) 100vw, 1200px"
					className="w-full max-w-3xl mx-auto h-auto rounded-lg border-2 border-gray-100"
					quality={80}
				/>
			</main>
			<Footer />
		</>
	);
}
