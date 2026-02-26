package com.hotelbooking.config;

import com.hotelbooking.entity.User;
import com.hotelbooking.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");
        
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5176/oauth2/callback")
                    .queryParam("id", user.getId())
                    .queryParam("username", user.getUsername())
                    .queryParam("email", user.getEmail())
                    .queryParam("fullName", user.getFullName())
                    .build().toUriString();
            
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // This case should ideally be handled by CustomOAuth2UserService, but adding a fallback
            response.sendRedirect("http://localhost:5176/login?error=oauth2_failure");
        }
    }
}
