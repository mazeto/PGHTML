
##PGHTML

procedurally generated html.

Pghtml is a micro framework (<1kb minified and gzipped) containing a single function, pghtml(str), that parses a string like this:

    div#idName.className
    !meta: 'data'
     10div#id.another.class_a.class_b: obj.ref
    p: 'string'

Escaped like that:

    "div#idName.className\n!meta: 'data'\n 10div#id.another.class_a.class_b: obj.ref\np: 'string'"

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

Attributes are applied to the last valid element line above:

    !attribute: "string"

The ':' is optional if the string doesn't contains inner html.

If you're using Sublime Text, the package [StringEncode](https://packagecontrol.io/packages/StringEncode) deals with escape and unescaping JSON strings.

The surrounding div works like a wrapper, just to deliver the whole DOM tree in a single element.

##Documentation

####innerHTML

input

    p: "The quick brown fox jumps over the lazy dog."

output

    <p>The quick brown fox jumps over the lazy dog.</p>

####id

input

    div#home: 'home'

output

    <div id='home'>home</div>

####class

input

    div.brown: 'fox'

output

    <div class="brown">fox</div>

####id + class

input

    div#fox.brown: 'Yeah!'

output

    <div id='fox' class='brown'>Yeah</div>

####object reference

input

    div#fox.brown: obj.ref

At this point, if the ref inside obj is a string, pghtml applies it as innerHTML.

output

    <div id='fox' class='brown'></div>

If the referenced object is a array and matches the number of elements, pghtml applies each array item to each one of the elements.

input

    9div: obj.ref

output

    <div>The</div>
    <div>quick</div>
    <div>brown</div>
    <div>fox</div>
    <div>jumps</div>
    <div>over</div>
    <div>the</div>
    <div>lazy</div>
    <div>dog.</div>

####nesting

input

    // note the one space indentation!
    div#parent
     div#child

output

    <div id='parent'>
        <div id='child'></div>
    </div>

####multiplier

Here's where most of the power is. If your page has many similar elements structures, you can multiply the elements and just apply the differences.

input

    10div#tab.grey

output

    <div id='tab_1' class='grey'></div>
    <div id='tab_2' class='grey'></div>
    <div id='tab_3' class='grey'></div>
    <div id='tab_4' class='grey'></div>
    <div id='tab_5' class='grey'></div>
    <div id='tab_6' class='grey'></div>
    <div id='tab_7' class='grey'></div>
    <div id='tab_8' class='grey'></div>
    <div id='tab_9' class='grey'></div>
    <div id='tab_10' class='grey'></div>

####attributes

input

    img.pics
    !empty-meta
    !src: "image-link.png"
    !alt: "Nice trick."

output

    <img empty-meta src="image-link.png" alt="Nice trick.">

Ok, so far so good, but attributes can also be multiplied!

input

    5img.pics
    !empty-attr
    !src: pics.src
    !alt: pics.alt

output

    <img empty-attr src="lake.png" alt="lake">
    <img empty-attr src="river.png" alt="river">
    <img empty-attr src="mountain.png" alt="mountain">
    <img empty-attr src="roadway.png" alt="roadway">
    <img empty-attr src="clouds.png" alt="clouds">


####Copyright and Licence

Copyright (C) 2015 - [Mazeto, Ricardo](https://twitter.com/ricardomazeto).
Code released under the [GPL Licence](http://www.gnu.org/licenses).