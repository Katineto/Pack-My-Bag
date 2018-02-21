let m = require('mithril')
let ItemList = require('./ItemList')
let AddForm = require('./AddForm')
let DeleteButton = require('./DeleteButton')

module.exports = {
    view: function(){
        return m(
            'main',[
                m('h1', 'Pack My Bag'),
                m('section', [m(AddForm), m(ItemList), m(DeleteButton)])
            ]
        )
    }
}