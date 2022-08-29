package com.resetmechanism.forgotPassword.service;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resetmechanism.forgotPassword.model.UserDetail;
import com.resetmechanism.forgotPassword.repository.UserDetailRepository;

@Service
public class UserDetailServiceImpl implements UserDetailService {

	@Autowired
	private UserDetailRepository userDetailRepo;

//	@Autowired
//	private MailSenderServiceImpl mailSender;

	@Override
	public UserDetail saveUserDetail(UserDetail userDetails) throws Exception {

		return userDetailRepo.save(userDetails);
	}

	@Override
	public List<UserDetail> getAllUserDetails() throws Exception {

		return userDetailRepo.findAll();
	}

	@Override
	public UserDetail getUserById(int userId) {

		UserDetail user = null;

		try {
			user = userDetailRepo.findById(userId).get();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}

		return user;
	}

	@Override
	public UserDetail verifyUser(Map<String, Object> requestParams) throws Exception {

		String email = null;

		if (requestParams.get("emailId") != null) {
			email = String.valueOf(requestParams.get("emailId"));
		}

		UserDetail user = userDetailRepo.findUserDetailByEmailId(email);

//		if (user == null) {
//			throw new Exception("!!User Is Invalid!!");
//		}

		if (user != null) {
			Random num = new Random();
			Integer myOtp = num.nextInt(999999);
			System.out.println(myOtp);
			if ((int) (Math.log10(myOtp) + 1) == 6) {
				user.setOtp(myOtp);
			}
			user = userDetailRepo.save(user);
		}

//		mailSender.mailSend(email, "Hey Connection, How are you?", "Yeepiee, this is my mail!");

		return user;
	}

	@Override
	public Boolean verifyOtp(Map<String, Object> requestParams) throws Exception {

		String otp = null;
		String email = null;

		if (requestParams.get("otp") != null) {
			otp = String.valueOf(requestParams.get("otp"));
		}

		if (requestParams.get("emailId") != null) {
			email = String.valueOf(requestParams.get("emailId"));
		}

		UserDetail user = userDetailRepo.findUserDetailByEmailId(email);

		if (user == null) {
			throw new Exception("!!User Is Invalid!!");
		}

		if (user.getUserId() != null) {
			String sysOtp = String.valueOf(user.getOtp());
			if (sysOtp.equalsIgnoreCase(otp)) {

				user.setIsVerified(1);
				userDetailRepo.save(user);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	@Override
	public UserDetail resetPassword(Map<String, Object> requestParams) throws Exception {

		Integer count = null;
		String pass = null;
		String rePass = null;
		String email = null;

		if (requestParams.get("pass") != null && requestParams.get("rePass") != null) {
			pass = String.valueOf(requestParams.get("pass"));
			rePass = String.valueOf(requestParams.get("rePass"));
		}

		if (requestParams.get("emailId") != null) {
			email = String.valueOf(requestParams.get("emailId"));
		}

		UserDetail user = userDetailRepo.findUserDetailByEmailId(email);

		if (user.getUserId() != null) {
			if (pass.equalsIgnoreCase(rePass)) {

				user.setPassword(pass);
				if(user.getForgotPassCount() != null) {
					count = user.getForgotPassCount();
				}
				count += 1;
				user.setForgotPassCount(count);
				user = userDetailRepo.save(user);
			} else {
				System.out.println("!!Oops, Combination of password and confirm password is not matched!!");

				throw new Exception("!!Oops, Combination of password and confirm password is not matched!!");
			}
		} else {
			System.out.println("!! Oops, user not found !!");

			throw new Exception("!! Oops, user not found !!");
		}
		return user;
	}

}
