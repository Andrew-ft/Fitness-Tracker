import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Dumbbell } from "lucide-react";
import { Activity } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 via-transparent to-black opacity-30 blur-5xl pointer-events-none"></div>
      <div className="landing-page-frist-section h-screen flex flex-col justify-center items-center text-center">
        <div className="text-5xl font-bold text-white tracking-wide">
          <h1 className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
            Transform Your
          </h1>
          <h1>Fitness Journey</h1>
        </div>
        <p className="mt-7 text-lg opacity-60">
          Track workouts, monitor progress. Your all-in-one platform for
          achieving fitness goals.
        </p>
        <div className="flex gap-4 mt-7">
          <Link to="/register" className="flex items-center gap-2 text-white">
            <Button className="cursor-pointer w-45 py-5 shadow-[0px_5px_15px_rgba(231,30,79,0.4)]">
              {" "}
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/login">
            <Button className="cursor-pointer w-20 py-5" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <div className="landing-page-second-section flex flex-col justify-center items-center text-center">
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

        <div className="mt-20  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10">
          <div className="bg-rose-900/20 border border-rose-800/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md">
            <Dumbbell className="flex mx-auto w-8 h-8" />
            <h1 className="mt-5 mb-3 text-xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Workout Library
            </h1>
            <p className="opacity-70">
              Access thousands of exercises with detailed instructions and video
              demonstrations.
            </p>
          </div>

          <div className="bg-rose-900/20 border border-rose-800/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md">
            <Activity className="flex mx-auto w-8 h-8" />
            <h1 className="mt-5 mb-3 text-xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Progress Tracking
            </h1>
            <p className="opacity-70">
              Monitor your fitness journey with comprehensive analytics and
              visualizations.
            </p>
          </div>

          <div className="bg-rose-900/20 border border-rose-800/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md">
            <CalendarCheck className="flex mx-auto w-8 h-8" />
            <h1 className="mt-5 mb-3 text-xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Routines
            </h1>
            <p className="opacity-70">
              Search existing routines or create a new customized routines.
            </p>
          </div>

          <div className="bg-rose-900/20 border border-rose-800/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md">
            <Users className="flex mx-auto w-8 h-8" />
            <h1 className="mt-5 mb-3 text-xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Trainer
            </h1>
            <p className="opacity-70">
              There will also be trainers that will be assigned to each member
            </p>
          </div>
        </div>

        <div className="landing-page-third-section mt-20 lg:mt-40 flex flex-col justify-center items-center text-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-80 mx-10">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                10+
              </h1>
              <p className="opacity-70">Active Users</p>
            </div>

            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                50+
              </h1>
              <p className="opacity-70">Workouts</p>
            </div>

            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                30+
              </h1>
              <p className="opacity-70">Routines</p>
            </div>
          </div>

          <div className="mt-30 p-3">
            <h1 className="text-3xl font-bold">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
                Fitness Journey
              </span>
              ?
            </h1>
            <p className="mt-2 opacity-70">
              Join thousands of users who have transformed their lives with
              CoreFitness
            </p>
            <Link to="/register">
              <Button className="cursor-pointer w-50 mt-15 mb-10 shadow-[0px_5px_15px_rgba(231,30,79,0.4)] ">
                Start Working Out <ArrowRight className="w-15 h-5 text-white" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
