import { motion } from "framer-motion";

export default function AboutIndex() {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ type: "spring", stiffness: 260, damping: 20 }}
			className="flex flex-col items-center justify-center"
		>
			<div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border-4 border-[#0F8FFA] bg-[#1a2527] p-8 shadow-[0_0_30px_rgba(15,143,250,0.2)]">

				{/* About Header */}
				<div className="mb-6 flex w-full flex-col items-center justify-center rounded-lg border-b-4 border-[#131A1C] bg-[#0F8FFA] py-2 text-center">
					<span className="text-sm font-black uppercase tracking-[0.2em] text-white">
						Voucher: Professional Summary
					</span>
				</div>

				<div className="flex flex-col gap-6">
					<section>
						<h2 className="text-3xl font-black uppercase text-white [text-shadow:3px_3px_0px_rgba(0,0,0,1)]">
							Background
						</h2>
						<p className="mt-2 text-lg text-gray-300 leading-relaxed">
							I'm a <span className="text-[#0F8FFA] font-bold">Software Engineer</span> based in Berlin,
							specializing in full-stack development. I enjoy deconstructing complex problems and
							rebuilding them into efficient, scalable systems. Currently, I'm exploring the
							frontiers of edge computing and reactive UI patterns.
						</p>
					</section>

					<section className="rounded-xl bg-black/30 p-4 border-l-4 border-[#0F8FFA]">
						<h3 className="text-xl font-black uppercase text-white mb-3">Core Loadout</h3>
						<div className="flex flex-wrap gap-2">
							<SkillTag label="React" />
							<SkillTag label="TypeScript" />
							<SkillTag label="Remix" />
							<SkillTag label="Arch Linux" />
							<SkillTag label="Tailwind CSS" />
							<SkillTag label="Cloudflare Workers" />
							<SkillTag label="PostgreSQL" />
						</div>
					</section>
				</div>

				{/* Decorative "Stamp" */}
				<div className="absolute -bottom-2 -right-2 rotate-[-15deg] text-5xl font-black text-[#0F8FFA]/10 uppercase italic select-none">
					Verified
				</div>
			</div>
		</motion.div>
	);
}

function SkillTag({ label }: { label: string }) {
	return (
		<span className="bg-[#131A1C] border-b-2 border-[#0F8FFA] px-3 py-1 text-xs font-bold uppercase tracking-tight text-white">
			{label}
		</span>
	);
}