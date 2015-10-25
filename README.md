
##PGHTML

procedurally generated html.

Pghtml is a micro framework (<1kb minified and gzipped) containing a single function, pghtml(str), that parses a string like this:

    div#idName.className
    !meta: 'data'
     10div#id.another.class_a.class_b: obj.ref
    p: 'string'

Escaped like that:

    "div#idName.className\n    !meta: 'data'\n     10div#id.another.class_a.class_b: obj.ref\n    p: 'string'"

and returns a DOM tree root element:

    <div>
        <div id="idName" class="className" meta="data">
            <div id="id_1" class="class_a class_b">The </div>
            <div id="id_2" class="class_a class_b">quick </div>
            <div id="id_3" class="class_a class_b">brown </div>
            <div id="id_4" class="class_a class_b">fox </div>
            <div id="id_5" class="class_a class_b">jumps </div>
            <div id="id_6" class="class_a class_b">over </div>
            <div id="id_7" class="class_a class_b">the </div>
            <div id="id_8" class="class_a class_b">lazy </div>
            <div id="id_9" class="class_a class_b">dog</div>
            <div id="id_10" class="class_a class_b">!</div>
        </div>
        <p>string</p>
    </div>

This can be useful in cases of websites that has markup patterns that repeats itself several times. The server and client save bandwidth from send and received data.

That string is a description of the html structure based on the YAML key=value syntax. 

    [_][n]el[#id][.class][:"string" || obj.ref]

where:

_ = indentation
n = number of elements
el = element name

If a line contains a 'key=value', the value can be a object reference. If the object is an array and matches the number of elements, each item on the list is applied as inner html to each element.

Attributes are applied to the last element above the attribute line:

    !attribute: "string"

The ':' is optional if the string doesn't contains inner html.

If you're using Sublime Text, the package [StringEncode](https://packagecontrol.io/packages/StringEncode) deals with escape and unescaping JSON strings.

The surrounding div works like a wrapper, just to deliver the whole DOM tree in a single element.

####Features to deploy

apply attributes to multiple elements.

    2div
    !meta="data"

    <div meta="data"></div>
    <div meta="data"></div>

Empty attributes.

    div
    !attr

    <div attr></div>

Function reference.

    div#id.class: foo(arg)

Tab indentation support.

Actually pghtml only supports space indentation where each additional space means one level down the tree.

    div
     div
      div
    div

####Copyright and Licence

Copyright (C) 2015 - [Mazeto, Ricardo](https://twitter.com/ricardomazeto).
Code released under the [GPL Licence](http://www.gnu.org/licenses).
