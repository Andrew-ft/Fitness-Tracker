import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Activity, CalendarCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 via-transparent to-black opacity-30 blur-5xl pointer-events-none"></div>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="landing-page-frist-section h-screen flex flex-col justify-center items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl font-bold text-white tracking-wide"
        >
          <h1 className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
            Transform Your
          </h1>
          <h1>Fitness Journey</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-7 text-lg opacity-60"
        >
          Track workouts, monitor progress. Your all-in-one platform for
          achieving fitness goals.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex gap-4 mt-7"
        >
          <Link to="/register" className="flex items-center gap-2 text-white">
            <Button className="cursor-pointer w-45 py-5 shadow-[0px_5px_15px_rgba(231,30,79,0.4)]">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/login">
            <Button className="cursor-pointer w-20 py-5" variant="outline">
              Sign In
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* FEATURES SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="landing-page-second-section flex flex-col justify-center items-center text-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Everything You Need to{" "}
            <span className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Succeed
            </span>
          </h1>
          <p className="mt-3 text-md opacity-60 px-5">
            Comprehensive tools designed to help you reach your fitness goals
          </p>
        </div>

        {/* CARDS WITH STAGGER EFFECT */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10"
        >
          {[
            {
              icon: <Dumbbell className="flex mx-auto w-8 h-8" />,
              title: "Workout Library",
              text: "Access thousands of exercises with detailed instructions and video demonstrations.",
            },
            {
              icon: <Activity className="flex mx-auto w-8 h-8" />,
              title: "Progress Tracking",
              text: "Monitor your fitness journey with comprehensive analytics and visualizations.",
            },
            {
              icon: <CalendarCheck className="flex mx-auto w-8 h-8" />,
              title: "Routines",
              text: "Search existing routines or create a new customized routines.",
            },
            {
              icon: <Users className="flex mx-auto w-8 h-8" />,
              title: "Trainer",
              text: "There will also be trainers that will be assigned to each member",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="bg-rose-900/20 border border-rose-800/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md"
            >
              {item.icon}
              <h1 className="mt-5 mb-3 text-xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                {item.title}
              </h1>
              <p className="opacity-70">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* STATS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="landing-page-third-section mt-20 lg:mt-40 flex flex-col justify-center items-center text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-80 mx-10">
            {["Active Users", "Workouts", "Routines"].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h1 className="text-5xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                  10+
                </h1>
                <p className="opacity-70">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-30 p-3"
          >
            <h1 className="text-3xl font-bold">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                Fitness Journey
              </span>
              ?
            </h1>
            <p className="mt-2 opacity-70">
              Join thousands of users who have transformed their lives with CoreFitness
            </p>
            <Link to="/register">
              <Button className="cursor-pointer w-50 mt-15 mb-10 shadow-[0px_5px_15px_rgba(231,30,79,0.4)]">
                Start Working Out <ArrowRight className="w-15 h-5 text-white" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
