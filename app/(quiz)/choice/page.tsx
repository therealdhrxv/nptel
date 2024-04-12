"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Choose: React.FC = () => {
	const [selectedWeek, setSelectedWeek] = useState<string>("");

	const router = useRouter();

	const handleWeekSelection = (week: string) => {
		setSelectedWeek(week);
		if (typeof window !== "undefined") {
			router.push(`/quiz/${week}`);
		}
	};

	return (
		<>
			<div>
				Please select which week would you like to practise -
			</div>
			<div className="flex flex-col space-y-9">
				<button onClick={() => handleWeekSelection("week1")}>
					week 1
				</button>
				<button onClick={() => handleWeekSelection("week2")}>
					week 2
				</button>
				<button onClick={() => handleWeekSelection("week3")}>
					week 3
				</button>
				<button onClick={() => handleWeekSelection("week4")}>
					week 4
				</button>
				<button onClick={() => handleWeekSelection("week5")}>
					week 5
				</button>
				<button onClick={() => handleWeekSelection("week6")}>
					week 6
				</button>
				<button onClick={() => handleWeekSelection("week7")}>
					week 7
				</button>
				<button onClick={() => handleWeekSelection("week8")}>
					week 8
				</button>
				<button onClick={() => handleWeekSelection("week9")}>
					week 9
				</button>
				<button onClick={() => handleWeekSelection("week10")}>
					week 10
				</button>
				<button onClick={() => handleWeekSelection("week11")}>
					week 11
				</button>
			</div>
		</>
	);
};

export default Choose;
