// // components/landing/TrustedBySection.tsx

// "use client";

// import { motion, type Variants } from "framer-motion";
// import Image from "next/image";

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] },
//   },
// };

// const stagger: Variants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.09 } },
// };

// const TRUSTED_REGIONS = [
//   { name: "Dhaka", students: "5,400+" },
//   { name: "Chittagong", students: "2,800+" },
//   { name: "Sylhet", students: "1,200+" },
//   { name: "Rajshahi", students: "890+" },
//   { name: "Khulna", students: "650+" },
//   { name: "Barisal", students: "520+" },
// ];

// export default function TrustedBySection() {
//   return (
//     <section className="bg-white px-4 py-20">
//       <div className="mx-auto max-w-5xl">
//         <motion.div
//           variants={stagger}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="mb-3 text-center text-3xl font-bold text-[#111827]"
//           >
//             Trusted by Learners From
//           </motion.h2>
//           <motion.p variants={fadeUp} className="mb-12 text-center text-[#6b7280]">
//             Students across Bangladesh trust Bishuddho Academy for quality education
//           </motion.p>

//           <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {TRUSTED_REGIONS.map((region) => (
//               <motion.div
//                 key={region.name}
//                 variants={fadeUp}
//                 className="rounded-xl border border-[#e5e7eb] bg-gradient-to-br from-[#f9fafb] to-white p-6 text-center transition-all duration-300 hover:shadow-md hover:border-[#1a56db]"
//               >
//                 <h3 className="mb-2 text-lg font-bold text-[#111827]">
//                   {region.name}
//                 </h3>
//                 <p className="text-sm font-semibold text-[#1a56db]">
//                   {region.students} Students
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }