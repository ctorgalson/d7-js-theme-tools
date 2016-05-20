/**
 * Creates a string of HTML attributes.
 *
 * Converts object containing arrays of attribute values to a properly
 * formatted attribute value.
 *
 * @param {object} attrs
 *   An object consisting of strings or arrays of properties. The key should
 *   be the attribute name, and the string or array should be the value(s)
 *   for that key. Multiple values from arrays will be joined with spaces.
 *
 *   To create boolean type attributes, use an empty string or the attribute
 *   name as the value.
 *
 *   Note that attributes with multiple values MUST be passed into the attrs
 *   object as arrays--spaces will be removed from attribute strings!
 *
 * @return {string}
 *   A string of HTML attributes or an empty string.
 *
 * @example
 *   // Returns ` class="lorem ipsum" id="dolor" hidden`.
 *   var elementAttributes = Drupal.theme.attributes({
 *     class: ['lorem', 'ipsum'],
 *     id: 'dolor',
 *     hidden: 'hidden'
 *   });
 *
 * @see https://www.w3.org/TR/html5/infrastructure.html#boolean-attributes
 * @see http://stackoverflow.com/questions/4139786/what-does-it-mean-in-html-5-when-an-attribute-is-a-boolean-attribute
 */
Drupal.theme.attributes = function(attrs) {
  "use strict";

  var output = [];
  var attr = '';
  var attrValue = '';

  Object.keys(attrs).forEach(function(attrName) {
    // Create a sanitized string for the value for the current attribute (this
    // will be a space-separated string if the incoming value was an array).
    switch (typeof attrs[attrName]) {
      case 'object':
        attrValue = attrs[attrName].map(Drupal.theme.cleanAttribute).join(' ');
        break;

      default:
        attrValue = Drupal.theme.cleanAttribute(attrs[attrName]);
    }

    // Create the individual attribute string, taking into account that it might
    // be a boolean attribute like 'checked'.
    attr = (attrName === attrValue ? attrName : attrName + '="' + attrValue + '"');

    // Add the completed attribute to the output array.
    output.push(attr);
  });

  // Return a space-prepended list of space-separated attribute strings.
  return ' ' + output.join(' ');
};
