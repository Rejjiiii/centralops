package com.centralops.centralops_backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String loadInitialPage() {
        return "index"; // Spring will look for /WEB-INF/jsp/index.jsp
    }
}

