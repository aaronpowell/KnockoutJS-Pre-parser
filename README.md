# KnockoutJS Pre-parser

I think that [KnockoutJS](http://knockoutjs.com) is a pretty cool library but I'm not a *huge* fan of how the `data-bind` attribute can begin to look in complex scenarios. I'm also not a huge fan of embedding a large amount of JavaScript in my HTML.

The goal of the KnockoutJS Pre-parser is to use more `data-*` attributes to better describe in HTML what you're intending to do.

# How's it work?

There are two ways which KnockoutJS Pre-parser works, either by parsing a provided binding schema or by using convention-based attributes.

## Binding Schema

In this mode the pre-parser will take a JavaScript object which represents the bindings that you wish to apply. These bindings will then be translated into something which KnockoutJS is able to understand and in turn bind against your ViewModel.

Currently the Binding Schema is only designed for working with very basic DOM structures, handling only the root level node. See the usages section for more information.

## Convention-based attirbutes

In this mode the pre-parser works by looking at a DOM element for the `data-ko-*` attributes and using those to build up a `data-bind` attribute. 

For example it will take this:

    <p>First name: <span data-ko-text="firstName">todo</span></p>
    <p>Last name: <span data-ko-text="lastName">todo</span></p>
    
And produce this:

    <p>First name: <span data-bind=" text: firstName ">todo</span></p>
    <p>Last name: <span data-bind=" text: lastName ">todo</span></p>

The intent is for the `data-ko-*` attributes to describe in your HTML rather than having a single attribute with a JSON-*esq* string.

# Usage

To use the KockoutJS Pre-parser in your site you simply need to add a reference to it **after the KockoutJS file**.

## Using a Binding Schema

If you want to use a provided schema you need to do so by passing it as the second argument to your binding, like so:

    var viewModel = { name: ko.observable('Aaron Powell') };
    var schema = { text: 'name' };
    var node = $('<span></span>').get(0);
    
    ko.applyBindings(viewModel, schema, node); //node.innerHTML === 'Aaron Powell'
    
## Using Convention-based attributes

If you want to use convention based attributes you just use KnockoutJS as you normally would, passing in a viewModel and an optional root node:

    var viewModel = { fistName: ko.observable('Aaron'), lastName: ko.observable('Powell') };
    var node = $('<p><span data-ko-text="firstName"></span><span data-ko-text="lastName"></span></p>').get(0);
    
    ko.applyBindings(viewModel, node); //the first span will have 'Aaron' and the second will have 'Powell'

# Version

0.0.3