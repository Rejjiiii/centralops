import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Users,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

export default function ProjectList() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Example dataset with projects and employees
  const projects = [
    {
      id: "PRJ001",
      name: "Website Redesign",
      description: "Revamp corporate website",
      employees: [
        {
          id: "EMP001",
          firstName: "Alice",
          lastName: "Johnson",
          position: "UI/UX Designer",
          email: "alice@example.com",
          department: "Design",
          image: "https://i.pravatar.cc/150?img=5",
        },
        {
          id: "EMP002",
          firstName: "Bob",
          lastName: "Smith",
          position: "Frontend Developer",
          email: "bob@example.com",
          department: "IT",
          image: "https://i.pravatar.cc/150?img=6",
        },
      ],
    },
    {
      id: "PRJ002",
      name: "HR Automation",
      description: "Automating HR workflows",
      employees: [
        {
          id: "EMP003",
          firstName: "Carol",
          lastName: "Davis",
          position: "HR Specialist",
          email: "carol@example.com",
          department: "HR",
          image: "https://i.pravatar.cc/150?img=7",
        },
        {
          id: "EMP004",
          firstName: "David",
          lastName: "Miller",
          position: "Backend Engineer",
          email: "david@example.com",
          department: "IT",
          image: "https://i.pravatar.cc/150?img=8",
        },
      ],
    },
  ];

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Sort projects by name
  const sortedProjects = [...projects].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="bg-[#D9E1F1] text-foreground">
      <Navbar />
      <div className="bg-[#D9E1F1] text-foreground min-h-screen p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-0 md:space-y-0 space-y-6 max-w-7xl mx-auto mt-5">
          {/* Project List */}
          <Card className="col-span-3 rounded-2xl shadow-lg flex flex-col">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between p-6 gap-3">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-primary-600" />
                <div>
                  <div className="text-lg font-semibold">Projects</div>
                  <div className="text-xs text-gray-500">
                    Manage your projects & assigned employees
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                <Button className="rounded-xl text-sm flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Project
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-sm flex items-center"
                  onClick={() =>
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Sort {sortOrder === "asc" ? "A→Z" : "Z→A"}
                </Button>
              </div>
            </CardHeader>

            {/* Table */}
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                {sortedProjects.map((project) => (
                  <div key={project.id} className="mb-6">
                    {/* Project Row */}
                    <div className="flex justify-between items-center border-b pb-2 mb-3">
                      <div>
                        <div className="font-semibold text-base">
                          {project.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.description}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleDropdown(project.id)}
                        className="text-[#192338] hover:text-gray-400"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Employees under project */}
                    <div className="divide-y">
                      {project.employees.map((e) => (
                        <div
                          key={e.id}
                          className="grid grid-cols-3 md:grid-cols-6 items-center py-3 text-sm"
                        >
                          <div className="font-medium">{e.id}</div>
                          <div className="flex items-center gap-2">
                            <img
                              src={e.image}
                              alt={e.firstName}
                              className="md:flex hidden w-8 h-8 rounded-full"
                            />
                            <span>
                              {e.firstName} {e.lastName}
                            </span>
                          </div>
                          <div className="md:flex hidden">{e.position}</div>
                          <div className="md:flex hidden">{e.department}</div>
                          <div className="md:flex hidden truncate">
                            {e.email}
                          </div>
                          <div className="flex justify-end items-center gap-2 relative">
                            <button
                              onClick={() => toggleDropdown(e.id)}
                              className="text-[#192338] hover:text-gray-400"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            {dropdownOpen === e.id && (
                              <div className="absolute right-0 top-7 bg-white dark:bg-gray-800 rounded-lg shadow-md w-40">
                                <ul className="text-sm">
                                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Show
                                  </li>
                                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Edit
                                  </li>
                                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Remove
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Summary */}
          <Card className="col-span-1 rounded-2xl shadow-md flex flex-col">
            <CardHeader className="p-6">
              <div className="text-lg font-semibold">Project Summary</div>
              <div className="text-xs text-gray-500">
                Quick stats & insights
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-sm">
                <strong>Total Projects:</strong> {projects.length}
              </div>
              <div className="text-sm">
                <strong>Total Employees:</strong>{" "}
                {projects.reduce((acc, p) => acc + p.employees.length, 0)}
              </div>
              <div className="text-sm">
                <strong>Departments:</strong>{" "}
                {
                  new Set(
                    projects.flatMap((p) =>
                      p.employees.map((e) => e.department)
                    )
                  ).size
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
