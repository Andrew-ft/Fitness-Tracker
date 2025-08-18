import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../../ui/input";
import { Calendar28 } from "../../DatePicker";
import { Textarea } from "../../ui/textarea";
import { SelectGender } from "../../selectGender";
import { SelectSpecialization } from "../../selectSpecialization";
import { SelectClientTypes } from "../../selectClientTypes";

export default function AdminAddTrainer() {
  return (
    <div>
      <div className="flex items-center gap-5 mb-5 ">
        <div>
          <Link to="/admin/trainers">
            <Button className="" variant="outline">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="font-semibold text-xl">Add New Trainer</h1>
          <p className="text-sm opacity-50">Create a new trainer profile</p>
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
              className="w-full md:w-4/5 text-sm"
              placeholder="Name"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Email</p>
            <Input
              id="email"
              type="email"
              className="w-full md:w-4/5 text-sm"
              placeholder="name@gmail.com"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Phone Number</p>
            <Input
              id="phone"
              type="tel"
              className="w-full md:w-4/5 text-sm"
              placeholder="09000000000"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Date of Birth</p>
            <div className="w-full md:w-4/5 text-sm">
              <Calendar28 onChange={function (): void {
                throw new Error("Function not implemented.");
              } } value={""} />
            </div>
          </div>

          <div className="grid gap-3 mb-3">
            <p>Last Login Date</p>
            <Input
              id="gender"
              type="text"
              className="w-full md:w-4/5 text-sm"
              placeholder="2023-10-01 12:00:00"
              disabled
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Gender</p>
            <SelectGender/>
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
          Qualification
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 mx-auto mb-5">
          <div className="grid gap-3 mb-3">
            <p>Certificate</p>
            <Input id="file" type="file" className="md:w-4/5 w-full text-sm" />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Specialization</p>
            <SelectSpecialization />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Experience Years</p>
            <Input
              id="years"
              type="number"
              className="md:w-4/5 w-full text-sm"
              placeholder="3"
            />
          </div>

          <div className="grid gap-3 mb-3">
            <p>Clients Type Served</p>
            <SelectClientTypes />
          </div>
        </div>

        <div className="flex gap-4 w-4/5 mx-auto">
          <Button>Create New Trainer</Button>
        </div>
      </form>
    </div>
  );
}
