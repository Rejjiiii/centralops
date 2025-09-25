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

    @GetMapping({ "/", "/login" })
    public String showLogin(HttpSession session) {
        // If already logged in, go straight to profile/dashboard
        if (session.getAttribute("currentUser") != null) {
            return "redirect:/profile";
        }
        return "login"; // renders login.jsp
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }

    @GetMapping("/dashboard")
    public String dashboardPage(HttpSession session) {
        if (session.getAttribute("currentUser") == null) {
            return "redirect:/login";
        }
        return "dashboard";
    }

    @GetMapping("/profile")
    public String profilePage(HttpSession session, Model model) {
        User currentUser = (User) session.getAttribute("currentUser");
        if (currentUser == null) {
            return "redirect:/login";
        }
        model.addAttribute("username", currentUser.getUsername());
        return "profile";
    }

    @GetMapping("/user-list")
    public String showUserListPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String role,
            HttpSession session,
            Model model) {

        if (session.getAttribute("currentUser") == null) {
            return "redirect:/login";
        }

        int pageSize = 10;

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
