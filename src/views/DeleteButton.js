let m = require('mithril')
let Items = require('../models/Items')

DeleteButton = {
    view: function() {
        if (Items.list.length > 0){
            return m('button', 
                {onclick: function() {
                        Items.deleteSelected()
                        console.log(Items.list)
                        }
                }, 
                'Delete selected')}
    }
}

module.exports = DeleteButton