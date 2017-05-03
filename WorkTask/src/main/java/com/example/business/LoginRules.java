package com.example.business;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.bean.Login;
import com.example.Dao.LoginDao;

public class LoginRules {

	@Autowired
	LoginDao login;
	
	
	public void addDetails(Login  details)
	{
		//details.s
	}
	
}
