/**
 * Typeahead (jquery)
 */

'use strict';

$(function () {
  // String Matcher function
  var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };
  var rack = [
    'R01-A1',
    'R01-A2',
    'R01-A3',
    'R02-A1',
    'R02-A2',
    'R02-A3',
    'R03-A1',
    'R03-A2',
    'R03-A3',
    'R04-A1',
    'R04-A2',
    'R04-A3',
    'R05-A1',
    'R05-A2',
    'R05-A3'
  ];

  if (isRtl) {
    $('.typeahead').attr('dir', 'rtl');
  }

  // Basic
  // --------------------------------------------------------------------
  $('.typeahead').typeahead(
    {
      hint: !isRtl,
      highlight: true,
      minLength: 1
    },
    {
      name: 'rack',
      source: substringMatcher(rack)
    }
  );

  var bloodhoundBasicExample = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: rack
  });
});
