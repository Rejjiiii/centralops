package com.centralops.centralops_backend.dto;

public class LoginResponse {
    private String message;
    private String empId;
    private String roleId;

    public LoginResponse(String message, String empId, String roleId) {
        this.message = message;
        this.empId = empId;
        this.roleId = roleId;
    }

    public String getMessage() {
        return message;
    }

    public String getEmpId() {
        return empId;
    }

    public String getRoleId() {
        return roleId;
    }
}
