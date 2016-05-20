/**
 * Sanitizes an HTML attribute value without attempting to validate it by type.
 *
 * Sanitizes individual attribute values, but does not attempt to validate
 * them by type (e.g. this will not try to stop you from using "9" as a CSS
 * class name, but will silently transform "the attribute value "&*value@%^&"
 * to "value").
 *
 * @param {string} value
 *   A string to be used as an html attribute value.
 *
 * @return {string}
 *   The sanitized version of the incoming string.
 *
 * @see https://www.w3.org/TR/CSS21/syndata.html#characters
 * @see http://web.archive.org/web/20101104085449/http://hamstersoup.com/javascript/regexp_character_class_tester.html
 */
Drupal.theme.cleanAttribute = function(value) {
  "use strict";

  // Strip anything that is not alphanumeric, in the specified unicode range,
  // a hyphen, or an underscore and return the result.
  return value.replace('/[^a-zA-Z0-9\u00a0-\uffff-_]/g', '');
};
