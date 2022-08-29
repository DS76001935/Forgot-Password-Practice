package com.resetmechanism.forgotPassword.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSenderServiceImpl {
	
	@Autowired
	private JavaMailSender mailSender;
	
	public void mailSend(String email, String body, String subject) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setTo(email);
		message.setFrom("shah.deep095@gmail.com");
		message.setSubject(subject);
		message.setText(body);
		
		mailSender.send(message);
		System.out.println("Mail send...");
	}

}
