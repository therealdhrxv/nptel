"use client";

import React, { useState, useEffect } from "react";

import { questionsByWeek } from "@/components/data/questions";
import { Question } from "@/types/Question";

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

	const { week } = params;

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
			alert(
				`Quiz completed! Your score is: ${score + 1}/${
					currentQuestions.length
				}`
			);
		}
	};

	return (
		<div>
			<div className="flex-col mt-9 md:mt-2 align-middle space-y-10 lg:space-y-16">
				<div className="font-bold text-xl p-5">
					{currentQuestions[currentQuestionIndex]?.question}
				</div>
				<div>
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
				</div>
			</div>
		</div>
	);
};

export default Quiz;
