package com.resetmechanism.forgotPassword.service;

import java.util.List;
import java.util.Map;

import com.resetmechanism.forgotPassword.model.UserDetail;

public interface UserDetailService {
	
	public UserDetail saveUserDetail(UserDetail userDetails) throws Exception;
	public List<UserDetail> getAllUserDetails() throws Exception;
	public UserDetail getUserById(int userId) throws Exception;
	public UserDetail verifyUser(Map<String, Object> requestParams) throws Exception;
	public Boolean verifyOtp(Map<String, Object> requestParams) throws Exception;
	public UserDetail resetPassword(Map<String, Object> requestParams) throws Exception;

}
