package com.example.bean;

public class Login {
private String email;
private String password;
private String name;
private String l_name;
private String role;
private int login_id;

public int getLogin_id() {
	return login_id;
}
public String getL_name() {
	return l_name;
}
public void setL_name(String l_name) {
	this.l_name = l_name;
}
public String getRole() {
	return role;
}
public void setRole(String role) {
	this.role = role;
}
public void setLogin_id(int login_id) {
	this.login_id = login_id;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}




}
