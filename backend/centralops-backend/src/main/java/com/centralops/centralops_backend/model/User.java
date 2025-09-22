package com.centralops.centralops_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_user")  // map to existing table
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // assumes emp_id is auto-increment
    @Column(name = "emp_id")
    private String empId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "position_id")
    private Long positionId;

    @Column(name = "dept_id")
    private Long deptId;

    @Column(name = "section_id")
    private Long sectionId;

    @Column(name = "status_code")
    private String statusCode;

    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "img_src")
    private String imgSrc;

    @Column(name = "del_flag")
    private Boolean delFlag;

    @Column(name = "reg_id")
    private Long regId;

    @Column(name = "reg_date")
    private LocalDateTime regDate;

    @Column(name = "update_id")
    private String updateId;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

    // --- Getters & Setters ---
    public String getEmpId() { return empId; }
    public void setEmpId(String empId) { this.empId = empId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Long getPositionId() { return positionId; }
    public void setPositionId(Long positionId) { this.positionId = positionId; }

    public Long getDeptId() { return deptId; }
    public void setDeptId(Long deptId) { this.deptId = deptId; }

    public Long getSectionId() { return sectionId; }
    public void setSectionId(Long sectionId) { this.sectionId = sectionId; }

    public String getStatusCode() { return statusCode; }
    public void setStatusCode(String statusCode) { this.statusCode = statusCode; }

    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public String getImgSrc() { return imgSrc; }
    public void setImgSrc(String imgSrc) { this.imgSrc = imgSrc; }

    public Boolean getDelFlag() { return delFlag; }
    public void setDelFlag(Boolean delFlag) { this.delFlag = delFlag; }

    public Long getRegId() { return regId; }
    public void setRegId(Long regId) { this.regId = regId; }

    public LocalDateTime getRegDate() { return regDate; }
    public void setRegDate(LocalDateTime regDate) { this.regDate = regDate; }

    public String getUpdateId() { return updateId; }
    public void setUpdateId(String updateId) { this.updateId = updateId; }

    public LocalDateTime getUpdateDate() { return updateDate; }
    public void setUpdateDate(LocalDateTime updateDate) { this.updateDate = updateDate; }
}