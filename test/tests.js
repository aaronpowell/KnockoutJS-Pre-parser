test('parser picks up root level attributes', function() {
  var node = $('<div data-ko-text="firstName"></div>').get(0);
  
  ko.applyBindings({ firstName: 'Aaron' }, node);
  
  ok(node.getAttribute('data-bind'));
});