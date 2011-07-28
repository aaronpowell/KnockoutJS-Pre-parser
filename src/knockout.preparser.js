(function(undefined) {
  var _applyBindings,
    attrRegex = /^data-ko-/,
    propRegex = /^data-ko-(.+)/,
    parse;
  if(!ko) {
    throw 'Knockout hasn\'t been included on the page yet, ensure that knockout.preparser is included after knockout itself';
  }
  
  _applyBindings = ko.applyBindings;
  
  parse = function(node) {
    var attributes = node.attributes,
        attribute,
        dataBind = '',
        children = node.childNodes;
        
    for(var i=0, il=attributes.length; i < il; i++) {
      attribute = attributes[i];
      if(attrRegex.test(attribute.name)) {
        if(dataBind) {
          dataBind += ',';
        }
        dataBind += attribute.name.match(propRegex)[1] + ':' + attribute.value;
      }
    }
    
    node.setAttribute('data-bind', dataBind);
    
    for(var i=0, il = children; i < il; i++) {
      parse(children[i]);
    }
  };
  
  ko.applyBindings = function(viewModel, rootNode) {
    rootNode = rootNode || window.document.body;    
    parse(rootNode);
    _applyBindings(viewModel, rootNode);
  };
})();