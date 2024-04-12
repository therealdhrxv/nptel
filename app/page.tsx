import AppTitle from "@/components/landing-page";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Link href="/choice">
				<AppTitle />
			</Link>
		</>
	);
}
