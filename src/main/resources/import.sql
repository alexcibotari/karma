#Account
INSERT INTO user (id, user_name, email, enabled, password_hash, created_by, created_date) VALUE ('1', 'system', 'system@system', 0, '', 1, '2013-09-29 22:00:00');
INSERT INTO user (id, user_name, email, enabled, password_hash, created_by, created_date) VALUE ('2', 'admin', 'admin@admin', 1, '$2a$10$l/lHKoFTFdzfVyyZ9oIDPu3voNZZLu/9qi.8BhDMHRcaFmetHx/UO',1, '2013-09-29 22:00:00');
INSERT INTO user (id, user_name, email, enabled, password_hash, created_by, created_date) VALUE ('3', 'user', 'user@user', 1, '$2a$10$muOJKIPqChcNnFu8nduPJONfT3uSsTIoQRstlWFXYJ3c1Yln0kzt.',1,'2013-09-29 22:00:00');
#Authority
INSERT INTO authority (name) VALUES ('ROLE_ADMIN');
INSERT INTO authority (name) VALUES ('ROLE_USER');
#Authorities
INSERT INTO authorities (user_id, authority_name) VALUES (1,'ROLE_ADMIN');
INSERT INTO authorities (user_id, authority_name) VALUES (2,'ROLE_USER');
