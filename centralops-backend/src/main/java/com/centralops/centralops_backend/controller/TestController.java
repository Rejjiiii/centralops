package com.centralops.centralops_backend.controller;

import org.springframework.ui.Model;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.service.UserService;

@Controller
public class TestController {

    private final UserService service;

    // Constructor injection ensures 'service' is initialized
    public TestController(UserService service) {
        this.service = service;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // loads login.jsp
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("username", "admin");
        return "dashboard";// loads dashboard.jsp
    }

    @GetMapping("/users")
    public String showUserList(Model model) {
        List<User> users = service.getAllUsers();
        model.addAttribute("users", users);
        return "user-list"; // JSP page: user-list.jsp
    }

}
