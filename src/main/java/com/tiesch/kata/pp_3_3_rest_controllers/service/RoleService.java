package com.tiesch.kata.pp_3_3_rest_controllers.service;

import com.tiesch.kata.pp_3_3_rest_controllers.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    Set<Role> findByIdRoles(List<Long>roles);
    List<Role> findAllRole();
}
