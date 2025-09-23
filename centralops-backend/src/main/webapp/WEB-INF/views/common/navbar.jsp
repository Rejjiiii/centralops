<!-- navbar.jsp -->
<div class="flex items-center w-full h-16 px-6 md:px-20 bg-blue-100 shadow">
    <!-- Logo -->
    <div class="flex items-center space-x-3">
        <svg class="w-8 h-8 text-indigo-600 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        <h1 class="text-xl md:text-2xl font-bold text-indigo-700 tracking-wide">
            Central<span class="text-gray-700">Ops</span>
        </h1>
    </div>

    <!-- Navbar Links -->
    <div class="hidden md:flex ml-auto items-center space-x-6">
        <a class="text-sm font-semibold text-indigo-700" href="${pageContext.request.contextPath}/dashboard">Projects</a>
        <a class="text-sm font-semibold text-gray-600 hover:text-indigo-700" href="${pageContext.request.contextPath}/team">Team</a>
        <a class="text-sm font-semibold text-gray-600 hover:text-indigo-700" href="${pageContext.request.contextPath}/activity">Activity</a>

        <!-- User Avatar -->
        <div class="flex items-center justify-center w-9 h-9 overflow-hidden rounded-full cursor-pointer border border-gray-300">
            <c:choose>
                <!-- <c:when test="${not empty user.image}">
                    <img src="${pageContext.request.contextPath}/resources/uploads/${user.image}"
                        alt="User Image" class="w-full h-full object-cover">
                </c:when> -->
                <c:otherwise>
                    <img src="${pageContext.request.contextPath}/resources/images/default-avatar.png"
                        alt="Default Avatar" class="w-full h-full object-cover">
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</div>
