package com.alexcibotari.nakama.web.resource;


import org.springframework.hateoas.core.Relation;

import javax.validation.constraints.Size;
import java.util.Set;

@Relation(value = "user", collectionRelation = "users")
public class UserResource extends AbstractAuditingResource {

    @Size(min = 3, max = 50)
    private String login;

    @Size(min = 5, max = 50)
    private String email;

    private Boolean enabled = Boolean.FALSE;

    private PersonalResource personal;

    private Set<AuthorityResource> authorities;

    public UserResource() {
    }

    public UserResource(String login, String email, Boolean enabled, Set<AuthorityResource> authorities) {
        this.login = login;
        this.email = email;
        this.enabled = enabled;
        this.authorities = authorities;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Set<AuthorityResource> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<AuthorityResource> authorities) {
        this.authorities = authorities;
    }

    public PersonalResource getPersonal() {
        return personal;
    }

    public void setPersonal(PersonalResource personal) {
        this.personal = personal;
    }

    @Override
    public String toString() {
        return "UserResource{" +
            "login='" + login + '\'' +
            ", email='" + email + '\'' +
            ", enabled=" + enabled +
            ", personal=" + personal +
            ", authorities=" + authorities +
            '}';
    }
}
