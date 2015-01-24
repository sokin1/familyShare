// Each item consist in name, creator, createdAt, filename, and content.
// Users see name of the post, who posts the item, when it is posted, and picture with 100-long explaination for the picture
function Item() {
    var key;
    var name;
    var creator;
    var createdAt;
    var filename;
    var content;

    function newItem( newKey, newName, newCreator, newCreatedAt, newFilename, newContent ) {
        key = newKey;
        name = newName;
        creator = newCreator;
        createdAt = newCreatedAt;
        filename = newFilename;
        content = newContent;
    }

    // TODO
    // getters will be implemented
}

exports.Item = Item;
