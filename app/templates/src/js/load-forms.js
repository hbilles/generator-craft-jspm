// ---------------------------------------------------------------------
// load forms from javascript templates

/*global $*/
import 'jquery';
import setValidation from './set-validation';
import pushEvent from './push-event';


var $forms = $('form'),
	formTemplates = document.querySelectorAll('script[data-type="form"]'),
	templateCount = formTemplates.length,
	validationOptions = {
		ignore: ':hidden:not(select)',
		submitHandler: function(form) {
			var $form = $(form),
				action = $form.attr('data-label');

			if ( action ) {
				pushEvent('Form Submission', action);
				//console.log('Form Submission, action: ' + action);
			}

			form.submit();
		}
	};

// function to add validation rules for each input
function validateForm($form, options) {
	var options = options || {},
		$inputs = $form.find(':input');

	$form.validate(options);

	$inputs.each(function() {
		var $this = $(this);

		setValidation($this);
	});
}

// Track existing forms on the page
$forms.each(function() {
	$form = $(this);

	// set the form's validation rules
	validateForm($form, validationOptions);
});


// Turn form templates into real forms
for ( var i = 0; i < templateCount; i++ ) {
	var formTemplate = formTemplates[i],
		formEl = document.createElement('form'),
		formAction = formTemplate.getAttribute('data-action'),
		formLabel = formTemplate.getAttribute('data-label'),
		formEnctype = formTemplate.getAttribute('data-enctype');

	// set the form's attributes and content
	formEl.className = formTemplate.getAttribute('data-class') || '';
	formEl.id = formTemplate.getAttribute('data-id') || '';

	if ( formAction ) {
		formEl.setAttribute('action', formAction);
	}

	if ( formLabel ) {
		formEl.setAttribute('data-label', formLabel);
	}

	if ( formEnctype ) {
		formEl.setAttribute('enctype', formEnctype);
	}

	formEl.setAttribute('method', 'post');
	formEl.setAttribute('accept-charset', 'UTF-8');
	formEl.innerHTML = formTemplate.innerHTML;

	// add the form to the DOM
	var parent = formTemplate.parentNode,
		form = parent.insertBefore(formEl, formTemplate),
		$form = $(form);

	// set the form's validation rules
	validateForm($form, validationOptions);
}
