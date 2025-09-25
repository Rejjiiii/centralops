package com.centralops.centralops_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_personal_info")
public class PersonalInfo {

    @Id
    @Column(name = "emp_id", nullable = false, unique = true)
    private String empId;

    @Column(name = "fname")
    private String firstName;

    @Column(name = "lname")
    private String lastName;

    @Column(name = "mname")
    private String middleName;

    @Column(name = "email")
    private String email;

    // 👉 Add more fields from tbl_personal_info as needed

    // Getters & Setters
    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }
}
