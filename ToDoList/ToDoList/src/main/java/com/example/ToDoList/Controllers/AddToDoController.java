package com.example.ToDoList.Controllers;

import com.example.ToDoList.Repositories.ToDoRepo;
import com.example.ToDoList.Models.ToDoModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static com.example.ToDoList.Controllers.LoginController.tokenStore;

@CrossOrigin
@RestController
public class AddToDoController {

    @Autowired
    ToDoRepo toDoRepo;

    @PostMapping("/addToDo")
    public ResponseEntity<?> addToDoList(@RequestHeader("Authorization") String token, @RequestBody ToDoModel todo) {
        if (token == null || !tokenStore.containsKey(token)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        ToDoModel newToDo = toDoRepo.save(todo);
        Map<String, String> response = new HashMap<>();
        response.put("status", "Success");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/completeTask")
    public ResponseEntity<?> completeTask(@RequestHeader("Authorization") String token, @RequestBody Map<String, Long> data) {
        if (token == null || !tokenStore.containsKey(token)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        Long taskId = data.get("taskId");
        if (taskId != null && toDoRepo.existsById(taskId)) {
            toDoRepo.deleteById(taskId);  // Deleting the task (same as completing it)
            return ResponseEntity.ok("Task completed and removed successfully!");
        }
        return ResponseEntity.status(404).body("Task not found.");
    }

    @DeleteMapping("/deleteTask/{taskId}")
    public ResponseEntity<?> deleteTask(@RequestHeader("Authorization") String token, @PathVariable Long taskId) {
        if (token == null || !tokenStore.containsKey(token)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        if (toDoRepo.existsById(taskId)) {
            toDoRepo.deleteById(taskId);  // Deletes the task
            return ResponseEntity.ok("Task deleted successfully!");
        }
        return ResponseEntity.status(404).body("Task not found.");
    }
}
