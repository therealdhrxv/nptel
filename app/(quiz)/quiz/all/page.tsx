"use client";

import React, { useState } from "react";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { questionsByWeek } from "@/components/data/questions";
import { Question } from "@/types/Question";

const shuffleArray = <T,>(array: T[]): T[] => {
	let shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [
			shuffledArray[j],
			shuffledArray[i],
		];
	}
	return shuffledArray;
};

const AllWeeksQuiz: React.FC = () => {
	const [score, setScore] = useState<number>(0);
	const [showScore, setShowScore] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const [questions, setQuestions] = useState<Question[]>([]);

	const router = useRouter();

	const fetchQuestions = () => {
		let allQuestions: Question[] = [];
		Object.entries(questionsByWeek).forEach(
			([week, weekQuestions]) => {
				weekQuestions.forEach((question) => {
					allQuestions.push(question);
				});
			}
		);
		if (allQuestions.length > 0) {
			const shuffledQuestions = shuffleArray(allQuestions);
			shuffledQuestions.forEach((q) => {
				q.options = shuffleArray(q.options);
			});
			setQuestions(shuffledQuestions);
			setSelectedAnswers(
				new Array(shuffledQuestions.length).fill("")
			);
		}
	};

	React.useEffect(() => {
		fetchQuestions();
	}, []);

	const handleAnswer = (option: string, index: number) => {
		if (!submitted) {
			const newSelectedAnswers = [...selectedAnswers];
			newSelectedAnswers[index] = option;
			setSelectedAnswers(newSelectedAnswers);
		}
	};

	const calculateScore = () => {
		let newScore = 0;
		questions.forEach((question, index) => {
			if (question.answer === selectedAnswers[index]) {
				newScore++;
			}
		});
		setScore(newScore);
		setShowScore(true);
		setSubmitted(true);
	};

	const returnHome = () => {
		if (typeof window !== "undefined") {
			router.push("/");
		}
	};

	return (
		<div className="p-2">
			<div
				className="cursor-pointer h-10 float-right mr-3 mt-3 md:mr-[5%]"
				onClick={returnHome}
			>
				<Home />
			</div>

			<div className="text-center text-xl font-light underline mb-10">
				All Weeks Assignment
			</div>

			<div className="p-5 flex flex-col space-y-20">
				{questions.map((question, index) => (
					<div key={index}>
						<div className="font-semibold">{`${index + 1}. ${
							question.question
						}`}</div>
						<div className="grid md:grid-cols-4 md:gap-20 gap-5 mt-3">
							{question.options.map(
								(option, optionIndex) => {
									const isSelected =
										selectedAnswers[index] === option;
									const isCorrect =
										option === question.answer;
									const isSubmitted = submitted;
									const optionClass = `cursor-pointer text-center rounded-lg border p-4 hover:bg-slate-100 transition ${
										isSubmitted
											? isCorrect
												? "bg-green-200"
												: isSelected
												? "bg-red-200"
												: ""
											: isSelected
											? "bg-slate-300"
											: ""
									}`;
									return (
										<div
											key={optionIndex}
											onClick={() =>
												handleAnswer(option, index)
											}
											className={optionClass}
										>
											{option}
										</div>
									);
								}
							)}
						</div>
					</div>
				))}
			</div>
			{!submitted ? (
				<div className="text-center mb-10">
					<button
						className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5"
						onClick={calculateScore}
					>
						Submit
					</button>
				</div>
			) : (
				<div className="text-center mb-10">
					<button
						className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5"
						onClick={returnHome}
					>
						Done
					</button>
				</div>
			)}
			{showScore && (
				<div className="md:text-6xl text-3xl font-mono mb-10">
					<div className="font-semibold">
						Your score is: {score}/{questions.length}
					</div>
				</div>
			)}
		</div>
	);
};

export default AllWeeksQuiz;
