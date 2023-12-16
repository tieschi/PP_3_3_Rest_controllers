package com.tiesch.kata.pp_3_3_rest_controllers.controller;

import com.tiesch.kata.pp_3_3_rest_controllers.model.User;
import com.tiesch.kata.pp_3_3_rest_controllers.service.RoleService;
import com.tiesch.kata.pp_3_3_rest_controllers.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api")
public class RestApiController {

    private final UserService userService;

    @Autowired
    public RestApiController(RoleService roleService, UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }

    @PutMapping("/users/{id}")
    public void pageEdit(@PathVariable("id") Long id, @Valid @RequestBody User user) {
        String password = userService.getById(id).getPassword();
        if (password.equals(user.getPassword())) {
            user.setPassword(password);
            userService.update(user);
        } else {
            userService.save(user);
        }
    }

    @PostMapping("/users")
    public void createUser(@Valid @RequestBody User user) {
        userService.save(user);
    }

    @DeleteMapping("/users/{id}")
    public void pageDelete(@PathVariable("id") Long id) {
        userService.deleteById(id);
    }

    @GetMapping("/user")
    public User getUserByUsername (Principal principal) {
        return userService.findByUsername(principal.getName());
    }

    @GetMapping("users/{id}")
    public User getUser (@PathVariable("id") Long id) {
        return userService.getById(id);
    }
}