package com.example.ToDoList.Repositories;

import com.example.ToDoList.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<UserModel, Long> {
    @Query("SELECT u FROM UserModel u WHERE u.phoneNumber = ?1")
    List<UserModel> findByPhoneNumber(String phoneNumber);

    @Query("SELECT u FROM UserModel u WHERE u.username = ?1 AND u.password = ?2")
    List<UserModel> Validation(String username, String password);
}
