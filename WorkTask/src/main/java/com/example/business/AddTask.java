package com.example.business;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Dao.AddStatusDao;
import com.example.bean.AddStatus;
@Component
public class AddTask {
	List<Integer> names = new ArrayList<>();
	List<AddStatus> ls = new ArrayList<>();
	int task_id=0;
	@Autowired
	AddStatusDao add;
	public void insertTask(List<AddStatus> addstatus)
	{ 
		
 		for(int j=1;j<addstatus.size();j++){
 			names.clear();
 			ls.clear();
			if(addstatus.get(j).getTaskName()!=""){
				
			task_id=add.getId(addstatus.get(j).getTaskName());
				
				
		for(int i =0;i<addstatus.get(j).getName().size();i++)
		{ 
			names.add(addstatus.get(j).getName().get(i));
			System.out.print(addstatus.get(j).getName().get(i)+ " ");
		}
		System.out.println(addstatus.get(j).getStartDate());
		System.out.println(addstatus.get(j).getEndDate());
		
		long difference =  (addstatus.get(j).getEndDate().getTime()-addstatus.get(j).getStartDate().getTime())/86400000;
        int duration = (int) Math.abs(difference);
		int day=0;
	long startDate=addstatus.get(j).getStartDate().getTime();
		int login_id =addstatus.get(j).getLogin_id();
          String frequency = addstatus.get(j).getFrequency();
          if(frequency.equalsIgnoreCase("Daily"))
        	  day=1;
          else if(frequency.equalsIgnoreCase("Weekly")) day=7;
          else day=30;
          int multiple=addstatus.get(j).getMultipleParticipants();
          String taskname=addstatus.get(j).getTaskName();
          java.sql.Date tomorrow=null;
          int counter=-1;
          long tempdate=0;
          for(int i =1; i<=duration;)
          {
        	
        	  if((multiple==1)||(multiple==0))
        	  {  
        		  for(int k=0;k<names.size();k++)
        		  {
        			  AddStatus ad = new AddStatus();
        			  counter++;
        		  if(i==1)
        		 tomorrow = addstatus.get(j).getStartDate();
        		  else
        			  tomorrow = new java.sql.Date( tempdate+ (24*60*60*1000*day));
        			 ad.setLogin_id(names.get(k));
        			  ad.setEndDate(tomorrow);
        			  ad.setTaskName(taskname); 
        			  ad.setStatus("Incomplete");
        			  ad.setTask_id(task_id);
        			  ls.add(ad);
        			  tempdate=tomorrow.getTime();
        			i=  i+day;
        		  }
        	  }
        	  else
        	  {
        		  
        	  }
          }
	
	   add.insertBatch(ls);
		
		
	}
		}
	}
	
}
