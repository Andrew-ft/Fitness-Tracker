import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboardStatusCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-4/5 mx-auto gap-5">
      <div>
        <Card className="gap-1 border-primary bg-primary/10 p-3">
          <CardHeader>
            <p className="font-semibold">Total Members</p>
          </CardHeader>
          <CardContent>
            <CardTitle className="font-bold text-2xl bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">156</CardTitle>
          </CardContent>
          <CardFooter>
            <CardDescription>+12 this month</CardDescription>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card className="gap-1 border-primary bg-primary/10 p-3">
          <CardHeader>
            <p className="font-semibold">Active Trainers</p>
          </CardHeader>
          <CardContent>
            <CardTitle className="font-bold text-2xl bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">156</CardTitle>
          </CardContent>
          <CardFooter>
            <CardDescription>In total</CardDescription>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card className="gap-1 border-primary bg-primary/10 p-3">
          <CardHeader>
            <p className="font-semibold">Routines</p>
          </CardHeader>
          <CardContent>
            <CardTitle className="font-bold text-2xl bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">156</CardTitle>
          </CardContent>
          <CardFooter>
            <CardDescription>In total</CardDescription>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card className="gap-1 border-primary bg-primary/10 p-3">
          <CardHeader>
            <p className="font-semibold">Workouts</p>
          </CardHeader>
          <CardContent>
            <CardTitle className="font-bold text-2xl bg-gradient-to-br from-purple-600 via-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">156</CardTitle>
          </CardContent>
          <CardFooter>
            <CardDescription>In total</CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
