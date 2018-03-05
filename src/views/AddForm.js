let m = require('mithril')
let Items = require('../models/Items')

function sortingForm () {
    if(Items.list.length > 1) {return m('form', {
        id: 'sortingForm'
    }, 
        m('select', {
            onchange: m.withAttr('value', function(value){Items.sort(value); console.log(value)})
        },
            m('option', {value: 'initial'}, 'Initial order'), 
            m('option', {value: 'alphabet'}, 'Alphabetically'),
            m('option', {value: 'bag'}, 'Items in the bag')
        )
    )}
}

AddForm = {
    view: function(){
        return m('div.form-wrapper',
                m('form', {
                    id: 'addItemForm',
                    onsubmit: function(e){
                        e.preventDefault()
                        if(Items.input !== '') {
                            Items.addItem(Items.input)
                           Items.input = ''   
                        }
                    }
                }, [
                    m('input[type=text][placeholder=Add items with tags separated by #]', {
                        class: 'main-input',
                        oninput: m.withAttr('value', function(value){
                            Items.input = value
                        }),
                        value: Items.input}),
                    ]), 
                sortingForm()
                
            
        )
    }
}

module.exports = AddForm