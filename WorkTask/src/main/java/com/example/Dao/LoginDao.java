package com.example.Dao;



import java.sql.Types;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.example.bean.Login;

@Component
public class LoginDao {
@Autowired
	JdbcTemplate jdbcTemplate;

@Autowired
DataSource dataSource;


	public void registerUser(final Login addetails) {

		  String sql = "insert into customers_auth " +
			"(name,l_name, email, password,stat,group_id) VALUES (?, ?, ?,?,?,?)";
		   

		  jdbcTemplate = new JdbcTemplate(dataSource);
		   
		    
		  // define query arguments
		  
		   Object[] params = new Object[] { addetails.getName(), addetails.getL_name(), addetails.getEmail(),
		        		   addetails.getPassword(),"",addetails.getRole()};
		   
		           // define SQL types of the arguments
		   
		   int[] types = new int[] { Types.VARCHAR, Types.VARCHAR, Types.VARCHAR ,Types.VARCHAR,Types.VARCHAR,Types.VARCHAR};
		   
		   
		           
		   int row = jdbcTemplate.update(sql, params, types);
		   
		   System.out.println(row + " row inserted.");

		
			}

	
	
public int checkLogin(final Login userDetails) {
	

	Object[] params = new Object[] { userDetails.getEmail(), userDetails.getPassword()}; 
	//jdbcTemplate.
	int uid = jdbcTemplate.queryForObject(
		    "SELECT uid FROM customers_auth WHERE email = ? AND password = ?", params, Integer.class);
	
	return uid;
	
	}
}
	

