import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, UploadCloud, ShieldCheck, History } from "lucide-react";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white">
      {/* HERO SECTION */}
      <header className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ChemEquip Analytics
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Smart visualization platform for chemical equipment data. Upload CSV files and instantly view analytics, charts, summaries and history.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 border border-indigo-500 rounded-xl hover:bg-indigo-500/20"
            >
              Register
            </Link>
          </div>
        </motion.div>
      </header>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{
          icon: UploadCloud,
          title: "CSV Upload",
          text: "Upload sensor or equipment data securely and instantly process it.",
        },{
          icon: BarChart3,
          title: "Visual Analytics",
          text: "View flowrate, pressure & temperature insights in dynamic charts.",
        },{
          icon: History,
          title: "Upload History",
          text: "Track and revisit previous uploaded datasets easily.",
        },{
          icon: ShieldCheck,
          title: "Secure Access",
          text: "Protected routes with authentication system.",
        }].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-lg"
          >
            <f.icon size={36} className="text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-300 text-sm">{f.text}</p>
          </motion.div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Login to your account",
            "Upload CSV equipment file",
            "Instant analytics & reports"
          ].map((step, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl">
              <span className="text-indigo-400 text-2xl font-bold">
                {i + 1}
              </span>
              <p className="mt-3 text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <footer className="py-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to visualize your chemical data?
        </h3>
        <Link
          to="/register"
          className="inline-block mt-4 px-10 py-3 bg-indigo-600 rounded-2xl shadow-lg hover:bg-indigo-700"
        >
          Get Started
        </Link>
         <p className="text-sm text-gray-400 mt-6 font-extrabold">
         Name: Ritesh Yevatkar 
        </p>
         <p className="text-sm text-gray-400 mt-6">
         Mail : 2023bit027@sggs.ac.in
        </p>
        <p className="text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} ChemEquip Analytics
        </p>
      </footer>
    </div>
  );
}
