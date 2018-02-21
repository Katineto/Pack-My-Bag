let m = require('mithril')

let Items = require('./src/models/Items')
let Layout = require('./src/views/Layout')


const bag = localStorage.getItem('bag')

if(bag == null) {
    Items.addItem('Item one #first #tag')
} else {
    Items.list = JSON.parse(bag)
}


m.mount(document.body, Layout)