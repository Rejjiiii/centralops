<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
    import="com.centralops.centralops_backend.model.User" %>

    <% User currentUser=(User) session.getAttribute("currentUser"); if (currentUser==null) {
        response.sendRedirect(request.getContextPath() + "/login" ); return; } %>

        <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
            <%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </button>
                            </div>

                            <div class="container mx-auto">
                                <!-- Header -->
                                <div class="flex flex-col md:flex-row justify-between items-center mb-6">
                                    <h1 class="text-2xl font-bold text-gray-800">Users</h1>

                                    <!-- Search & Filter -->
                                    <form method="get" action="user-list" class="flex gap-2 mt-3 md:mt-0">
                                        <input type="text" name="search" value="${param.search}"
                                            placeholder="Search users..."
                                            class="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 w-48">

                                        <select name="role"
                                            class="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300">
                                            <option value="">All Roles</option>
                                            <option value="1">General User</option>
                                            <option value="2">System Administrator</option>
                                            <option value="3">Account Management</option>
                                            <option value="4">Project Management</option>
                                        </select>

                                        <button type="submit"
                                            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Filter</button>
                                    </form>
                                </div>

                                <!-- Table -->
                                <div class="overflow-x-auto bg-white shadow-md rounded-lg">
                                    <table class="min-w-full border-collapse">
                                        <thead class="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                                            <tr>
                                                <th class="py-3 px-4 text-left">Employee ID</th>
                                                <th class="py-3 px-4 text-left">Username</th>
                                                <th class="py-3 px-4 text-left">Role</th>
                                                <th class="py-3 px-4 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 text-sm text-gray-700">
                                            <c:forEach var="user" items="${users}">
                                                <tr class="hover:bg-gray-50 transition">
                                                    <!-- Employee ID -->
                                                    <td class="py-3 px-4">${user.empId}</td>

                                                    <!-- Username -->
                                                    <td class="py-3 px-4 flex items-center gap-3">
                                                        <div
                                                            class="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                                                            ${fn:substring(user.username,0,1)}
                                                        </div>
                                                        <span>${user.username}</span>
                                                    </td>

                                                    <!-- Role -->
                                                    <td class="py-3 px-4">
                                                        <c:choose>
                                                            <c:when test="${user.roleId == 1}">
                                                                <span
                                                                    class="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                                                                    General User
                                                                </span>
                                                            </c:when>
                                                            <c:when test="${user.roleId == 2}">
                                                                <span
                                                                    class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                                                    System Administrator
                                                                </span>
                                                            </c:when>
                                                            <c:when test="${user.roleId == 3}">
                                                                <span
                                                                    class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                                                    Account Management
                                                                </span>
                                                            </c:when>
                                                            <c:when test="${user.roleId == 4}">
                                                                <span
                                                                    class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                                                    Project Management
                                                                </span>
                                                            </c:when>
                                                        </c:choose>
                                                    </td>

                                                    <!-- Actions -->
                                                    <td class="py-3 px-4 text-center">
                                                        <div x-data="{ open: false }"
                                                            class="relative inline-block text-left">
                                                            <button @click="open = !open"
                                                                class="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
                                                                ⋮
                                                            </button>
                                                            <div x-show="open" @click.away="open = false"
                                                                class="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-10">
                                                                <a href="#"
                                                                    class="block px-4 py-2 hover:bg-gray-100">View</a>
                                                                <a href="#"
                                                                    class="block px-4 py-2 hover:bg-gray-100">Edit</a>
                                                                <a href="#"
                                                                    class="block px-4 py-2 text-red-600 hover:bg-red-100">Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </c:forEach>
                                        </tbody>
                                    </table>

                                    <!-- Pagination -->
                                    <div
                                        class="flex flex-col md:flex-row justify-between items-center px-4 py-3 border-t bg-gray-50">
                                        <!-- Page Info -->
                                        <div class="text-sm text-gray-600 mb-2 md:mb-0">
                                            Page <span class="font-semibold">${currentPage}</span> of
                                            <span class="font-semibold">${totalPages}</span>
                                            (Total: ${totalUsers} users)
                                        </div>

                                        <!-- Controls -->
                                        <div class="flex gap-1">
                                            <!-- Previous Button -->
                                            <c:if test="${currentPage > 1}">
                                                <a href="?page=${currentPage - 1}"
                                                    class="px-3 py-1 border rounded hover:bg-gray-100">&lt;</a>
                                            </c:if>

                                            <!-- Always show first page -->
                                            <a href="?page=1" class="px-3 py-1 border rounded 
                  <c:if test='${currentPage == 1}'> bg-blue-500 text-white </c:if>">1</a>

                                            <!-- Ellipsis before current page -->
                                            <c:if test="${currentPage > 3}">
                                                <span class="px-3 py-1">...</span>
                                            </c:if>

                                            <!-- Previous neighbor -->
                                            <c:if test="${currentPage > 2}">
                                                <a href="?page=${currentPage - 1}" class="px-3 py-1 border rounded">
                                                    ${currentPage - 1}
                                                </a>
                                            </c:if>

                                            <!-- Current page -->
                                            <c:if test="${currentPage != 1 && currentPage != totalPages}">
                                                <a href="?page=${currentPage}"
                                                    class="px-3 py-1 border rounded bg-blue-500 text-white">
                                                    ${currentPage}
                                                </a>
                                            </c:if>

                                            <!-- Next neighbor -->
                                            <c:if test="${currentPage < totalPages - 1}">
                                                <a href="?page=${currentPage + 1}" class="px-3 py-1 border rounded">
                                                    ${currentPage + 1}
                                                </a>
                                            </c:if>

                                            <!-- Ellipsis after current page -->
                                            <c:if test="${currentPage < totalPages - 2}">
                                                <span class="px-3 py-1">...</span>
                                            </c:if>

                                            <!-- Always show last page -->
                                            <c:if test="${totalPages > 1}">
                                                <a href="?page=${totalPages}" class="px-3 py-1 border rounded 
                      <c:if test='${currentPage == totalPages}'> bg-blue-500 text-white </c:if>">
                                                    ${totalPages}
                                                </a>
                                            </c:if>

                                            <!-- Next Button -->
                                            <c:if test="${currentPage < totalPages}">
                                                <a href="?page=${currentPage + 1}"
                                                    class="px-3 py-1 border rounded hover:bg-gray-100">&gt;</a>
                                            </c:if>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>
                </body>

                </html>