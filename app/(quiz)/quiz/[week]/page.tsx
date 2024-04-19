"use client";

import React, { useState, useEffect } from "react";
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

interface QuizProps {
	params: {
		week: string;
	};
}

const Quiz: React.FC<QuizProps> = (props: QuizProps) => {
	const [score, setScore] = useState<number>(0);
	const [showScore, setShowScore] = useState<boolean>(false);
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const [questions, setQuestions] = useState<Record<string, Question[]>>(
		{}
	);

	const router = useRouter();

	const { week } = props.params;

	const [submittedStatus, setSubmittedStatus] = useState<boolean[]>(
		new Array(questions[week]?.length).fill(false)
	);

	useEffect(() => {
		const weekQuestions = questionsByWeek[week];
		if (weekQuestions) {
			const shuffledQuestions = shuffleArray(weekQuestions);
			shuffledQuestions.forEach((q) => {
				q.options = shuffleArray(q.options);
			});
			setQuestions((prevState) => ({
				...prevState,
				[week]: shuffledQuestions,
			}));
			setSelectedAnswers(
				new Array(shuffledQuestions.length).fill("")
			);
		}
	}, [week]);

	useEffect(() => {
		if (submittedStatus.every((status) => status)) {
			const newScore =
				questions[week]?.reduce((acc, question, index) => {
					if (question.answer === selectedAnswers[index]) {
						return acc + 1;
					}
					return acc;
				}, 0) || 0;
			setScore(newScore);
			setShowScore(true);
		}
	}, [submittedStatus]);

	const handleAnswer = (option: string, index: number) => {
		const newSelectedAnswers = [...selectedAnswers];
		newSelectedAnswers[index] = option;
		setSelectedAnswers(newSelectedAnswers);
		const newSubmittedStatus = [...submittedStatus];
		newSubmittedStatus[index] = true;
		setSubmittedStatus(newSubmittedStatus);
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

			<div className="text-center text-xl font-light underline mb-10">{`Week ${week.slice(
				4
			)} Assignment`}</div>

			<div className="p-5 flex flex-col space-y-20">
				{questions[week]?.map((question, index) => (
					<div key={index}>
						<div className="font-semibold">
							{question.question}
						</div>
						<div className="grid md:grid-cols-4 md:gap-20 gap-5 mt-3">
							{question.options.map(
								(option, optionIndex) => {
									const isSelected =
										selectedAnswers[index] === option;
									const isCorrect =
										option === question.answer;
									const isSubmitted =
										submittedStatus[index];
									const optionClass = `cursor-pointer text-center rounded-lg border p-4 ${
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
											onClick={() => {
												if (!isSubmitted)
													handleAnswer(
														option,
														index
													);
											}}
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
			{showScore && (
				<div className="md:text-6xl text-3xl font-mono mb-10">
					<div className="font-semibold">
						{score === 10 ? "🎉" : ""} Your score is: {score}/
						{10} {score === 10 ? "🎉" : ""}
					</div>
				</div>
			)}
		</div>
	);
};

export default Quiz;
