<!-- <%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> -->

<html>
<head>
    <title>User List</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>

<jsp:include page="/WEB-INF/views/common/navbar.jsp" />

<div class="container mx-auto mt-8">
    <h1 class="text-2xl font-bold mb-4">Users</h1>
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-200">
            <tr>
                <th class="py-2 px-4">Employee ID</th>
                <th class="py-2 px-4">Username</th>
                <th class="py-2 px-4">Email</th> <!-- remove if you don’t have email -->
                <th class="py-2 px-4">Role ID</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach var="user" items="${users}">
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-2 px-4">${user.empId}</td>
                    <td class="py-2 px-4">${user.username}</td>
                    <td class="py-2 px-4">${user.roleId}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</div>

</body>
</html>
