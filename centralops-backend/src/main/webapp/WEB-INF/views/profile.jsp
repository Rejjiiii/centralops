<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
                <h1>Hello Dev Here's your Profile</h1>
            </main>
        </div>
    </body>

    </html>