package com.mail.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.email.beans.TaskDetails;




@Component
public class GettaskDetails {

	@Autowired
	JdbcTemplate template;
	Calendar calendar = Calendar.getInstance();
    java.sql.Date currentDate = new java.sql.Date(calendar.getTime().getTime());
	public List<TaskDetails> getDetails()
	{
		String sql="select a.task_name,b.due_date,b.status,c.email  from customers_auth c, task_status b ,task_master a where b.task_id=a.task_id and c.uid=b.login_id and b.due_date =? and (b.status='incomplete' or b.status ='pending')";
		
		return template.query(sql, new Object[]{currentDate}, new RowMapper<TaskDetails>(){
			@Override
			
			public TaskDetails mapRow(ResultSet rs, int rownumber) throws SQLException
			{
				TaskDetails up = new TaskDetails();
				up.setDueDate(rs.getDate(2));
				up.setTask(rs.getString(1));
				up.setStatus(rs.getString(3));
			  up.setEmail(rs.getString(4));
				return up;
			}
		});
		
		
	}
	
	
	
	
	
}
