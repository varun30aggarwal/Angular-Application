package com.example.controller;

import java.sql.Date;
import java.util.Collections;
import java.util.List;

import org.json.JSONObject;
//import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.example.Dao.AddStatusDao;
import com.example.Dao.UpdateStatusDAO;
import com.example.bean.AddStatus;
import com.example.bean.Report;
import com.example.bean.UpdateStatus;
import com.example.business.AddTask;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class RestServiceController {
	@Autowired
	UpdateStatusDAO dao;
	@Autowired
	AddTask add;
	
	@Autowired
	AddStatusDao addTask;
	
	
	

	@RequestMapping(value="/Report" ,method=RequestMethod.GET)  
	public List<Report> getReport(@RequestParam(value="endDate") Date end1
			,@RequestParam(value="id") int id,@RequestParam(value="startDate") Date start1 )
	{
		List<Report> up = dao.getReportStatus(id,start1,end1);
		
		return up;
	}
	
	
	
	@RequestMapping(value="/editemp" ,method=RequestMethod.GET)  
	public List<UpdateStatus> get(@RequestParam(value="endDate") Date end
			,@RequestParam(value="id") int id,@RequestParam(value="startDate") Date start )
	{
		List<UpdateStatus> up = dao.getStatus(id,start,end);
		
		return up;
	}
	
	
	
	
	@RequestMapping(value="/getNames" ,method=RequestMethod.GET)  
	public List<AddStatus> getName(@RequestParam(value="id") int id)
	{
		List<AddStatus> up = addTask.getName(id);
		
		return up;
	}
	
	
	
	//@CrossOrigin(origins = "http://localhost:80/")
	@RequestMapping(value="/editstatus" ,method=RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)  
	public @ResponseBody String update(@RequestBody UpdateStatus updatestaus)
	{
		try{
		dao.update(updatestaus);
		return  JSONObject.quote("updated successfully");
		//return Collections.singletonMap("response", "Updated Successfully");
		}
		catch(Exception e)
		{
			return JSONObject.quote(e.getMessage());
		}
		
	} 
	
	@RequestMapping(value="/insert" ,method=RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)  
	public @ResponseBody String insetTask(@RequestBody List<AddStatus> addstatus)
	{
		try{
		add.insertTask(addstatus);
		return  JSONObject.quote("inserted successfully");
		//return Collections.singletonMap("response", "Updated Successfully");
		}
		catch(Exception e)
		{
			return JSONObject.quote(e.getMessage());
		}
		
	} 
	
	
	
	
	
}
