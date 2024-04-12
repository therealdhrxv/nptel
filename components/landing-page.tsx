import type { FC } from "react";

const AppTitle: FC = function () {
	return (
		<section className="bg-white mt-[10%]">
			<div className="mx-auto max-w-screen-xl px-4 pt-8 text-center lg:px-12 lg:pt-16">
				<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
					Get &apos;S&apos; in your NPTEL course
				</h1>
				<p className="mb-8 text-gray-500 sm:px-16 md:text-lg lg:text-xl xl:px-48">
					Welcome to &quot;Forests and Their Management&quot; Quiz
					Platform. Prepare for your NPTEL FAT with this platform
					featuring 12 quizzes all the way from weeks 1 to 12.
				</p>
				<div className="flex flex-col lg:mt-[10%] mt-[40%] space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
					<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md md:text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
						<span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
							🚀  Start Practising 🚀
						</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default AppTitle;
