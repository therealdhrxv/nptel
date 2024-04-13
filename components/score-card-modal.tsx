import React from "react";
import { useRouter } from "next/navigation";

type ScoreModalProps = {
	score: number;
	totalQuestions: number;
	onClose: () => void;
};

const ScoreModal: React.FC<ScoreModalProps> = ({
	score,
	totalQuestions,
	onClose,
}) => {
	const router = useRouter();

	const handleClose = () => {
		onClose();
		router.push("/");
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded-md space-y-4">
				<div className="text-center text-2xl">
					{score === totalQuestions ? "🎉" : ""} Your score is:{" "}
					{score}/{totalQuestions} {score === totalQuestions ? "🎉" : ""}
				</div>
				<button
					onClick={handleClose}
					className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default ScoreModal;
