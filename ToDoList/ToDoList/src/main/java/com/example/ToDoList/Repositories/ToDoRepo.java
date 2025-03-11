package com.example.ToDoList.Repositories;

import com.example.ToDoList.Models.ToDoModel;
import com.example.ToDoList.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepo extends JpaRepository<ToDoModel, Long> {
    List<ToDoModel> findByUserId(Long userId);
}
