package com.hrapp.hrapp.service;

import com.hrapp.hrapp.model.Credentials;
import com.hrapp.hrapp.repository.CredentialsRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final CredentialsRepository credentialsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Credentials user = credentialsRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with this username " + username);
        }

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getAuthority().name())
                .build();
    }
}
