package com.example.ToDoList.Controllers;

import com.example.ToDoList.Repositories.ToDoRepo;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import com.example.ToDoList.Models.ToDoModel;

import static com.example.ToDoList.Controllers.LoginController.tokenStore;
@CrossOrigin
@RestController
public class ViewMyController {
    @Autowired
    ToDoRepo toDoRepo;

    @PostMapping("/viewMine")
    public ResponseEntity<?> viewMyToDos(@RequestHeader("Authorization") String token, @RequestBody Map<String, Long> data) {
        if (token == null || !tokenStore.containsKey(token)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        Long userId = data.get("userId");
        List<ToDoModel> myTodos = toDoRepo.findByUserId(userId);
        return ResponseEntity.ok(myTodos);
    }
}
