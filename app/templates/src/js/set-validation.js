// ---------------------------------------------------------------------
// set form validation...

import 'jquery';
import 'jzaefferer/jquery-validation';
import '../../vendor/js/jquery.validate.additional';


export default function($input) {

	var inputRules = {},
		inputMessages = {};

	if ($input.data('validation-required')) {
		inputMessages.required = $input.data('validation-required');
		//console.log('Added a required rule.');
	}

	if ($input.data('validation-email')) {
		inputRules.email = true;
		inputMessages.email = $input.data('validation-required');
		//console.log('Added an email rule.');
	}

	if ($input.data('validation-tel')) {
		inputRules.intlphone = true;
		inputMessages.intlphone = $input.data('validation-tel');
		//console.log('Added a telephone rule.');
	}

	if ($input.data('validation-zip')) {
		inputRules.zipcodeUS = true;
		inputMessages.zipcodeUS = $input.data('validation-zip');
		//console.log('Added a zip code rule.');
	}

	if ($input.attr('id') === 'ConfirmPassword' || $input.attr('id') === 'confirmPassword' || $input.attr('id') === 'confirm_password' || $input.attr('id') === 'confirm-password' && $input.data('validation-equals')) {
		inputRules.equalTo = $input.data('validation-equals');
		inputMessages.equalTo = 'Please enter the same password again'
		//console.log('Added a confirm password rule.');
	}

	if ($input.attr('id') === 'ConfirmEmail' || $input.attr('id') === 'confirmEmail' || $input.attr('id') === 'confirm_email' || $input.attr('id') === 'confirm-email' && $input.data('validation-equals')) {
		inputRules.equalTo = $input.data('validation-equals');
		inputMessages.equalTo = 'Please enter the same email again'
		//console.log('Added a confirm password rule.');
	}

	// add inputMessages to inputRules object
	inputRules.messages = inputMessages;

	$input.rules('add', inputRules);

}
