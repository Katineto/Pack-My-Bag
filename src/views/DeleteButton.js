let m = require('mithril')
let Items = require('../models/Items')

DeleteButton = {
    view: function() {
        const n = Items.countSelected()
        if (Items.list.length > 0 && n == 1){
            return m('button.delete', 
                {onclick: function() {
                        Items.deleteSelected()
                        }
                }, 
                'Delete ' + n +' item')}
        if (Items.list.length > 0 && n > 1){
            return m('button.delete', 
                {onclick: function() {
                        Items.deleteSelected()
                        }
                }, 
                'Delete ' + n +' items')}       
    }
}

module.exports = DeleteButton