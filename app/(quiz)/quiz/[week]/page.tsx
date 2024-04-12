"use client";

import React, { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import ScoreModal from "@/components/score-card-modal";
import { Question } from "@/types/Question";
import { questionsByWeek } from "@/components/data/questions";

interface QuizProps {
	params: {
		week: string;
	};
}

const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

const Quiz: React.FC<QuizProps> = ({ params }) => {
	const [currentQuestions, setCurrentQuestions] = useState<Question[]>(
		[]
	);
	const [currentQuestionIndex, setCurrentQuestionIndex] =
		useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const { week } = params;

	const returnHome = () => {
		if (typeof window !== "undefined") {
			router.push("/");
		}
	};

	useEffect(() => {
		const selectedWeek = week;
		const weekQuestions = questionsByWeek[selectedWeek];
		if (weekQuestions) {
			const shuffledQuestions = [...weekQuestions];
			shuffleArray(shuffledQuestions);
			shuffledQuestions.forEach((q) => shuffleArray(q.options));
			setCurrentQuestions(shuffledQuestions);
		}
	}, [week]);

	const handleAnswer = (option: string) => {
		if (option === currentQuestions[currentQuestionIndex].answer) {
			setScore(score + 1);
		}
		if (currentQuestionIndex < currentQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setShowModal(true);
		}
	};

	return (
		<div className="p-2">
			<div className="text-center text-xl font-light"> {`week ${week.slice(4)} assignment`} </div>
			<div
				className="cursor-pointer h-10 float-right mr-3 mt-3 md:mt-[10%] md:mr-[5%]"
				onClick={() => returnHome()}
			>
				<Home />
			</div>
			<div className="text-2xl md:text-3xl font-semibold p-7 md:p-10">
				{currentQuestions[currentQuestionIndex]?.question}
			</div>
			<div className="grid md:grid-cols-2 gap-3 p-5">
				{currentQuestions[currentQuestionIndex]?.options.map(
					(option, index) => (
						<div
							key={index}
							onClick={() => handleAnswer(option)}
							className="cursor-pointer text-center mt-10 lg:mt-16 mx-7 md:mx-16 lg:mx-[25%] rounded-lg border border-gray-300 p-4 hover:bg-gray-100 transition duration-300"
						>
							{option}
						</div>
					)
				)}
				{/* </div> */}
			</div>
			{showModal && (
				<ScoreModal
					score={score}
					totalQuestions={currentQuestions.length}
					onClose={() => setShowModal(false)}
				/>
			)}
		</div>
	);
};

export default Quiz;
