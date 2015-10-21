/*div#giftsList
!meta: 'meta-string'
 div.s100.m50.l25
  ul#grey.list: 'dudes'
   li.done: 'tie:bolt'
   10li: 'shoe'
   li: 'belt'
  ul#pink.list: 'ladies'
   li: 'dress'
   li: 'hat'
   li.done: 'shoe'
  ul#red.list: 'family'
   ul#mom.list: 'mom'
    li.done: 'flowers'
    li: 'shoe'
   ul#dad.list: 'dad'
    li.done: 'tie'
    li: 'card'
*/

	// RegExp string index
	re = {
		// valid line
		vl:'^[ ]*[!]?[a-z]+([#a-zA-Z0-9_]+)?([.a-zA-Z0-9_]+)+[ ]?[:]?[ ]?(.)*$',
		// indentation
		i:'^[ ]*',
		// number of elements
		n:'^[ ]*[0-9]+',
		// tag
		t:"^[ ]*[a-z]+",
		// attribute
		at:'^[ ]*![a-zA-z]+:',
		// ID
		id:'(#[a-zA-Z0-9_]+){1}',
		// Class
		c:'([.]{1}[a-zA-Z0-9_]+)+',
		// string
		s:"[:]{1}[ ]*['\"]{1}.+['\"]{1}$",
		// Object Reference
		or:"[:]{1}[ ]+[a-zA-Z0-9_.]+$",
	}

function pg(s){

	// split string into a lines array
	ss = s.split('\n')
	// DOM tree root to return
	dom = document.createElement('div')
	// cursor inside the DOM
	c = dom
	// previous indentation level
	pil = 0
	// actual indentation level
	ail = 0

	for(i=0;i<ss.length;i+=1){
		log("parsing string:"+i)
		log("string content:'"+ss[i]+"'")
		// is Attribute?
		if(RegExp(re.at).test(ss[i])){
			l = RegExp(re.at).exec(ss[i])[0]
			a = l.slice(ail+1, l.length-1)
			log("attribute name:'"+a+"'")
			log(RegExp(re.s).exec(ss[i]))
			v = RegExp(re.s).exec(ss[i])[0]
			v = v.slice(v.indexOf("'")+1, v.length-1)
			log("value:'"+v+"'")
			log('setting attribute at element:')
			log(c.lastElementChild)
			c.lastElementChild.setAttribute(a, v)
			log('----------------------------------------')
		}
		// if isn't att,
		// it is a tag.
		else{
			// update previous indentation line
			// before update the actual indentation line
			pil = ail
			// set actual indentation line
			ail = RegExp(re.i).exec(ss[i])[0].length
			log("pil:'"+pil+"'")
			// if actual indentation line
			// is bigger than previous,
			// set cursor into last child
			if(ail>pil){
				c = c.lastElementChild
			}
			// if it is smaller,
			// loop until it match
			// the right tree level
			else if (ail<pil){
				for(i2=1;i2<=pil-ail;i2++){c = c.parentElement}
			}
			// tag name
			tn = RegExp(re.t).exec(ss[i])[0]
			tn = tn.slice(ail)
			// create element
			e = document.createElement(tn)
			// check if it has an ID
			// is soo, set it.
			if( RegExp(re.id).test(ss[i]) ){
				log('setting up ID')
				e.id = RegExp(re.id).exec(ss[i])[0].slice(1)
			}
			// check class
			if( RegExp(re.c).test(ss[i]) ){
				// classes list
				cl = RegExp(re.c).exec(ss[i])[0].split('.')
				// loop into the class list
				// sometimes the re.c RegExp
				// returns a '' in the array
				// the following ternary operator
				// deals with it
				for(i3 in cl){
					cl[i3].length > 0 ? e.classList.add(cl[i3]) : null
				}
			}
			// it has a string ?
			if(RegExp(re.s).test(ss[i])){
				log('inserting string')
				s = RegExp(re.s).exec(ss[i])[0]
				log("re.s:'"+s+"'")
				// remove the ' from the end
				// and beggining of the string
				s = s.slice(s.indexOf("'")+1, s.length-1)
				log("sliced:'"+s)
				e.innerHTML = s.toString()
				delete(s)
			}
			// it has a object reference ?
			if(RegExp(re.or).test(ss[i])){
				// the slice(2) removes the
				// colon and space from the string
				// or = RegExp(re.or).exec(ss[i])[0].slice(2)
				// e.innerHTML = 
			}
			c.appendChild(e)
			log('----------------------------------------')
		}
	}
	return dom
}
