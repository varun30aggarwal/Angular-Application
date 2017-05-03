package com.example.Dao;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.example.bean.AddStatus;
import com.example.bean.Report;
import com.example.bean.UpdateStatus;
@Configuration
@Component
public class UpdateStatusDAO {
	
	@Autowired
	JdbcTemplate template; 
	 Calendar calendar = Calendar.getInstance();
	    java.sql.Date ourJavaDateObject = new java.sql.Date(calendar.getTime().getTime());

	public List<UpdateStatus> getStatus(int id,Date start,Date end)
	{
		String sql="";
		if(start.toString().equals("1968-12-01")&& end.toString().equals("1968-12-01")){
			
			end=ourJavaDateObject;
		}
		
		{
			 sql = "select a.task_name,b.due_date,b.login_id,b.status  from task_status b ,task_master a where b.login_id=? and b.task_id=a.task_id  and b.due_date >= ?and b.due_date <=?";

		}
		return template.query(sql, new Object[]{id,start,end}, new RowMapper<UpdateStatus>(){
			@Override
			
			public UpdateStatus mapRow(ResultSet rs, int rownumber) throws SQLException
			{
				UpdateStatus up = new UpdateStatus();
				up.setStatus(rs.getString(4));
				up.setLogin_id(rs.getInt(3));
				up.setDue_date(rs.getDate(2));
				up.setTaskName(rs.getString(1));
			
				return up;
			}
		});
	}
	
	
	
	
	public List<Report> getReportStatus(int id,Date start,Date end)
	{
		String sql="";
		//if(start.toString().equals("1968-12-01")&& end.toString().equals("1968-12-01")){
			
		//	end=ourJavaDateObject;
	//	}
		
		{

	
	
	
	//sql="select a.name, b.task_name, c.due_date, c.status from customers_auth a, task_master b, task_status c where  b.task_id=c.task_id and a.group_id = (Select group_id from customers_auth z WHERE z.uid=?) and c.due_date >= ?and c.due_date <=? and c.status='Incomplete' group by  a.name, b.task_name, c.due_date, c.status";

sql="select count(v.n),v.n ,v.t,v.d,v.s from (select a.name n,  b.task_name t, c.due_date d, c.status s from customers_auth a, task_master b, task_status c where  b.task_id=c.task_id and a.group_id = (Select group_id from customers_auth z WHERE z.uid=?)  and a.uid=c.login_id and c.status='InComplete' and c.due_date>=? and c.due_date<=?group by  a.name, b.task_name, c.due_date, c.status) v group by v.n";			
			
//sql="select count(v.n),v.n  from (select a.name n,  b.task_name t, c.due_date d, c.status s from customers_auth a, task_master b, task_status c where  b.task_id=c.task_id and a.group_id = (Select group_id from customers_auth z WHERE z.uid=?)  and a.uid=c.login_id and c.status='InComplete' and c.due_date>=? and c.due_date<=?group by  a.name, b.task_name, c.due_date, c.status) v group by v.n";			
			
		}
		return template.query(sql, new Object[]{id,start,end}, new RowMapper<Report>(){
			@Override
			
			public Report mapRow(ResultSet rs, int rownumber) throws SQLException
			{
				Report report = new Report();
				
			
				report.setLabel(rs.getString(2));
				report.setTask_Name(rs.getString(3));
				report.setDue_date(rs.getDate(4));
				report.setValue(rs.getInt(1));
				report.setStatus(rs.getString(5));
				
				 
				return report;
			}
		});
	}
	
	
	
	
	
	
	
	

	
	
	
	
	public int update(UpdateStatus upd)
	{
		  // java.sql.Date ourJavaDateObject = new java.sql.Date(upd.getDue_date());
		String sql = "update task_status set status='"+upd.getStatus()+"' where login_id="+upd.getLogin_id()+""
				+ " and due_date='"+upd.getDue_date()+"' "
				+ "and task_id=(select task_id from task_master where task_name='"+upd.getTaskName()+"' limit 1 )";
		return template.update(sql);
	}

}
