# KnockoutJS Pre-parser

I think that [KnockoutJS](http://knockoutjs.com) is a pretty cool library but I'm not a *huge* fan of how the `data-bind` attribute can begin to look in complex scenarios. I'm also not a huge fan of embedding a large amount of JavaScript in my HTML.

The goal of the KnockoutJS Pre-parser is to use more `data-*` attributes to better describe in HTML what you're intending to do.

# How's it work?

The way the KnockoutJS Pre-parser works is by looking at a DOM element for the `data-ko-*` attributes and using those to build up a `data-bind` attribute. 

For example it will take this:

    <p>First name: <span data-ko-text="firstName">todo</span></p>
    <p>Last name: <span data-ko-text="lastName">todo</span></p>
    
And produce this:

    <p>First name: <span data-bind=" text: firstName ">todo</span></p>
    <p>Last name: <span data-bind=" text: lastName ">todo</span></p>

The intent is for the `data-ko-*` attributes to describe in your HTML rather than having a single attribute with a JSON-*esq* string.

# Version

0.0.2