import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Clock,
  ClipboardList,
  Briefcase,
  CheckSquare,
  Calendar,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  const employee = {
    id: "EMP-00069",
    name: "Jeffree Borlagdan",
    position: "Senior Software Engineer",
    department: "Engineering",
    team: "Platform — Payments",
    manager: "Michael Chen",
    location: "New York, USA",
    office: "HQ — 12F, Desk 72",
    email: "jeff.borlagdan@example.com",
    phone: "+1 (555) 123-4567",
    startDate: "2019-08-12",
    employmentType: "Full-time",
    status: "Active",
    avatar: "../src/assets/DP.png",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Postgres"],
    badges: ["On-call", "Security Cleared"],
    emergencyContact: {
      name: "John Doe",
      relation: "Spouse",
      phone: "+1 (555) 765-4321",
    },
    tasks: [
      {
        id: "T-1023",
        title: "Fix payment retry bug",
        due: "2025-09-28",
        status: "In progress",
        priority: "High",
      },
      {
        id: "T-1031",
        title: "Code review — invoices service",
        due: "2025-09-25",
        status: "Pending",
        priority: "Medium",
      },
      {
        id: "T-1009",
        title: "Write unit tests for retry logic",
        due: "2025-10-02",
        status: "Pending",
        priority: "Low",
      },
    ],
    projects: [
      {
        id: "P-77",
        name: "Payments v2",
        role: "Tech Lead",
        progress: 72,
        status: "On track",
      },
      {
        id: "P-88",
        name: "Billing dashboard",
        role: "Contributor",
        progress: 35,
        status: "At risk",
      },
    ],
    timeOff: { used: 8, remaining: 12 },
    recentActivity: [
      "Merged PR #412: retry-policy",
      "Commented on issue #98 — billing recalcs",
      "Completed code review for P-88",
    ],
    performance: { lastReview: "2024-12-05", rating: "Exceeds Expectations" },
    notes: "Strong backend experience; mentor for junior engineers.",
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 max-w-7xl mx-auto mt-11 ">
        {/* Profile Card (col-1, row-span-3) */}
        <Card className="lg:row-span-3 lg:col-span-1 rounded-2xl shadow-lg h-full flex flex-col">
          <CardHeader className="flex flex-col items-center p-6 mt-10">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full shadow-md border-4 border-white bg-contain"
            />
            <CardTitle className="mt-4 text-lg md:text-xl font-semibold text-center">
              {employee.name}
            </CardTitle>
            <p className="text-xs md:text-sm text-gray-500 text-center">
              {employee.position} — {employee.team}
            </p>
            <p className="text-xs text-gray-400">{employee.department}</p>

            <div className="mt-4 w-full">
              <Button className="rounded-xl w-full">Edit Profile</Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6 space-y-3 flex-grow">
            <div className="text-xs md:text-sm text-gray-600">
              <strong>ID:</strong> {employee.id}
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
              <Mail size={16} className="text-gray-500" /> {employee.email}
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
              <Phone size={16} className="text-gray-500" /> {employee.phone}
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" /> {employee.office} •{" "}
              {employee.location}
            </div>

            <div className="mt-3">
              <div className="text-xs text-gray-500">Manager</div>
              <div className="text-xs md:text-sm">{employee.manager}</div>
            </div>

            <div className="mt-3">
              <div className="text-xs text-gray-500">Skills</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {employee.skills.map((s, i) => (
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

            <div className="mt-3">
              <div className="text-xs text-gray-500">Badges</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {employee.badges.map((b, i) => (
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

            <div className="mt-3">
              <div className="text-xs text-gray-500">Emergency Contact</div>
              <div className="text-xs md:text-sm">
                {employee.emergencyContact.name} —{" "}
                {employee.emergencyContact.relation} (
                {employee.emergencyContact.phone})
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Box 2 - Tasks Card (top-right, spans 2 cols) */}
        <Card className="rounded-xl shadow-lg lg:col-span-2">
          <CardHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div>
                <div className="relative text-sm text-center font-semibold">
                  <CheckSquare size={18} className="absolute ml-5"/>
                  Tasks
                </div>
                <div className="text-xs text-gray-400">
                  Pending & in-progress
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {employee.tasks.length} total
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <ul className="space-y-3">
              {employee.tasks.map((t) => (
                <li key={t.id} className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-gray-400">
                      {t.id} — due {t.due} • {t.priority}
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-md ${
                      badgeColors[
                        Math.floor(Math.random() * badgeColors.length)
                      ]
                    }`}
                  >
                    {t.status}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 4 Equal Boxes (Row 2 & 3, right side) */}
        {/* Box 3 - Projects Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <Briefcase size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Projects</div>
              <div className="text-xs text-gray-400">Role & progress</div>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-3">
            {employee.projects.map((p, i) => (
              <div key={p.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.role}</div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${p.progress}%` }}
                    className={`h-2 rounded-full ${
                      progressColors[i % progressColors.length]
                    }`}
                  />
                </div>

                <div className="text-xs text-gray-400">
                  {p.progress}% — {p.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Box 4 - Performance Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <Award size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Performance</div>
              <div className="text-xs text-gray-400">Last review & rating</div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="text-sm">{employee.performance.rating}</div>
            <div className="text-xs text-gray-400">
              Last review: {employee.performance.lastReview}
            </div>

            <div className="mt-3 text-xs text-gray-500">Notes:</div>
            <div className="text-sm">{employee.notes}</div>
          </CardContent>
        </Card>

        {/* Box 5 - Upcoming Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <Calendar size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Upcoming</div>
              <div className="text-xs text-gray-400">Meetings & deadlines</div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <ul className="text-sm space-y-2">
              <li>2025-09-25 — Design sync (30m)</li>
              <li>2025-09-28 — Payment rollout (deadline)</li>
              <li>2025-10-02 — Team retro</li>
            </ul>
          </CardContent>
        </Card>

        {/* Box 6 - Activity Card */}
        <Card className="rounded-xl shadow-md">
          <CardHeader className="flex items-center gap-2 p-4">
            <ClipboardList size={18} />
            <div>
              <div className="text-sm text-center font-semibold">Activity</div>
              <div className="text-xs text-gray-400">Recent events</div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <ul className="text-sm space-y-2">
              {employee.recentActivity.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Last 4 Equal Boxes (2x2 grid layout) */}
        {/* Boxes 7–10 - Small Stat Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 gap-3">
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
            employee.tasks.filter(
              (t) => t.status === "Pending" || t.status === "In progress"
            ).length
          )}

          {statCard(
            <Briefcase size={18} />,
            "Active Projects",
            employee.projects.length
          )}

          {statCard(
            <Calendar size={18} />,
            "Time Off",
            `${employee.timeOff.remaining} days left`
          )}
        </div>
      </div>
    </div>
  );
}
