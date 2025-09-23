<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>CentralOps JSP Frontend</title>
</head>
<body>
    <h1>Users from Backend API</h1>
    <ul id="userList"></ul>

    <script>
        // Call your Spring Boot backend
        fetch("http://localhost:8080/api/users")
            .then(res => res.json())
            .then(data => {
                const list = document.getElementById("userList");
                data.forEach(user => {
                    const li = document.createElement("li");
                    li.textContent = user.username + " (empId: " + user.empId + ")";
                    list.appendChild(li);
                });
            })
            .catch(err => console.error("Error fetching users:", err));
    </script>
</body>
</html>
