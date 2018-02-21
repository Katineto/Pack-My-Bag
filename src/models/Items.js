let m = require('mithril')
let stringScore = require('string-score')

let Items = {
    list: [],
    input: '',
    itemID: 0,
    filter: {
        type: null,
        value: null,
        action: function(element) {
            return true
        }
    }, 
    fuzzySorting: function(a, b) {
        const scoreA = stringScore(a.name, Items.input, 0.5)
        const scoreB = stringScore(b.name, Items.input, 0.5)
        if(scoreA > scoreB) return -1
        if(scoreA < scoreB) return 1
        return 0
    },
    parseString: function(input) {
        let parsedArray = input.split('#')
        return {
            name: parsedArray[0].trim(), //string
            tags: parsedArray.slice(1).map(tag => tag.trim()).sort(), //array
            checked: false,
            edit: false,
            original: input,
            selected: false
        } 
    },
    isValid: function(item) {
        if (item.name !== '' && item.name !== ' ') {
            return true
        }
    },
    addItem: function(input) {
        let newItem = Items.parseString(input)
        if (Items.isValid(newItem)) {
            newItem.id = Items.itemID += 1
            Items.list.push(newItem)
        }
        localStorage.setItem('bag', JSON.stringify(Items.list))
    },
    deleteSelected: function() {
        Items.list = Items.list.filter(function(item) {
            return item.selected == false
        })
        localStorage.setItem('bag', JSON.stringify(Items.list))
    },
    toggleCheckbox: function(item) {
        item.checked = !item.checked
        console.log('checked')
        localStorage.setItem('bag', JSON.stringify(Items.list))
    },
    toggleSelection: function(item) {
        item.selected = !item.selected
        console.log(item.selected)
        localStorage.setItem('bag', JSON.stringify(Items.list))
    },
    editInput: function(singleItem) {
        singleItem.edit = !singleItem.edit
    },
    filterByTag: function(tag) {
        if(Items.filter.value != tag) {
            Items.filter.type = 'tag'
            Items.filter.value = tag
            Items.filter.action = function (item) {
                var index = item.tags.length
                for (var i = 0; i < index; i += 1) {
                    if (item.tags[i] == tag) {
                        return true
                    }
                }
            }
        } else {
            Items.filter.type = null
            Items.filter.value = null
            Items.filter.action = function(element) {
                return true
            }
        }
             
    }, 
    sort: function(value) {
        if(value == 'initial') {
            Items.list.sort(function(a, b) {
                return a.id - b.id
            })
        } else if(value == 'alphabet') {
            Items.list.sort(function(a, b) {
                let nameA = a.name.toUpperCase()
                let nameB = b.name.toUpperCase()
                if(nameA < nameB) {return -1}
                if(nameA > nameB) {return 1}
                return 0
            })
        } else if(value == 'bag') {
            Items.list.sort(function(a, b) {
                if(a.checked == true) {return -1}
                if(a.checked == false) {return 1}
            })
        } 
    }
   
}


module.exports = Items;