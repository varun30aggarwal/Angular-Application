package com.email.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.email.beans.TaskDetails;
import com.mail.dao.GettaskDetails;



//@RestController
@Component
public  class Controller {

	@Autowired
	SMTPMailSender smtp ;
	@Autowired
	GettaskDetails getDetails;
	
	//@RequestMapping(value="/getmail", method=RequestMethod.GET)
	@Scheduled(fixedRate = Long.MAX_VALUE)
	public void sendMail() throws MessagingException
	{
 		List<TaskDetails> ts = getDetails.getDetails();
		int size =ts.size();
		for(int i =0;i<size;i++){
		smtp.send(ts.get(i).getEmail(), "Task Details", "<html> <body><h1>Task Details:</h1><br><h2> Work:"+ getDetails.getDetails().get(i).getTask()+"</h2><br><h2> Due Date:"+ts.get(i).getDueDate()+"</h2><br><h2> Status:" +ts.get(i).getStatus() +"</h2></body></html>");
	}  
	}
	
}
