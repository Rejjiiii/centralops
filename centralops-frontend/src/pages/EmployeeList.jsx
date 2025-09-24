import { useState } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  Filter,
  MoreVertical,
  Users,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

export default function EmployeeList() {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const employeesPerPage = 10;

  // Example dataset
  const employees = Array.from({ length: 35 }, (_, i) => ({
    id: `EMP${(i + 1).toString().padStart(3, "0")}`,
    firstName: `First${i + 1}`,
    lastName: `Last${i + 1}`,
    position: [
      "Software Engineer",
      "Project Manager",
      "UI/UX Designer",
      "HR Specialist",
    ][i % 4],
    email: `user${i + 1}@example.com`,
    department: ["IT", "Operations", "Design", "HR"][i % 4],
    image: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  }));

  // Sorting logic
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.firstName.localeCompare(b.firstName);
    } else {
      return b.firstName.localeCompare(a.firstName);
    }
  });

  // Pagination logic
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="bg-[#D9E1F1] text-foreground">
      <Navbar />
      <div className="bg-[#D9E1F1] text-foreground min-h-screen p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-0 md:space-y-0 space-y-6 max-w-7xl mx-auto mt-5">
          {/* Employee List */}
          <Card className="col-span-3 rounded-2xl shadow-lg flex flex-col">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between p-6 gap-3">
              {/* Title */}
              <div className="flex items-center gap-2">
                <Users size={20} className="text-primary-600" />
                <div>
                  <div className="text-lg font-semibold">Employees</div>
                  <div className="text-xs text-gray-500">
                    Manage your employee records
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                <Button className="rounded-xl text-sm flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Employee
                </Button>

                {/* Sort button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-sm flex items-center"
                  onClick={() =>
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" /> Sort{" "}
                  {sortOrder === "asc" ? "A→Z" : "Z→A"}
                </Button>
              </div>
            </CardHeader>

            {/* Table */}
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-3 md:grid-cols-6 text-xs font-medium text-gray-500 border-b pb-2">
                  <div>Emp ID</div>
                  <div>Name</div>
                  <div className="md:flex hidden">Position</div>
                  <div className="md:flex hidden">Department</div>
                  <div className="md:flex hidden">Email</div>
                  <div className="text-right">Actions</div>
                </div>

                <div className="divide-y">
                  {currentEmployees.map((e) => (
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
                      <div className="md:flex hidden truncate">{e.email}</div>
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
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev<span className="md:flex hidden">ious</span>
                </Button>

                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Summary */}
          <Card className="col-span-1 rounded-2xl shadow-md flex flex-col">
            <CardHeader className="p-6">
              <div className="text-lg font-semibold">Employee Summary</div>
              <div className="text-xs text-gray-500">
                Quick stats & insights
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-sm">
                <strong>Total Employees:</strong> {employees.length}
              </div>
              <div className="text-sm">
                <strong>Departments:</strong>{" "}
                {[...new Set(employees.map((e) => e.department))].length}
              </div>
              <div className="text-sm">
                <strong>Positions:</strong>{" "}
                {[...new Set(employees.map((e) => e.position))].length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
