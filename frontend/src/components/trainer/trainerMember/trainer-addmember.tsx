import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectTrainer } from "../../selectTrainer";
import { SelectGender } from "../../selectGender";

export default function TrainerAddMember() {
  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <Link to="/trainer/members">
            <Button className="" variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="font-semibold text-xl">Add New Member</h1>
          <p className="text-sm opacity-50">Create a new member profile</p>
        </div>
      </div>

      <form action="">
        <div className="my-5 font-semibold text-lg flex  w-5/6 mx-auto">
          Personal Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Full Name</p>
            <Input
              id="fullname"
              type="text"
              className="md:w-4/5 w-full text-sm"
              placeholder="Name"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Email</p>
            <Input
              id="email"
              type="email"
              className="md:w-4/5 w-full text-sm"
              placeholder="name@gmail.com"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Phone Number</p>
            <Input
              id="phone"
              type="tel"
              className="md:w-4/5 w-full text-sm"
              placeholder="09000000000"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Date of Birth</p>
            <div className="md:w-4/5 w-full text-sm">
              <Calendar28 value={""} onChange={function (): void {
                throw new Error("Function not implemented.");
              } } />
            </div>
          </div>

          <div className="grid gap-3 mb-3">
            <p>Last Login Date</p>
            <Input
              id="gender"
              type="text"
              className="md:w-4/5 w-full text-sm"
              placeholder="2023-10-01 12:00:00"
              disabled
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Gender</p>
            <SelectGender />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Bio</p>
            <Textarea
              id="bio"
              className="w-full text-sm"
              placeholder="Write a short bio about the trainer"
            />
          </div>
        </div>

        <div className="my-5 font-semibold text-lg flex  w-5/6 mx-auto">
          Body Measurements
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Weight <span className="text-sm">(lbs)</span></p>
            <Input
              id="weight"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="120"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Height <span className="text-sm">(ft)</span></p>
            <Input
              id="height"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="5.5"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Body Fat <span className="text-sm">(%)</span></p>
            <Input
              id="bodyFat"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="21"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Waist <span className="text-sm">(inches)</span></p>
            <Input
              id="waist"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="19"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Chest <span className="text-sm">(inches)</span></p>
            <Input
              id="chest"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="18"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Arms <span className="text-sm">(inches)</span></p>
            <Input
              id="arms"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="20"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Legs <span className="text-sm">(inches)</span></p>
            <Input
              id="legs"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="18"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Assigned Trainer</p>
            <SelectTrainer />
          </div>

          <div className="grid gap-3 mb-3 md:col-span-2 md:w-9/10 w-full">
            <p>Goal</p>
            <Textarea
              id="goal"
              className="w-full text-sm"
              placeholder="Write your goals"
            />
          </div>
        </div>

        <div className="flex gap-4 w-4/5 mx-auto">
          <Button>Create New Member</Button>
        </div>
      </form>
    </div>
  );
}
