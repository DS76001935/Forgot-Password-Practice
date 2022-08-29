package com.resetmechanism.forgotPassword.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.resetmechanism.forgotPassword.model.Response;
import com.resetmechanism.forgotPassword.model.UserDetail;
import com.resetmechanism.forgotPassword.service.UserDetailService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/userDetailController")
public class UserDetailController {

	@Autowired
	private UserDetailService userDetailService;

	@PostMapping("/saveUserDetails")
	public Response<UserDetail> saveUserDetails(@RequestBody UserDetail userdetails) throws Exception {
		Response<UserDetail> res = new Response<UserDetail>();
		UserDetail user = userDetailService.saveUserDetail(userdetails);
		if (user != null) {
			res.setMessage("A user has not submitted yet!");
			res.setStatus(500);
			res.setData(null);
		} else {
			res.setMessage("A user has been saved successfully!");
			res.setStatus(200);
			res.setData(user);
		}
		return res;
	}

	@GetMapping("/getAllUserDetails")
	public Response<List<UserDetail>> getAllUserDetails() throws Exception {
		Response<List<UserDetail>> res = new Response<List<UserDetail>>();
		List<UserDetail> list = userDetailService.getAllUserDetails();
		if (list.size() > 0) {
			res.setMessage("All users are retrieved successfully!");
			res.setStatus(200);
			res.setData(list);
		} else {
			res.setMessage("!! Oops, something went wrong while retriving all user details !!");
			res.setStatus(500);
			res.setData(list);
		}
		return res;
	}

	@GetMapping("/getUserById")
	public Response<UserDetail> getUserById(@RequestParam("userId") int userId) throws Exception {
		Response<UserDetail> res = new Response<UserDetail>();
		UserDetail user = userDetailService.getUserById(userId);

		if (user != null) {
			res.setMessage("A user has been retrieved successfully!");
			res.setStatus(200);
			res.setData(user);
		} else {
			res.setMessage("!! Oops, something went wrong while retriving the user detail !!");
			res.setStatus(500);
			res.setData(null);
		}

		return res;
	}

	@PostMapping("/verifyUser")
	public Response<UserDetail> verifyUser(@RequestBody Map<String, Object> requestParams) throws Exception {

		Response<UserDetail> res = new Response<UserDetail>();

		UserDetail userDetails = userDetailService.verifyUser(requestParams);

		if (userDetails == null) {
			res.setMessage("!! Oops, an user has not been verified yet !!");
			res.setStatus(500);
			res.setData(null);
		} else {
			res.setMessage("The user has been verified successfully!");
			res.setStatus(200);
			res.setData(userDetails);
		}

		return res;
	}

	@PostMapping("/verifyOtp")
	public Response<Boolean> verifyOtp(@RequestBody Map<String, Object> requestParams) throws Exception {
		Response<Boolean> res = new Response<Boolean>();
		Boolean flag = userDetailService.verifyOtp(requestParams);
		if (flag) {
			System.out.println("OTP Verified Successfully!");
			res.setMessage("OTP Verified Successfully!");
			res.setStatus(200);
			res.setData(flag);
		} else {
			System.out.println("Something went wrong!");
			res.setMessage("Something went wrong!");
			res.setStatus(500);
			res.setData(flag);
		}
		return res;
	}

	@PostMapping("/resetPassword")
	public Response<UserDetail> resetPassword(@RequestBody Map<String, Object> requestParams) throws Exception {
		Response<UserDetail> res = new Response<UserDetail>();
		UserDetail user = userDetailService.resetPassword(requestParams);

		if (user == null) {
			System.out.println("Something went wrong!");
			res.setMessage("Something went wrong!");
			res.setStatus(500);
			res.setData(null);
		} else {
			System.out.println("Password has been changhed successfully!");
			res.setMessage("Password has been changhed successfully!");
			res.setStatus(200);
			res.setData(user);
		}

		return res;
	}

}
