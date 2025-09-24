import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
 
// ✅ Dummy employee data
const employees = [
  {
    id: "EMP-001",
    name: "Jane Doe",
    position: "Senior Software Engineer",
    department: "Engineering",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "EMP-002",
    name: "John Smith",
    position: "Product Manager",
    department: "Product",
    email: "john.smith@example.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "EMP-003",
    name: "Emily Johnson",
    position: "UX Designer",
    department: "Design",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 321-7654",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: "EMP-004",
    name: "Michael Chen",
    position: "Engineering Manager",
    department: "Engineering",
    email: "michael.chen@example.com",
    phone: "+1 (555) 222-3333",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];
 
export const UserList = () => {
  return (
    <Card className="min-w-7xl min-h-screen rounded-xl shadow-lg">
      <Navbar />
      <CardContent className="mx-auto max-w-7xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{emp.id}</td>
                  <td className="px-4 py-2 font-medium flex items-center gap-2">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-8 h-8 rounded-full border"
                    />
                    {emp.name}
                  </td>
                  <td className="px-4 py-2">{emp.position}</td>
                  <td className="px-4 py-2">{emp.department}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.phone}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-green-100"
                      >
                        <Pencil className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};