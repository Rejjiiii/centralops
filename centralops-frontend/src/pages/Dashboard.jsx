import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../app/authSlice"; // your auth slice
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
  Trophy,       // instead of Award
  CheckSquareIcon, // instead of CheckSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { profile: employee, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!employee) {
      dispatch(fetchProfile());
    }
  }, [dispatch, employee]);

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

  // ✅ handle loading & error states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No employee data available
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pt-20"
      >
        {/* Left column - Profile */}
        <div className="space-y-6">
          <Card className="rounded-2xl shadow-lg h-full flex flex-col">
            <CardHeader className="flex flex-col items-center p-6">
              <img
                src={employee.avatar || "/default-avatar.png"}
                alt={employee.name || "Employee"}
                className="w-28 h-28 rounded-full shadow-md border-4 border-white -mt-14"
              />
              <CardTitle className="mt-4 text-xl font-semibold">
                {employee.name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {employee.position} — {employee.team}
              </p>
              <p className="text-xs text-gray-400">{employee.department}</p>

              <div className="mt-4 w-full">
                <Button className="rounded-xl w-full">Edit Profile</Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-3 flex-grow">
              <div className="text-sm text-gray-600">
                <strong>ID:</strong> {employee.id}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Mail size={16} className="text-gray-500" /> {employee.email}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Phone size={16} className="text-gray-500" /> {employee.phone}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" /> {employee.office}{" "}
                • {employee.location}
              </div>

              {/* Skills */}
              <div className="mt-3">
                <div className="text-xs text-gray-500">Skills</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {employee.skills?.map((s, i) => (
                    <span
                      key={s}
                      className={`text-xs px-2 py-1 rounded-full ${
                        badgeColors[i % badgeColors.length]
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="mt-3">
                <div className="text-xs text-gray-500">Badges</div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {employee.badges?.map((b, i) => (
                    <span
                      key={b}
                      className={`text-xs px-2 py-1 rounded-md ${
                        badgeColors[i % badgeColors.length]
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {statCard(
              <Clock size={18} />,
              "Tenure",
              `${Math.max(
                new Date().getFullYear() -
                  new Date(employee.startDate).getFullYear(),
                0
              )} yrs`,
              `Since ${employee.startDate}`
            )}
            {statCard(
              <ClipboardList size={18} />,
              "Pending Tasks",
              employee.tasks?.filter(
                (t) => t.status === "Pending" || t.status === "In progress"
              ).length || 0
            )}
            {statCard(
              <Briefcase size={18} />,
              "Active Projects",
              employee.projects?.length || 0
            )}
            {statCard(
              <Calendar size={18} />,
              "Time Off",
              `${employee.timeOff?.remaining || 0} days left`
            )}
          </div>
        </div>

        {/* Right column — same idea, wrap maps with ? for safety */}
        {/* ... keep your same JSX but make sure to use `employee.tasks?.map` instead of `employee.tasks.map` */}
      </motion.div>
    </div>
  );
}
