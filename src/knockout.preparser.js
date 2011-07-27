(function(undefined) {
  var _applyBindings,
    rx = /^data-ko-/;
  if(!ko) {
    throw 'Knockout hasn\'t been included on the page yet, ensure that knockout.preparser is included after knockout itself';
  }
  
  _applyBindings = ko.applyBindings;
  
  ko.applyBindings = function(viewModel, rootNode) {
    var attributes, attribute, dataBind = '';
    rootNode = rootNode || window.document.body;
    
    attributes = rootNode.attributes;
    
    for(var i=0, il=attributes.length; i < il; i++) {
      attribute = attributes[i];
      if(rx.test(attribute.name)) {
        if(dataBind) {
          dataBind += ',';
        }
        dataBind += attribute.name + ':' + attribute.value;
      }
    }
    
    rootNode['data-bind'] = dataBind;
    
    _applyBindings(viewModel, rootNode);
  };
})();