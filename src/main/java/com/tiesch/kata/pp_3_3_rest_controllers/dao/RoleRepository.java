package com.tiesch.kata.pp_3_3_rest_controllers.dao;

import com.tiesch.kata.pp_3_3_rest_controllers.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}