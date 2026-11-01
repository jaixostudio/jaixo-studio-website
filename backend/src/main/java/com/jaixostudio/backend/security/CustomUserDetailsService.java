package com.jaixostudio.backend.security;

import com.jaixostudio.backend.entity.AdminUser;
import com.jaixostudio.backend.repository.AdminUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Custom UserDetailsService that loads administrative users from MySQL.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminUserRepository adminUserRepository;

    public CustomUserDetailsService(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser admin = adminUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin user not found with username: " + username));

        return new User(
                admin.getUsername(),
                admin.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(admin.getRole()))
        );
    }
}
