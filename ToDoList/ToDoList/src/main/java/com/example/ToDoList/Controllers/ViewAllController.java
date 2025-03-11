package com.example.ToDoList.Controllers;

import com.example.ToDoList.Repositories.ToDoRepo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import java.util.List;
import com.example.ToDoList.Models.ToDoModel;

import static com.example.ToDoList.Controllers.LoginController.tokenStore;
@CrossOrigin
@RestController
public class ViewAllController {
    @Autowired
    ToDoRepo toDoRepo;

    @GetMapping("/viewAll")
    public ResponseEntity<?> viewAllToDos(@RequestHeader("Authorization") String token) {
        if (token == null || !tokenStore.containsKey(token)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        List<ToDoModel> todos = toDoRepo.findAll();
        return ResponseEntity.ok(todos);
    }
}