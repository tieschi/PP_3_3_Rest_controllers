package com.tiesch.kata.pp_3_3_rest_controllers.service;

import com.tiesch.kata.pp_3_3_rest_controllers.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> findAll ();
    User getById(Long id);
    void save(User user);
    void deleteById(Long id);
    User findByUsername(String username);
    void update(User user);
    User passwordCoder(User user);
}
