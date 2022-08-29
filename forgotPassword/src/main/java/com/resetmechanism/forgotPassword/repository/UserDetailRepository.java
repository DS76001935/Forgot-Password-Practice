package com.resetmechanism.forgotPassword.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.resetmechanism.forgotPassword.model.UserDetail;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, Integer> {
	
//	@Query(value = "select * from user_detail where email_id=:emailId", nativeQuery = true)
//	public UserDetail verifyUserByEmail(String emailId);
	
	public UserDetail findUserDetailByEmailId(String email);

}
