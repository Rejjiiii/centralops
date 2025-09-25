package com.centralops.centralops_backend.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private String empId;
    private String roleId;

    public LoginResponse(boolean success, String message, String empId, String roleId) {
        this.success = success;
        this.message = message;
        this.empId = empId;
        this.roleId = roleId;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
