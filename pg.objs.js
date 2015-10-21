
log = function(a){console.log(a)}

test ="div#giftsList\n!meta: 'meta-string'\n div.s100.m50.l25\n  ul#grey.list: 'dudes'\n   li.done: 'tie:bolt'\n   li: 'shoe'\n   li: 'belt'\n  ul#pink.list: 'ladies'\n   li: 'dress'\n   li: 'hat'\n   li.done: 'shoe'\n  ul#red.list: 'family'\n   ul#mom.list: 'mom'\n    li.done: 'flowers'\n    li: 'shoe'\n   ul#dad.list: 'dad'\n    li.done: 'tie'\n    li: 'card'"

t1 = test.split('\n')

r = pg(test)

document.body.appendChild(r)

testh = "div.#navBar\n div#home : 'home'\n div#discover   : 'discover'\n div#search     : 'search'\n div#profile    : 'profile'\ndiv#posts.ms\n div.s100.m50.l25\n !onclick: 'function(){onclick(event)}'\n !meta: 'data'\n  div.ms\n   div.post\n    div.header\n     div.postTitle: obj.postTitle\n     div.desc: obj.desc\n     !onclick: 'function(){onclick(event)}'\n     div.date: obj.date\n     div.geo: obj.geo\n     !onclick: 'function(){onclick(event)}'\n    div\n     div.ms\n      div.pic: obj.pic\n      !onclick: 'function(){onclick(event)}'\n    div.footer\n     div.ms\n      div.likes: obj.likes\n      !onclick: 'function(){like(event)}'\n      div.dislike: obj.dislikes\n      !onclick: 'function(){dislike(event)}'\n      div.share: obj.shares\n      !onclick: 'function(){share(event)}'\n      div.comments\n       div.ms\n        div.cn: obj.commentsNumber"

t2 = testh.split('\n')

r = pg(testh)

document.body.appendChild(r)