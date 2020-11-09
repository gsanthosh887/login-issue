import React from 'react';
import { GET_OTP } from '../queries/sendOtp.gql';
import { useLazyQuery } from '@apollo/react-hooks';
import defaultClasses from './login.scss';
import Button from '@magento/venia-ui/lib/components/Button/button';

const RequestOtp = (props) => {
	// Fetch the data using apollo react hooks
	const validateOtp = () => {
		if(props.telephone != null) {
			query()
		} else {
			let phone = document.getElementById("enterPhone");
			phone.classList.remove(defaultClasses.hide);
			phone.classList.add(defaultClasses.requirePhonenumber);
		}
	  }
	const [query,  { called, loading, data }] = useLazyQuery(GET_OTP, {
			variables: {telephone: props.telephone}
		});
	if (called && loading) return <p>Loading ...</p>
	if (!called) {
		return (<Button id="btn" className={defaultClasses.requestOtpBtn} onClick={() => validateOtp()}>{'Request OTP'}</Button>);
	}
	if(data){
		if(data.sendOTPtoPhone.response == "true") {
			console.log(data);
			let btn = document.getElementById("requestOtpBtn");
			btn.classList.add(defaultClasses.hide);
			let otp = document.getElementById("enterOtp");
			otp.classList.remove(defaultClasses.hide);
		} else {
			let validphoneChcek = document.getElementById("enterPhoneValid");
			validphoneChcek.classList.remove(defaultClasses.hide);
			validphoneChcek.classList.add(defaultClasses.requirePhonenumber);
		}
		
		return (<Button id="btn" className={defaultClasses.requestOtpBtn} onClick={() => validateOtp()}>{'Request OTP'}</Button>);
	}
}

export default RequestOtp;