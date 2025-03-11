package com.example.ToDoList.Controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.ToDoList.Models.UserModel;
import com.example.ToDoList.Repositories.UserRepo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

import static com.example.ToDoList.Controllers.LoginController.tokenStore;
@CrossOrigin
@RestController
public class LoginController {
    public static final Map<String, String> tokenStore = new HashMap<>();
    @Autowired
    UserRepo userRepo;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@gmail\\.(com|in)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^[6-9][0-9]{9}$");

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserModel user) {
        Map<String, String> response = new HashMap<>();
        List<UserModel> list = userRepo.Validation(user.getUsername(), user.getPassword());

        if (list.isEmpty()) {
            response.put("Sign In", "Failed");
            response.put("User", "Not found");
        } else {
            UserModel foundUser = list.get(0);
            if (!user.getPassword().equals(foundUser.getPassword())) {
                response.put("Sign In", "Failed");
                response.put("User", "Invalid password");
            } else {
                String token = UUID.randomUUID().toString();
                tokenStore.put(token, foundUser.getUsername());
                response.put("Token", token);
                response.put("Sign In", "Success");
                response.put("UserId", Long.toString(foundUser.getUserId()));
                response.put("Username", foundUser.getUsername());
                response.put("Email", foundUser.getEmail());
                response.put("PhoneNumber", foundUser.getPhoneNumber());
                response.put("FirstName", foundUser.getFirstName());
                response.put("LastName", foundUser.getLastName());
            }
        }
        return ResponseEntity.ok(response);
    }
}