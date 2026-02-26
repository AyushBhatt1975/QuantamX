package com.hotelbooking.controller;

import com.hotelbooking.dto.LoginRequest;
import com.hotelbooking.dto.UserDTO;
import com.hotelbooking.dto.UserRegistrationRequest;
import com.hotelbooking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
<<<<<<< HEAD
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

=======
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserRegistrationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerUser(request));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }
}