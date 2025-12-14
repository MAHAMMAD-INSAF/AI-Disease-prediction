import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Button from "../components/Button";
import bg from "../assets/bg2.png";
import { FaHeartbeat, FaShieldAlt, FaBrain, FaUserMd } from "react-icons/fa";

export default function Home() {
	const features = [
		{ icon: FaShieldAlt, title: "Secure & Private", desc: "Your health data is protected with enterprise-grade security." },
		{ icon: FaBrain, title: "AI-Powered", desc: "Advanced  AI model for accurate predictions." },
		{ icon: FaUserMd, title: "Expert Guidance", desc: "Get personalized health insights and recommendations." },
	];

	return (
		<div className="min-h-[calc(100vh-120px)] relative overflow-hidden">
			{/* Background with overlay */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url(${bg})`,
					filter: "blur(2px)",
					// backgroundPosition: "center",
					// backgroundSize: "cover",
				}}
			/>
			<div className="absolute inset-0 bg-gradient-to-br from-primary-teal/20 via-primary-blue/20 to-primary-indigo/20" />

			{/* Content */}
			<div className="relative z-10 flex items-center justify-center min-h-full px-4 sm:px-8 py-12">
				<div className="max-w-6xl mx-auto text-center">
					{/* Hero Section */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="mb-16"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
							className="inline-block mb-8"
						>
							<FaHeartbeat className="text-6xl md:text-7xl text-red-500 drop-shadow-lg animate-pulse" />
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
						>
							Welcome to <span className="text-gradient">HealthPredict</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}
							className="text-xl font-semibold sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed"
						>
							Experience the future of healthcare with AI-powered disease prediction platform.
							Get accurate insights and take control of your health journey.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.6 }}
						>
							<Link to="/patient-info" aria-label="Start Your Health Assessment">
								<Button className="px-10 sm:px-16 py-4 sm:py-5 text-xl sm:text-2xl font-bold shadow-professional-hover transform hover:scale-105 transition-all duration-300">
									Start Diagnosis
								</Button>
							</Link>
						</motion.div>
					</motion.div>

					{/* Features Section */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.8 }}
						className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
					>
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
								whileHover={{ y: -5 }}
								className="bg-card/50 backdrop-blur-md rounded-2xl p-6 border border-border/20 shadow-professional"
							>
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className="inline-block mb-4"
								>
									<feature.icon className="text-4xl text-white" />
								</motion.div>
								<h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
								<p className="text-slate-300 leading-relaxed">{feature.desc}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
