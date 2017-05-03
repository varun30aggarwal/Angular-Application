package com.example.bean;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;



public class AddStatus {

	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy", timezone="CST")
	private Date startDate;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy", timezone="CST")
	private Date endDate;
	private String frequency;
	private List<Integer> name;
	private int multipleParticipants;
	private int login_id;
	private int task_id;
	public int getUID() {
		return UID;
	}
	public void setUID(int uID) {
		UID = uID;
	}
	public String getUIDNAME() {
		return UIDNAME;
	}
	public void setUIDNAME(String uIDNAME) {
		UIDNAME = uIDNAME;
	}
	private int UID;
	private String UIDNAME;
	
	public int getTask_id() {
		return task_id;
	}
	public void setTask_id(int task_id) {
		this.task_id = task_id;
	}
	private String status;
	private String taskName;
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getLogin_id() {
		return login_id;
	}
	public void setLogin_id(int login_id) {
		this.login_id = login_id;
	}
	
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public List<Integer> getName() {
		return name;
	}
	public void setName(List<Integer> name) {
		this.name = name;
	}
	public int getMultipleParticipants() {
		return multipleParticipants;
	}
	public void setMultipleParticipants(int multipleParticipants) {
		this.multipleParticipants = multipleParticipants;
	}
	
}
