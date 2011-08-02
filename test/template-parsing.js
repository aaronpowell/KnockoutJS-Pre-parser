module("simple template parsing", {
  setup: function() {
    this.templateName = 'simple-template';
    
    $('<script type="application/x-jquery-tmpl" id="' + this.templateName + '"><span data-ko-text="firstName"></span><span data-ko-text="lastName"></span></script>')
      .appendTo(document.body);
  },
  teardown: function() {
    $('#' + this.templateName)
      .remove();
  }
});

test('template binding picked up', function() {
  var node = $('<div data-ko-template="' + this.templateName + '"></div>').get(0);
  
  ko.applyBindings({ firstName: 'Aaron', lastName: 'Powell' }, node);
  
  equal(node.children.length, 2);
});

test('template nodes get data-bind added to them', function() {
  var node = $('<div data-ko-template="' + this.templateName + '"></div>').get(0);
  
  ko.applyBindings({ firstName: 'Aaron', lastName: 'Powell' }, node);
  
  equal(node.children[0].hasAttribute('data-bind'), true);
  equal(node.children[1].hasAttribute('data-bind'), true);
});

test('template values are bound', function() {
  var node = $('<div data-ko-template="' + this.templateName + '"></div>').get(0);
  
  ko.applyBindings({ firstName: 'Aaron', lastName: 'Powell' }, node);
  
  equal(node.children[0].innerHTML, 'Aaron');
  equal(node.children[1].innerHTML, 'Powell');
});