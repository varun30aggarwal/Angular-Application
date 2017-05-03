package com.example.Dao;



import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

import com.example.bean.AddStatus;

@Component
public class AddStatusDao {
@Autowired
	JdbcTemplate jdbcTemplate;


@Autowired
private DataSource dataSource;

private SimpleJdbcCall jdbcCall;
@Autowired
public void setDataSource(DataSource dataSource) {
    this.dataSource = dataSource;
    this.jdbcCall =  new SimpleJdbcCall(dataSource).
                     withProcedureName("retrive_id");
 }

  public int getId(String taskname)
  { 
  int taskid=0;
	  SqlParameterSource in = new MapSqlParameterSource().addValue("taskname", taskname);
	  
	  Map<String, Object> out = jdbcCall.execute(in);
	  
	   taskid = Integer.parseInt( (String) out.get("id"));
	  return taskid;
	  

  }


  
  
	public List<AddStatus> getName(int id)
	{
		
		
		String sql = "select a.uid,a.name from customers_auth a where a.group_id =(select group_id from customers_auth where uid =?)";
		
		return jdbcTemplate.query(sql, new Object[]{id}, new RowMapper<AddStatus>(){
			@Override
			
			public AddStatus mapRow(ResultSet rs, int rownumber) throws SQLException
			{
				AddStatus ad = new AddStatus();
			// ad.
				ad.setUID(rs.getInt(1));
				ad.setUIDNAME(rs.getString(2));
				return ad;
			}
		});
		//return template.queryForObject(sql, new Object[]{id},new BeanPropertyRowMapper<UpdateStatus>(UpdateStatus.class));
	}
  
	public void insertBatch(final List<AddStatus> ls) {

		  String sql = "insert into task_status " +
			"(TASK_ID,DUE_DATE, LOGIN_ID, STATUS) VALUES (?, ?, ?,?)";

		  jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
			  
			  @Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				AddStatus ls1 = ls.get(i);
				ps.setInt(1,ls1.getTask_id() );
				ps.setDate(2, ls1.getEndDate());
				ps.setInt(3,ls1.getLogin_id() );
				ps.setString(4, ls1.getStatus());
			}

			@Override
			public int getBatchSize() {
				return ls.size();
			}
		  });
		}
	
	
}
