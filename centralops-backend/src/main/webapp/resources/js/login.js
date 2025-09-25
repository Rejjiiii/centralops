document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        try {
            const response = await fetch(`${appContext}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                // handle 401 authorized separately
                if (response.status == 401) {
                    const errResult = await response.json();
                    alert(errResult.message || "Invalid credentials");
                    return;
                }
                throw new Error("HTTP " + response.status);
            }

            const result = await response.json();

            if (result.success) {
                // store user info in localStorage
                localStorage.setItem("currentUser", JSON.stringify({
                    empId: result.empId,
                    roleId: result.roleId,                    
                    username: username,
                }));

                alert(result.message);
                window.location.href = `${appContext}/profile`;
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong. Please try again.");
        }
    });
});
