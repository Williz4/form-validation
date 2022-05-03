'use strict';

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Functions
//Show Error Function
function showError(input, message) {

	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = `Error: ${message}`;

}

//Show Success Function
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

//Check Email Is Valid
function checkEmail(input) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
	} 
}

//Check Require Fields
function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if(input.value.trim() === "") {
			showError(input, `${getFieldName(input)} Is Required`);
		} else {
			showSuccess(input);
		}
	});
}

//Check Input Length
function checkLength(input, min, max) {
	if(input.value.length < 3) {
		showError(input, `${getFieldName(input)} should be more than ${min} characters`);
	} else if(input.value.length > max) {
		showError(input, `${getFieldName(input)} should not exceed ${max} characters`);
	} else {
		showSuccess(input);
	}
}

//Check Passwords Match
function checkPasswordsMatch(input1, input2) {
	if(input1.value != input2.value) {
		showError(input2, "Passwords do not match")
	}
}

//Gets the field name and makes the first character uppercase
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listener
form.addEventListener('submit', (e)=> {
	e.preventDefault();

	/*if(username.value === "") {
		showError(username, "Username is required");
	} else {
		showSuccess(username);
	}

	if(email.value === "") {
		showError(email, "Email is required");
	} else if(!isValidEmail(email.value)){
		showError(email, 'Email isn\'t valid');
	} else {
		showSuccess(email);
	}

	if(password.value === "") {
		showError(password, "Password is required");
	} else {
		showSuccess(password);
	}

	if(password2.value === "") {
		showError(password2, "Password is required");
	} else {
		showSuccess(password2);
	}*/
	checkRequired([username, email, password, password2]);

	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});