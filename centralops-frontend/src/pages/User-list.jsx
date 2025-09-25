// import React, { useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import { Navbar } from "@/components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployees, deleteUser } from "../app/userSlice"; // your Redux slice
// import { useNavigate } from "react-router-dom";

// export const UserList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get employees from Redux state
//   const { list: employees = [], loading, error } = useSelector(
//     (state) => state.user
//   );

//   useEffect(() => {
//     dispatch(fetchEmployees());
//   }, [dispatch]);

//   const handleView = (id) => navigate(`/users/${id}`);
//   const handleEdit = (id) => navigate(`/users/edit/${id}`);
//   const handleDelete = (id) => dispatch(deleteUser(id));

//   if (loading) return <p className="text-center mt-10">Loading employees...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <Card className="min-w-7xl min-h-screen rounded-xl shadow-lg">
//       <Navbar />
//       <CardContent className="mx-auto max-w-7xl p-6">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-sm">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-left">
//                 <th className="px-4 py-2">ID</th>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Position</th>
//                 <th className="px-4 py-2">Department</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Phone</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <tr
//                   key={emp.id}
//                   className="border-b hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-4 py-2">{emp.id}</td>
//                   <td className="px-4 py-2 font-medium flex items-center gap-2">
//                     <img
//                       src={emp.avatar || "/default-avatar.png"}
//                       alt={emp.name}
//                       className="w-8 h-8 rounded-full border"
//                     />
//                     {emp.name}
//                   </td>
//                   <td className="px-4 py-2">{emp.position}</td>
//                   <td className="px-4 py-2">{emp.department}</td>
//                   <td className="px-4 py-2">{emp.email}</td>
//                   <td className="px-4 py-2">{emp.phone}</td>
//                   <td className="px-4 py-2 text-center">
//                     <div className="flex justify-center gap-2">
//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         className="hover:bg-blue-100"
//                         onClick={() => handleView(emp.id)} // ✅ wire handleView
//                       >
//                         <Eye className="h-4 w-4 text-blue-600" />
//                       </Button>
//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         className="hover:bg-green-100"
//                         onClick={() => handleEdit(emp.id)} // ✅ wire handleEdit
//                       >
//                         <Pencil className="h-4 w-4 text-green-600" />
//                       </Button>
//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         className="hover:bg-red-100"
//                         onClick={() => handleDelete(emp.id)} // ✅ wire handleDelete
//                       >
//                         <Trash2 className="h-4 w-4 text-red-600" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
