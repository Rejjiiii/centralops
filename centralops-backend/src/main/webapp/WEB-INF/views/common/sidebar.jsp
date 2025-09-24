<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!-- Mobile Overlay -->
<div x-show="openSidebar" class="fixed inset-0 bg-black bg-opacity-50 md:hidden" @click="openSidebar = false"></div>

<!-- Sidebar -->
<aside
  class="bg-white shadow-lg transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-50 w-64 flex flex-col
         transform md:translate-x-0 md:static"
  :class="{ '-translate-x-full': !openSidebar, 'translate-x-0': openSidebar }">

  <!-- Header -->
  <div class="p-4 flex items-center justify-between border-b">
    <h1 class="text-xl font-bold text-green-600">CentralOps</h1>
    <!-- Close button (mobile only) -->
    <button @click="openSidebar = false" class="md:hidden p-2 rounded-full hover:bg-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Navigation -->
  <nav class="py-4 flex-1">
    <ul class="space-y-2">

      <!-- Dashboard -->
      <li>
        <a href="dashboard" class="flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                  hover:bg-gray-100 <%= request.getRequestURI().contains("dashboard.jsp") ? "bg-gray-100" : "" %>">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l-2-2m2 2V4a1 1 0 00-1-1h-3a1 1 0 00-1 1z" />
          </svg>
          <span class="text-gray-700">Dashboard</span>
        </a>
      </li>

      <!-- User List -->
      <li>
        <a href="${pageContext.request.contextPath}/user-list" class="flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                  hover:bg-gray-100 <%= request.getRequestURI().contains("user-list") ? "bg-gray-100" : "" %>">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span class="text-gray-700">User List</span>
        </a>
      </li>

      <!-- Profile -->
      <li>
        <a href="${pageContext.request.contextPath}/profile" class="flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                  hover:bg-gray-100 <%= request.getRequestURI().contains("profile") ? "bg-gray-100" : "" %>">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-gray-700">Profile</span>
        </a>
      </li>

    </ul>
  </nav>

  <!-- Logout (bottom) -->
  <div class="p-4 border-t">
    <a href="${pageContext.request.contextPath}/logout" class="flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors hover:bg-red-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
      </svg>
      <span class="text-red-600 font-medium">Logout</span>
    </a>
  </div>
</aside>
