// --------------------------------------------------------------------
// set placeholders
//
// polyfill for older browsers

/*global $*/
import 'jquery';
import 'jquery-placeholder';


$('.hideLabels li label, .hideLabels p label, .hide-label label').addClass('visuallyhidden');
$('input, textarea').placeholder();
