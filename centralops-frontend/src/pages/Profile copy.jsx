import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Briefcase, Award, IdCard } from "lucide-react";
import { Navbar } from "@/components/Navbar";

import {
  fetchPersonalInfo,
  clearPersonalInfo,
  fetchDepartment,
  clearDepartment,
  fetchPosition,
  clearPosition,
  fetchRole,
  clearRole,
  fetchSection,
  clearSection,
} from "@/redux/metaSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const {
    personalInfo: {
      data: personalInfo,
      loading: loadingPersonal,
      error: errorPersonal,
    },
    department,
    position,
    role,
    section,
  } = useSelector((state) => state.meta);

  // Fetch personal info after login
  useEffect(() => {
    if (user?.empId) dispatch(fetchPersonalInfo(user.empId));

    return () => {
      dispatch(clearPersonalInfo());
      dispatch(clearDepartment());
      dispatch(clearPosition());
      dispatch(clearRole());
      dispatch(clearSection());
    };
  }, [dispatch, user?.empId]);

  // Fetch related meta info (department, role, etc.)
  useEffect(() => {
    if (personalInfo?.deptId) dispatch(fetchDepartment(personalInfo.deptId));
    if (personalInfo?.positionId)
      dispatch(fetchPosition(personalInfo.positionId));
    if (personalInfo?.roleId) dispatch(fetchRole(personalInfo.roleId));
    if (personalInfo?.sectionId) dispatch(fetchSection(personalInfo.sectionId));
  }, [
    dispatch,
    personalInfo?.deptId,
    personalInfo?.positionId,
    personalInfo?.roleId,
    personalInfo?.sectionId,
  ]);

  // Fetch meta info once after login
  useEffect(() => {
    if (!user) return;
    if (user.deptId) dispatch(fetchDepartment(user.deptId));
    if (user.positionId) dispatch(fetchPosition(user.positionId));
    if (user.roleId) dispatch(fetchRole(user.roleId));
    if (user.sectionId) dispatch(fetchSection(user.sectionId));
  }, [dispatch, user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="p-6">
        <Navbar />
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const avatarSrc = user.imgSrc || "../src/assets/Default.jpg";

  const departmentName = user.deptId ? department.map[user.deptId] : "-";
  const positionName = user.positionId ? position.map[user.positionId] : "-";
  const roleName = user.roleId ? role.map[user.roleId] : "-";
  const sectionName = user.sectionId ? section.map[user.sectionId] : "-";

  const username =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.username ||
    "User";

  const fullName = `${personalInfo?.firstName || user?.firstName || ""} ${
    personalInfo?.lastName || user?.lastName || ""
  }`.trim();

  return (
    <div className="bg-[#D9E1F1] text-foreground min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-11 p-4">
        <Card className="rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
          {/* Avatar */}
          <img
            src={avatarSrc}
            alt={fullName}
            className="w-32 h-32 md:w-36 md:h-36 rounded-full shadow-md border-4 border-white flex-shrink-0"
          />

          {/* Info Section */}
          <div className="flex-1 flex flex-col">
            {/* <CardTitle className="text-lg md:text-xl font-semibold">
              {personalInfo?.username || username || "User"}
            </CardTitle> */}

            <CardTitle className="text-lg md:text-xl font-semibold">
              {personalInfo?.username || fullName || "User"}
            </CardTitle>


            {loadingPersonal ? (
              <p className="text-xs text-gray-500 mt-1">
                Loading personal info...
              </p>
            ) : errorPersonal ? (
              <p className="text-xs text-red-500 mt-1">{errorPersonal}</p>
            ) : (
              <div className="text-xs md:text-sm text-gray-500 mt-1">
                Email: {personalInfo?.email || user?.email || "-"}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <IdCard size={16} className="text-gray-500" />
                {user.empId || "-"}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                {personalInfo?.email || user?.email || "(no email)"}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                {user.phone || "(no phone)"}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-gray-500" />
                Dept: {departmentName}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-gray-500" />
                Position: {positionName}
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-gray-500" />
                Role: {roleName}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                Section: {sectionName}
              </div>
            </div>

            <div className="mt-6 w-full md:w-auto">
              <Button className="rounded-xl w-full md:w-auto">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
