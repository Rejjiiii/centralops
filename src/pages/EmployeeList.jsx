import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "@/redux/employeeSlice";
import { Search, Plus, MoreVertical, Users, ArrowUpDown } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

// Main Employee List Component
export default function EmployeeList() {
  const dispatch = useDispatch();
  const { list: employees, loading, error } = useSelector(
    (state) => state.employees
  );

  // Local state
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const employeesPerPage = 10;
  const dropdownRef = useRef(null);

  // Fetch employees on mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Filter based on search term
  useEffect(() => {
    const filtered = employees.filter((e) =>
      `${e.firstName || e.username} ${e.lastName || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchTerm, employees]);

  // Sorting
  const sortedEmployees = [...filteredEmployees].sort((a, b) =>
    sortOrder === "asc"
      ? (a.firstName || a.username).localeCompare(b.firstName || b.username)
      : (b.firstName || b.username).localeCompare(a.firstName || a.username)
  );

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => setDropdownOpen(dropdownOpen === id ? null : id);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading employees...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="bg-[#D9E1F1] text-foreground">
      <Navbar />
      <div className="bg-[#D9E1F1] text-foreground min-h-screen p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-0 md:space-y-0 space-y-6 max-w-7xl mx-auto mt-5">
          {/* Employee List */}
          <Card className="col-span-3 rounded-2xl shadow-lg flex flex-col">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between p-6 gap-3">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-primary-600" />
                <div>
                  <div className="text-lg font-semibold">Employees</div>
                  <div className="text-xs text-gray-500">Manage your employee records</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Button className="rounded-xl text-sm flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Employee
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-sm flex items-center"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" /> Sort {sortOrder === "asc" ? "A→Z" : "Z→A"}
                </Button>
              </div>
            </CardHeader>

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
                    <div key={e.empId} className="grid grid-cols-3 md:grid-cols-6 items-center py-3 text-sm">
                      <div className="font-medium">{e.empId}</div>
                      <div className="flex items-center gap-2">
                        {e.imgSrc && <img src={e.imgSrc} alt={e.username} className="md:flex hidden w-8 h-8 rounded-full" />}
                        <span>{e.username}</span>
                      </div>
                      <div className="md:flex hidden">{e.positionId}</div>
                      <div className="md:flex hidden">{e.deptId}</div>
                      <div className="md:flex hidden truncate">{e.roleId}</div>
                      <div className="flex justify-end items-center gap-2 relative" ref={dropdownRef}>
                        <button onClick={() => toggleDropdown(e.empId)} className="text-[#192338] hover:text-gray-400">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {dropdownOpen === e.empId && (
                          <div className="absolute right-0 top-7 bg-white dark:bg-gray-800 rounded-lg shadow-md w-40 z-10">
                            <ul className="text-sm">
                              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Show</li>
                              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Edit</li>
                              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Delete</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
                  Prev<span className="md:flex hidden">ious</span>
                </Button>

                <span className="text-sm">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <Button variant="outline" size="sm" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <Card className="col-span-1 rounded-2xl shadow-md flex flex-col">
            <CardHeader className="p-6">
              <div className="text-lg font-semibold">Employee Summary</div>
              <div className="text-xs text-gray-500">Quick stats & insights</div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="text-sm"><strong>Total Employees:</strong> {employees.length}</div>
              <div className="text-sm"><strong>Departments:</strong> {[...new Set(employees.map(e => e.deptId))].length}</div>
              <div className="text-sm"><strong>Positions:</strong> {[...new Set(employees.map(e => e.positionId))].length}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

