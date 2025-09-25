package com.centralops.centralops_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_department_mst")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dept_id")
    private Long deptId;

    @Column(name = "dept_name")
    private String deptName;

    // getters & setters
    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }
}
