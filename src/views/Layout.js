let m = require('mithril')
let ItemList = require('./ItemList')
let AddForm = require('./AddForm')
let DeleteButton = require('./DeleteButton')
import img from '../../img/pmb_icon.svg'

module.exports = {
    view: function(){
        return m(
            'main',[
                m('div.header', [m('img', {src: img, class: 'logo', width: '40', height: '45'}), m('h1', 'Pack My Bag')] ),
                m('section', [m(AddForm), m(ItemList), m(DeleteButton)])
            ]
        )
    }
}