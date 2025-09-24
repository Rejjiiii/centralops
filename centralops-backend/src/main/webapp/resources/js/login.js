document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch(`${appContext}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            const result = await response.json();

            if (result.success) {
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
