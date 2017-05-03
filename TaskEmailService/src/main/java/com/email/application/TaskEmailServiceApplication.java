package com.email.application;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.email.controller.Controller;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages={"com.email.controller","com.mail.dao"})
public class TaskEmailServiceApplication {

	
	
	public static void main(String[] args) throws MessagingException {
	//Controller ctrl = new Controller();
		
		SpringApplication.run(TaskEmailServiceApplication.class, args);
		//ctrl.sendMail();
	
	}
}
