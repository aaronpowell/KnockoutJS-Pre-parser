test('parser picks up root level attributes', function() {
  var node = $('<div data-ko-text="firstName"></div>').get(0);
  
  ko.applyBindings({firstName: ''}, node);
  
  ok(node.getAttribute('data-bind'));
});

test('parser picks up nested nodes', function() {
  var node = $('<div><div data-ko-text="firstName"></div></div>').get(0);
  
  ko.applyBindings({firstName: ''}, node);
  
  ok(!node.getAttribute('data-bind'));
  ok(node.childNodes[0].getAttribute('data-bind'));
});

test('parsed bindings work in knockout', function() {
  var node = $('<div data-ko-text="firstName"></div>').get(0);
  
  ko.applyBindings({ firstName: 'Aaron' }, node);
  
  ok(node.innerHTML === 'Aaron');
});

test('binding properties based on convention', function() {
  var node = $('<div data-ko-text></div>').get(0);
  
  ko.applyBindings({ text: 'Aaron' }, node);
  
  ok(node.innerHTML === 'Aaron');
});