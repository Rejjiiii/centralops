package com.centralops.centralops_backend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.centralops.centralops_backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u " +
           "WHERE (:search = '' OR u.username LIKE %:search%) " +
           "AND (:roleId IS NULL OR u.roleId = :roleId)")
    List<User> findFilteredUsers(@Param("search") String search,
                                 @Param("roleId") Long roleId,
                                 Pageable pageable);

    @Query("SELECT COUNT(u) FROM User u " +
           "WHERE (:search = '' OR u.username LIKE %:search%) " +
           "AND (:roleId IS NULL OR u.roleId = :roleId)")
    long countFilteredUsers(@Param("search") String search,
                            @Param("roleId") Long roleId);

}
