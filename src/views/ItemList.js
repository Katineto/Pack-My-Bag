let m = require('mithril')
let Items = require('../models/Items')
let AddForm = require('./AddForm')



function itemEditOnDblclick(item) {
    if (item.edit == true) {
        return m(
            'form', 
            {
                onsubmit: function(e) {
                    e.preventDefault()
                    item.edit = false
                    let new_item = Items.parseString(item.original)
                    if (Items.isValid(new_item)) {
                        item.name = new_item.name
                        item.tags = new_item.tags}
                }
            }, 
            m('input[type=text]', 
            {
                oninput: m.withAttr('value', function(value) {
                    item.original = value
                }),
                value: item.original,
                class: 'edit-item-input'
            }
        )
    )
} else {
    return m(
        'div.wrapper', {
            class: item.selected ? 'item-selected' : 'item-not-selected',
            onclick: function() {
                Items.toggleSelection(item)
                Items.n = Items.countSelected()
            }
        },
        m('div.single-item', 
        {
            class: item.checked ? 'item-checked': 'item-unchecked',
            ondblclick: function() {
                Items.editInput(item)
            }
        }, 
        [item.name]
        ), 
        m('div.tags', 
        item.tags.map(function(tag) {
        return m('span.single-tag', {
            title: 'Double-click to filter',
            ondblclick: m.withAttr('innerText', function(value){
                Items.filterByTag(value)
            })
        }, tag)
        }))
    )}
}



let ItemList = {
    view: function() {
        let list = Items.list.sort(Items.fuzzySorting)
        list = list.filter(Items.filter.action)
        if (list.length > 0) {
            return m('div.item-list', 
            list.map(function(item) {
                return m('div.list-wrapper', {key: item.id},
                        m('div.checkbox-wrapper',
                            m('input[type=checkbox]', {
                            checked: item.checked,
                            onclick: function() {
                                Items.toggleCheckbox(item)
                        }
                    })), 
                    itemEditOnDblclick(item)
                )
            })
        )} else {
            return m('div.no-items', 'Your bag is empty.')
        }
    }
}   

module.exports = ItemList