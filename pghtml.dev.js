
/*
    Procedurally Generated HTML (PGHTML)
    Copyright (C) 2015, Ricardo Mazeto.
    
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

    /*RegExp string index*/
    re = {
        /*indentation*/
        i:'^[ ]*',
        /*number of elements*/
        n:'^[ ]*[0-9]+',
        /*tag*/
        t:'^[ ]*([0-9]+)?[a-z0-9]+',
        /*attribute*/
        a:'^[ ]*![a-zA-z]+:',
        /*ID*/
        d:'(#[a-zA-Z0-9_]+){1}',
        /*Class*/
        c:'([.]{1}[a-zA-Z0-9_]+)+',
        /*string*/
        s:'[:]{1}[ ]*[\'\"]{1}.+[\'\"]{1}$',
        /*Object Reference*/
        o:'[:]{1}[ ]+[a-zA-Z0-9_.]+$',
    }

    /*capture the time when the function was started.*/
    startTime = Date.now()

    /*toggles log on and off.*/
    /*This script is filled with lns like this:*/
    /*L ? log(thingToLog):0;*/
    L = 1

    /*splited strings*/
    SS = s.split('\n')

    /*DOM tree root to return*/
    dom = document.createElement('div')

    /*cursor inside the DOM tree*/
    /*the point where elements are appended*/
    c = dom

    /*previous indentation level*/
    pil = 0
    /*actual indentation level*/
    ail = 0

    /*For each line in splited strings*/
    for(ln=0;ln<SS.length;ln+=1){

        L ? log("parsing string: "+ln):0
        L ? log("string content: '"+SS[ln]+"'"):0

        /*Attribute?*/
        if(RegExp(re.a).test(SS[ln])){

            /*feature to deploy!!!*/
            /*last el is numbered ?*/
            /*assign attr to multiple elements*/
            /*assign multiple attr to single/multiple*/
            /*
            n = RegExp(re.n).test(SS[i-1] ? RegExp(re.n).test(SS[i-1]).slice(pli):1;
            */
            /*loop through each element*/
            /*for(i=1;i<=n;i++){}*/
            l = RegExp(re.a).exec(SS[ln])[0]
            a = l.slice(ail+1, l.length-1)
            L ? log("attribute name:'"+a+"'"):0

            /*log string value*/
            L ? log(RegExp(re.s).exec(SS[ln])):0
            v = RegExp(re.s).exec(SS[ln])[0]
            v = v.slice(v.indexOf("'")+1, v.length-1)
            L ? log("value:'"+v+"'"):0
            L ? log('setting attribute at element:'):0
            L ? log(c.lastElementChild):0
            c.lastElementChild.setAttribute(a, v)
            L ? log('----------------------------------------'):0
            continue
        }

        /*if isn't att,*/
        /*it is a tag, then:*/

        /*update previous indentation ln*/
        /*before update the actual indentation ln*/
        pil = ail
        /*set actual indentation ln*/
        ail = RegExp(re.i).exec(SS[ln])[0].length
        L ? log("pil:'"+pil+"'"):0
        L ? log("ail:'"+ail+"'"):0
        if(ail>pil){
            /*set cursor*/
            c = c.lastElementChild

            /*if the parentElement number > 1*/
            /*is bigger*/
        }
        else if(ail<pil){
            /*if it is smaller,*/
            /*loop until it match*/
            /*the right tree level*/
            for(diff=1;diff<=pil-ail;diff++){
                c = c.parentElement
            }
        }

        L ? log('cursor:'):0
        L ? log(c):0

        /*tag name*/
        tn = RegExp(re.t).exec(SS[ln])[0]

        /*remove indentation form the previous tn string*/
        tn = RegExp('[a-z]+[0-9]*').exec(tn.slice(ail))

        /*Set the number of tags to gen.*/
        if(RegExp(re.n).test(SS[ln])){
            n = RegExp(re.n).exec(SS[ln])[0].slice(ail)
            L ? log("generating: "+n+" elements."):0
        }else{n = 1}

        /*Elements Array.*/
        ea = []
        /*create a temporary DOM to store*/
        /*the elements through this ln*/
        for (i=0;i<n;i+=1){
            L ? log(i):0
            /*the following code bugs idk y*/
            /*this fix the problem:*/
            ea.push(document.createElement(tn))
        }

        /*ID ?*/
        if(RegExp(re.d).test(SS[ln])){
            ID = RegExp(re.d).exec(SS[ln])[0].slice(1)
            L ? log("Setting id: '"+ID+"'"):0
            if(n == 1){
                L ? log("setting 1 id:"):0
                ea[0].setAttribute('id', ID)
            }
            else{
                for(o=1; o<=n; o++){
                    L ? log("id pointer: '"+o+"'"):0
                    ea[o-1].setAttribute('id',ID+"_"+o)
                }
            }
        }

        /*Class ?*/
        if( RegExp(re.c).test(SS[ln]) ){
            /*classes list*/
            cl = RegExp(re.c).exec(SS[ln])[0].split('.').slice(1)
            L ? log("Setting class: '"+cl+"'"):0;               
            /*loop through N*/
            for(i=0;i<n;i+=1){
                for(classindex=1;classindex<cl.length;classindex++){
                    ea[i].classList.add(cl[classindex])
                }
            }
        }

        /*it has a string ?*/
        if(RegExp(re.s).test(SS[ln])){
            L ? log('inserting string'):0
            s = RegExp(re.s).exec(SS[ln])[0]
            L ? log("re.s:'"+s+"'"):0

            /*remove the ' from the end*/

            /*and beggining of the string*/
            s = s.slice(s.indexOf("'")+1, s.length-1)
            L ? log("sliced:'"+s+"'"):0
            for(o=1;o<=n;o++){
                ea[o-1].innerHTML = s
            }
        }

        /* Obj.Ref ? */
        if(RegExp(re.o).test(SS[ln])){

            /*object reference*/
            or = RegExp(re.o).exec(SS[ln])
            or = RegExp('[a-zA-Z.]+').exec(or)[0].split('.')
            /*value*/
            v = window[or[0]]
            L ? log(or):0

            for(ob=1;ob<or.length;ob++){
                L ? log(or[ob]):0
                v = v[or[ob]]
            }

            // elements number match with obj ref?
            if(n == v.length && Array.isArray(v)){
                for(i=0;i<n;i++){
                    ea[i].innerHTML = v[i]
                }
            }
        }
        for(i=0;i<ea.length;i++){
            L ? log("Appending i:'"+i+"'"):0
            c.appendChild(ea[i])
        }

        /*c.appendChild(e)*/
        L ? log('----------------------------------------'):0
    }
    finishTime = Date.now()
    log("Finished in " + (finishTime - startTime)/1000 + "s")
    return dom
}
