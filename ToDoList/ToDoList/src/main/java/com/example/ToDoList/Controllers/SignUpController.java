package com.example.ToDoList.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.ToDoList.Models.UserModel;
import com.example.ToDoList.Repositories.UserRepo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
@CrossOrigin
@RestController
public class SignUpController {
    @Autowired
    UserRepo userRepo;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@gmail\\.(com|in)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^[6-9][0-9]{9}$");

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody UserModel user) {
        Map<String, String> response = new HashMap<>();
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            response.put("Error", "Passwords do not match");
            return ResponseEntity.badRequest().body(response);
        }
        if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
            response.put("Error", "Invalid email format. Must be @gmail.com or @gmail.in");
            return ResponseEntity.badRequest().body(response);
        }
        if (!PHONE_PATTERN.matcher(user.getPhoneNumber()).matches()) {
            response.put("Error", "Invalid Indian phone number");
            return ResponseEntity.badRequest().body(response);
        }
        List<UserModel> existingUsers = userRepo.findByPhoneNumber(user.getPhoneNumber());
        if (!existingUsers.isEmpty()) {
            response.put("Error", "Phone number already registered");
            return ResponseEntity.badRequest().body(response);
        }

        userRepo.save(user);
        response.put("Status", "Success");
        response.put("Message", "User registered successfully");
        return ResponseEntity.ok(response);
    }
}
