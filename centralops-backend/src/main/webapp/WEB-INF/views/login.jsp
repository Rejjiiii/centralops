<!-- <%@ page contentType="text/html; charset=UTF-8" language="java" %> -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Image Login</title>

    <!-- Tailwind via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/login.css">
</head>

<body class="min-h-screen bg-animated-gradient flex items-center justify-center p-4">

    <div class="absolute inset-0 overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute top-10 left-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm floating"
            style="animation-delay: 0s;"></div>
        <div class="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm floating"
            style="animation-delay: 1s;"></div>
        <div class="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm floating"
            style="animation-delay: 2s;"></div>
        <div class="absolute top-1/4 right-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm floating"
            style="animation-delay: 3s;"></div>
    </div>

    <div class="relative w-full max-w-md">
        <!-- Login Card -->
        <div
            class="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <div class="p-8">
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                </div>
                <div class="mb-6">
                    <div id="imagePreviewContainer" class="hidden mt-4 flex justify-center">
                        <div class="relative">
                            <img id="imagePreview"
                                class="image-preview w-32 h-32 rounded-full object-cover border-4 border-white/30"
                                src="" alt="Preview">
                            <div class="absolute -bottom-2 -right-2 bg-indigo-500 rounded-full p-2 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Additional Fields -->
                <div class="space-y-4">
                    <div class="relative">
                        <input type="text" id="username"
                            class="w-full bg-white/20 text-white placeholder-white/50 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition"
                            placeholder="Username">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray/40" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    <div class="relative">
                        <input type="password" id="password"
                            class="w-full bg-white/20 text-white placeholder-white/50 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition"
                            placeholder="Password">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray/70" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <button
                    class="w-full mt-6 bg-white text-indigo-600 py-3 px-4 rounded-lg font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 transition-all transform hover:scale-105 active:scale-95"
                    type="button"
                    id="loginBtn">
                    Login
                </button>

                <div class="mt-4 text-center">
                    <a href="#" class="text-white/70 hover:text-white text-sm transition">Forgot your password?</a>
                </div>
            </div>
        </div>

        <div class="absolute -bottom-10 left-0 right-0 text-center">
            <p class="text-white/50 text-sm">Don't have an account? <a href="#" class="text-white hover:underline">Sign
                    up</a></p>
        </div>
    </div>

    
</body>
<!-- Custom JS -->
 <script>
    const appContext = "${pageContext.request.contextPath}";
</script>
<script src="${pageContext.request.contextPath}/resources/js/login.js"></script>

</html>