package com.tiesch.kata.pp_3_3_rest_controllers.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final SuccessUserHandler successUserHandler;

    public SecurityConfig(SuccessUserHandler successUserHandler) {
        this.successUserHandler = successUserHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                .successHandler(successUserHandler)
                .usernameParameter("username")
                .passwordParameter("password")
                .loginProcessingUrl("/login")
                .permitAll();
        http
                .authorizeRequests()
                .antMatchers("/login").anonymous()
                .antMatchers("/api/users").hasRole("ADMIN")
                .antMatchers("/api/users/**").hasRole("ADMIN")
                .antMatchers("/").hasAnyRole("ADMIN","USER")
                .anyRequest().authenticated();
        http.logout()
                .permitAll()
                .logoutSuccessUrl("/login")
                .and().csrf().disable();
    }
}
