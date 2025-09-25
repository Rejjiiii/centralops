package com.centralops.centralops_backend.controller;

import org.springframework.ui.Model;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.centralops.centralops_backend.model.User;
import com.centralops.centralops_backend.service.UserService;

import jakarta.servlet.http.HttpSession;

@Controller
public class JspController {

    private final UserService service;

    public JspController(UserService service) {
        this.service = service;
    }

    @GetMapping("/login")
    public String loginPage(HttpSession session) {
        if (session.getAttribute("user") != null) {
            return "redirect:/profile";
        }
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login"; 
    }

    @GetMapping("/dashboard")
    public String dashboardPage() {
        return "dashboard";
    }

    @GetMapping("/profile")
    public String profilePage(Model model) {
        model.addAttribute("username", "admin");
        return "profile";
    }

    @GetMapping("/user-list")
    public String showUserListPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String role,
            Model model) {

        int pageSize = 10;

        // Get filtered users
        List<User> users = service.getFilteredUsers(page, pageSize, search, role);
        long totalUsers = service.countFilteredUsers(search, role);
        int totalPages = (int) Math.ceil((double) totalUsers / pageSize);

        model.addAttribute("users", users);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", totalPages);
        model.addAttribute("totalUsers", totalUsers);

        return "user-list"; 
    }

}
