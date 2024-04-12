"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Home } from "lucide-react";

const Choose: React.FC = () => {
	const [selectedWeek, setSelectedWeek] = useState<string>("");

	const router = useRouter();

	const handleWeekSelection = (week: string) => {
		setSelectedWeek(week);
		if (typeof window !== "undefined") {
			router.push(`/quiz/${week}`);
		}
	};

	const returnHome = () => {
		if (typeof window !== "undefined") {
			router.push("/");
		}
	}

	return (
		<>
			<div className="text-2xl md:text-3xl font-semibold p-7 md:p-20 flex justify-between space-x-6">
				<div>
					Please select which week you would like to practice -
				</div>
				<div className="cursor-pointer h-10" onClick={() => returnHome()}>
					<Home />
				</div>
			</div>
			<div className="grid md:grid-cols-6 gap-8 md:gap-6 lg:gap-8 p-10">
				{Array.from({ length: 11 }, (_, i) => `week${i + 1}`).map(
					(week) => (
						<button
							key={week}
							onClick={() => handleWeekSelection(week)}
							className="bg-slate-500 text-white font-bold md:h-28 md:text-xl py-2 px-4 rounded hover:bg-slate-700 transition duration-150 ease-in-out"
						>
							{`week - ${week.slice(4)}`}
						</button>
					)
				)}
			</div>
		</>
	);
};

export default Choose;
