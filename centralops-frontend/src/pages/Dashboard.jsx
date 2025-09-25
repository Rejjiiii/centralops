import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ClipboardList,
  Briefcase,
  Calendar,
  Award,
  CheckSquare,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return (
      <div className="p-6">
        <Navbar />
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  // fallback avatar
  const avatarSrc = user.imgSrc || "../src/assets/DP.png";

  const progressColors = [
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-red-500",
  ];
  const badgeColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
  ];

  const statCard = (icon, title, value, hint) => (
    <Card className="p-3 rounded-lg">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white/60 rounded-lg shadow-sm">{icon}</div>
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="mt-1 text-lg font-semibold">{value}</div>
          {hint && <div className="text-xs text-gray-400">{hint}</div>}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="bg-[#D9E1F1] text-foreground">
      <Navbar />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 max-w-7xl mx-auto mt-11 pb-10">
        {/* Profile Card (col-1, row-span-3) */}
        <Card className="lg:row-span-3 lg:col-span-1 rounded-2xl shadow-lg h-full flex flex-col">
          <CardHeader className="flex flex-col items-center p-6 mt-10">
            <img
              src={avatarSrc}
              alt={user.username}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full shadow-md border-4 border-white bg-contain"
            />
            <CardTitle className="mt-4 text-lg md:text-xl font-semibold text-center">
              {user.username}
            </CardTitle>
            <p className="text-xs md:text-sm text-gray-500 text-center">
              Role ID: {user.roleId} — Position ID: {user.positionId}
            </p>
            <p className="text-xs text-gray-400">Dept ID: {user.deptId}</p>

            <div className="mt-4 w-full">
              <Button className="rounded-xl w-full">Edit Profile</Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6 space-y-3 flex-grow">
            <div className="text-xs md:text-sm text-gray-600">
              <strong>ID:</strong> {user.empId}
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
              <Mail size={16} className="text-gray-500" /> (no email in API)
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
              <Phone size={16} className="text-gray-500" /> (no phone in API)
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" /> Section ID:{" "}
              {user.sectionId}
            </div>
          </CardContent>
        </Card>

        {/* Example Tasks Card (placeholder until backend tasks exist) */}
        <Card className="rounded-xl shadow-lg lg:col-span-2">
          <CardHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div>
                <div className="relative text-sm text-center font-semibold">
                  <CheckSquare size={18} className="absolute ml-5" />
                  Tasks
                </div>
                <div className="text-xs text-gray-400">
                  Pending & in-progress
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">0 total</div>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-xs text-gray-400">
              No task data from API yet
            </p>
          </CardContent>
        </Card>

        {/* Example Projects Card (placeholder) */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <Briefcase size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Projects</div>
              <div className="text-xs text-gray-400">Role & progress</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-xs text-gray-400">
              No project data from API yet
            </p>
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <Award size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Performance</div>
              <div className="text-xs text-gray-400">Last review & rating</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-sm">No performance data from API yet</div>
          </CardContent>
        </Card>

        {/* Upcoming Events Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <Calendar size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Upcoming</div>
              <div className="text-xs text-gray-400">Meetings & deadlines</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-xs text-gray-400">
              No upcoming data from API yet
            </p>
          </CardContent>
        </Card>

        {/* Activity Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <ClipboardList size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Activity</div>
              <div className="text-xs text-gray-400">Recent events</div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-xs text-gray-400">
              No activity data from API yet
            </p>
          </CardContent>
        </Card>

        {/* Small Stat Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {statCard(<Clock size={18} />, "Reg Date", user.regDate?.slice(0, 10))}
          {statCard(<ClipboardList size={18} />, "Status", user.statusCode)}
          {statCard(<Briefcase size={18} />, "Dept ID", user.deptId)}
          {statCard(
            <Calendar size={18} />,
            "Updated",
            user.updateDate?.slice(0, 10)
          )}
        </div>
      </div>
    </div>
  );
}
