(function (undefined) {
  var _applyBindings,
      attrRegex = /^data-ko-/,
      propRegex = /^data-ko-(.+)/,
      parse,
      parseSchema,
      __hasOwnProperty = Object.prototype.hasOwnProperty;
  if (!ko) {
    throw 'Knockout hasn\'t been included on the page yet, ensure that knockout.preparser is included after knockout itself';
  }

  _applyBindings = ko.applyBindings;

  parseSchema = function (schema, node) {
    var propertyName, i, il, property,
        dataBind = node.getAttribute('data-bind') || '',
        children = node.childNode;

    for (propertyName in schema) {
      if (!__hasOwnProperty.call(schema, propertyName)) continue;

      property = schema[propertyName];
      if (dataBind) {
        dataBind += ',';
      }

      dataBind += propertyName + ': ' + property || propertyName;
    }
    node.setAttribute('data-bind', dataBind);
    //for(i = 0, il = children.length; i < il; i++) {
    //  parseSchema(schema, children[i]);
    //}
  };

  parse = function (node) {
    if (node.nodeType === 3 || node.nodeType == 8) return;
    var attribute, name, i, il,
        attributes = node.attributes,
        dataBind = node.getAttribute('data-bind') || '',
        children = node.childNodes
        ;

    for (i = 0, il = attributes.length; i < il; i++) {
      attribute = attributes[i];
      if (attrRegex.test(attribute.name)) {
        if (dataBind) {
          dataBind += ',';
        }
        name = attribute.name.match(propRegex)[1]
        if(name === 'template') {
          dataBind += name + ': \'' + (attribute.value || name) + '\'';
        } else {
          dataBind += name + ':' + (attribute.value || name);
        }
      }
    }

    node.setAttribute('data-bind', dataBind);

    for (i = 0, il = children.length; i < il; i++) {
      parse(children[i]);
    }
  };

  ko.applyBindings = function (viewModel, schema, rootNode) {
    //check if the 2nd argument is a DOM element or a schema for the bindings
    if (schema && schema.nodeType !== undefined) {
      //we've got a DOM element, hand that to the root node
      rootNode = schema;
      schema = null;
    }

    rootNode = rootNode || window.document.body;
    if (schema) {
      parseSchema(schema, rootNode);
    } else {
      parse(rootNode);
    }
    _applyBindings(viewModel, rootNode);
  };
})();