package com.tiesch.kata.pp_3_3_rest_controllers.service;

import com.tiesch.kata.pp_3_3_rest_controllers.dao.RoleRepository;
import com.tiesch.kata.pp_3_3_rest_controllers.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService{

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Set<Role> findByIdRoles(List<Long> roles) {
        return new HashSet<>(roleRepository.findAllById(roles));
    }

    @Override
    public List<Role> findAllRole() {
        return roleRepository.findAll();
    }
}
