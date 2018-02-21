let m = require('mithril')

//m for view: new tag input
function addNewTag(newTag) {
    return m('input[type=text][placeholder=Add new tag]', 
        {class: 'tag-input', 
        oninput:
            m.withAttr('value', function(value){
            Tag.newTag.tagname = value
            console.log('hello')
           }),
           value: newTag
        }
    )
}

let Tag = {
    data: [
        {tagname: 'Medicine', checked: false}, 
        {tagname: 'Clothes', checked: false}, 
        {tagname: 'Other', checked: false},
        {tagname: 'Important', checked: false},
        {tagname: 'To buy', checked: false}],
    newTag: {
        tagname: ''
    },
    selectedTags: function() {
        return Tag.data.filter(function(selected) {
            return selected.checked == true
        }).map(function(elem) {
           return elem.tagname
        })
    }, 
    addCustomTag: function() {
        let tag = {
            tagname: Tag.newTag.tagname,
            checked: false
        }
        Tag.data.push(tag)
        console.log('adding tag!')
    },
    view: function(){
        return m('div.tags', Tag.data.map(function(elem){
            return m('span', {
                class: elem.checked ? 'tags-span-checked' : 'tags-span', 
                    onclick: function(){
                        elem.checked = !elem.checked
                        console.log(elem.checked)}
                        },
                             elem.tagname)}
                        ), m('form',{
                            onsubmit: function(e){
                                e.preventDefault()
                                Tag.addCustomTag()
                                Tag.newTag.tagname = ''}
                            }, 
                            addNewTag(Tag.newTag.tagname), 
                            m('button[type=button]', {
                                class: 'delete-tag-button',
                                onclick: function(){
                                    Tag.data = Tag.data.filter(function(tag){
                                        return tag.checked == false
                                    })
                                }
                            }, 'Delete selected tags')
                        )
        )
    }
}

module.exports = Tag