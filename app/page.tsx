import AppTitle from "@/components/landing-page";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Link href="/choice">
				<AppTitle />
			</Link>
			<div className="font-mono mt-28 text-center p-10 leading-loose">
				Please feel free to contribute to this project! Your
				inputs can make it even better. If you have ideas or
				improvements, feel
				free to drop a PR{" "}
				<a
					href="https://github.com/therealdhrxv/nptel/"
					target="_blank"
				>
					<u> here </u>
				</a>
			</div>
		</>
	);
}
