
/*
    Procedurally Generated HTML (PGHTML)
    Copyright (C) 2015, Ricardo Gonçalves Mazeto.
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function pghtml(s){

// temp function for debug
function log(a){console.log(a)}
// get last list element
function last(a){return a[a.length-1]}
// Test Regular Expression
function test(a,b){return Ŕ(a).test(b)}
// Execute Regular Expression
function exec(a,b){return Ŕ(a).exec(b)}
// has numbered elements?
function num(a){return Ŕ(re.n).test(a)}
// has tag?
function tag(a){return Ŕ(re.t).test(a)}
// has att ?
function att(a){return Ŕ(re.a).test(a)}
// has id ?
function hid(a){return Ŕ(re.d).test(a)}
// has class ?
function cls(a){return Ŕ(re.c).test(a)}
// has string ?
function str(a){return Ŕ(re.s).test(a)}
// has Object.Reference ?
function ref(a){return Ŕ(re.o).test(a)}
// get id
function gId(a){return Ŕ(re.d).exec(a)[0].slice(1)}
// get indentation
function gInd(a){return Ŕ(re.i).exec(a)[0].length}
// get number of elements
function gNum(a){return Number.parseInt(Ŕ(re.n).exec(a)[0])}
// get tag name
function gTag(a){return Ŕ('[a-z]+[0-9]*').exec(Ŕ(re.t).exec(a)[0])[0]}
// get attr
function gAtt(a){return Ŕ(re.a).exec(a)[0].slice(a.indexOf('!')+1)}
// get Class
function gCls(a){c = Ŕ(re.c).exec(a)[0]; return c.slice(c.indexOf('.')+1).split('.')}
// get Str
function gStr(a){s = Ŕ(re.s).exec(a)[0]; return s.slice(s.indexOf("'")+1, s.length-1)}
// get referenced object
function gro(a){
    r = Ŕ('[a-zA-Z.]+').exec(Ŕ(re.o).exec(a)[0])[0].split('.')
    v = window[r[0]]
    for(var i=1;i<r.length;i++){v=v[r[i]]}
    
    return v
}

    var Ŕ = RegExp

    /*RegExp string index*/
    var re = {
        /*indentation*/
        i:'^[ ]*',
        /*number of elements*/
        n:'^[ ]*[0-9]+',
        /*tag*/
        t:'^[ ]*([0-9]+)?[a-z0-9]+',
        /*attribute*/
        a:'^[ ]*![a-zA-Z0-9-]+',
        /*id*/
        d:'(#[a-zA-Z0-9_]+){1}',
        /*Class*/
        c:'^[ ]*[a-zA-Z0-9#]+([.]{1}[a-zA-Z0-9]+)+',
        /*string*/
        s:'[:]{1}[ ]*[\'\"]{1}.+[\'\"]{1}$',
        /*Object Reference*/
        o:'[:]{1}[ ]+[a-zA-Z0-9_.]+$',
    }

    /*splited strings*/
    var Ŝ = Array.isArray(s)?s:s.split('\n')

    /*Box to store the DOM tree*/
    var div = document.createElement('div')

    // first time
    if(!window['ĉẍ']){
        var div = document.createElement('div')
        var dbx = [div]
        var ĉẍ = [last(dbx)]
        var ṕí = [0]
        var áí = [0]
    }

    // further times.
    else{
        dbx.push(document.createElement('div'))
        ṕí.push(0)
        áí.push(0)
        ĉẍ.push(last(dbx))
    }

    /*For each line in splited strings*/
    for(var Ï=0;Ï<Ŝ.length;Ï++){
        var ï = Ŝ[Ï]
        /*If numbered line has child elements*/
        /*
        if(RegExp(re.n).test(Ŝ[Ï])){
            //child lines
            chl = 0
            //parent indentation
            pi = RegExp(re.i).exec(Ŝ[Ï])[0].length
            //counter
            i = Ï;
            for(i=i;Ï+i <= Ŝ.length;i++){
                // indentation level
                il = RegExp(re.i).exec(Ŝ[Ï+i])[0].length
                // attribute?
                a = RegExp(re.a).test(Ŝ[Ï+i])
                // tag?
                t = RegExp(re.t).test(Ŝ[Ï+i])
                if(a){continue}
                if(il > pi && t){chl++}
                if(il <= pi && t){break}
            }
            if(chl>0){
                // elements slice
                es = Ŝ.slice(Ï, Ï+i);
                chld = pghtml(es)
                log(chld)
                ĉẍ[ĉẍ.length-1].appendChild(chld)
            }
        }
        */
        /*Attribute?*/
        if(att(ï)){
            /*get Attr name*/
            var a = gAtt(ï)
            /*set up the cursor*/
            var e = last(ĉẍ).lastElementChild
            /* attr = value */
            if(str(ï)){
                /*get string value*/
                var v = gStr(ï)
                /*loop through the number of elements to apply*/
                for(var i=0;i<n;i++){
                    e.setAttribute(a, v)
                    e = e.previousElementSibling
                }
                continue
            }
            /* Attr = Obj.Ref */
            if(ref(ï)){
                v = gro(ï)
                if(Array.isArray(v) && v.length == n){
                    for(var i=n;i>0;i--){
                        e.setAttribute(a, v[i-1])
                        e = e.previousElementSibling
                    }
                }
                continue
            }
            /* Attr */
            else{e.setAttribute(a, '');continue}
        }

        /*if isn't att,*/
        /*it is a tag, then:*/
        /*update previous indentation Ï*/
        /*before update the actual indentation Ï*/
        ṕí[ṕí.length-1] = last(áí)
        /*set actual indentation Ï*/
        áí[áí.length-1] = gInd(ï)
        if(last(áí)>last(ṕí)){
            /*set cursor*/
            ĉẍ[ĉẍ.length-1] = last(ĉẍ).lastElementChild
            /*if the parentElement number > 1*/
            /*is bigger*/
        }
        else if(last(áí)<last(ṕí)){
            /*if it is smaller,*/
            /*loop until it match*/
            /*the right tree level*/
            for(df=1;df<=last(ṕí)-last(áí);df++){
                ĉẍ[ĉẍ.length-1] = last(ĉẍ).parentElement
            }
        }

        /*Number of tags to generate*/
        var n = num(ï)?gNum(ï):tag(ï)?1:n
        /* the line above is equivalent to:
        if(num(ï)){
            n = gNum(ï)
        }
        else{
            if(tag(ï)){
                n = 1
            }
            else{
                n=n
            }
        }
        */

        /*tag name*/
        var tn = gTag(ï)

        /*Elements Array.*/
        var ea = []

        for (var i=0;i<n;i+=1){
            /*the following code bugs idk y*/
            /*this fix the problem:*/
            ea.push(document.createElement(tn))
        }

        /*id ?*/
        if(hid(ï)){
            var id = gId(ï)
            if(n == 1){
                ea[0].setAttribute('id', id)
            }
            else{
                for(o=1; o<=n; o++){
                    ea[o-1].setAttribute('id',id+"_"+o)
                }
            }
        }

        /*Class ?*/
        if(cls(ï)){
            /*classes list*/
            var cl = gCls(ï)
            /*loop through N*/
            for(var i=0;i<n;i+=1){
                for(var ç=0;ç<cl.length;ç++){
                    ea[i].classList.add(cl[ç])
                }
            }
        }

        /*it has a string ?*/
        if(str(ï)){
            var s = gStr(ï)
            for(var i=1;i<=n;i++){
                ea[i-1].innerHTML = s
            }
        }

        /* Obj.Ref ? */
        if(ref(ï)){
            var v = gro(Ŝ[Ï])
            // elements number match with obj ref?
            if(n == v.length && Array.isArray(v)){
                for(i=0;i<n;i++){
                    ea[i].innerHTML = v[i]
                }
            }
        }

        for(var i=0;i<ea.length;i++){
            last(ĉẍ).appendChild(ea[i])
        }
    }
    var ret = last(dbx)
    /*if the returned DOM tree has just one child element,
    return it instead of return the whole element wrapper.
    */
    ret = ret.children.length==1?ret.children[0]:ret
    dbx.pop()
    ĉẍ.pop()
    ṕí.pop()
    áí.pop()
    return ret
}
