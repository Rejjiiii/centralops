<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="com.centralops.centralops_backend.model.User,
    com.centralops.centralops_backend.model.PersonalInfo,
    com.centralops.centralops_backend.model.Position,
    com.centralops.centralops_backend.model.Role
    " %>
    <% User currentUser=(User) session.getAttribute("currentUser"); PersonalInfo personalInfo=(PersonalInfo)
        session.getAttribute("personalInfo"); if (currentUser==null || currentUser.getEmpId()==null) {
        response.sendRedirect(request.getContextPath() + "/login" ); return; } %>

        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CentralOps Dashboard</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
        </head>

        <body class="bg-gray-100 font-sans min-h-screen">
            <div x-data="{ openSidebar: false }" class="flex flex-col md:flex-row min-h-screen">

                <!-- Sidebar -->
                <jsp:include page="common/sidebar.jsp" />

                <!-- Main Content -->
                <main class="flex-1 p-4 md:p-6 overflow-y-auto">

                    <!-- Mobile Header -->
                    <div class="md:hidden flex justify-between items-center mb-4">
                        <h1 class="text-xl font-bold text-gray-800">CentralOps</h1>
                        <button @click="openSidebar = true" class="p-2 rounded-full hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                    <!-- Page Content -->
                    <h1 class="text-2xl font-bold text-gray-800 mb-4">Your Profile</h1>

                    <!-- Profile Section -->
                    <div class="bg-white shadow rounded-lg p-6 mb-6">
                        <div class="flex items-center space-x-6">
                            <img class="w-40 h-40 rounded-full object-cover" src="<%= (currentUser.getImgSrc() != null && !currentUser.getImgSrc().isEmpty())
                                ? currentUser.getImgSrc() 
                                : request.getContextPath() + "/resources/images/default-avatar.png" %>"
                                alt="<%= currentUser.getImgSrc()%>">

                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">
                                    <%= personalInfo.getFirstName() %>
                                        <%= personalInfo.getLastName() %>
                                </h2>
                                <p class="text-gray-500">Software Engineer</p>
                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Personal Information -->
                            <!-- Employee ID -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-medium mb-1">Employee ID</label>
                                <input type="text" value="<%= personalInfo.getEmpId() %>" disabled
                                    class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed">
                            </div>

                            <!-- Full Name -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-medium mb-1">Full Name</label>
                                <input type="text"
                                    value="<%= personalInfo.getFirstName() %> <%= personalInfo.getLastName() %>"
                                    disabled
                                    class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed">
                            </div>

                            <!-- Email -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-medium mb-1">Email</label>
                                <input type="text" value="<%= personalInfo.getEmail() %>" disabled
                                    class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed">
                            </div>

                            <!-- Username -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-medium mb-1">Username</label>
                                <input type="text" value="<%= currentUser.getUsername() %>" disabled
                                    class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed">
                            </div>

                            <!-- Position -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-medium mb-1">Postition Name</label>
                                <input type="text" id="positionName" value="<%= currentUser.getPositionId() %>"
                                    class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed">
                            </div>

                            <!-- Department -->
                            <div class="mb-4">
                                <label class="block text-gray-700 font-medium mb-1">Department Name</label>
                                <input type="text" id="sectionName" value="<%= currentUser.getSectionId() %>"
                                    class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed">
                            </div>
                        </div>
                    </div>

                </main>
            </div>

            <script src="${pageContext.request.contextPath}/resources/js/profile.js"></script>
        </body>


        </html>