const path = "http://localhost:8080/api/photo-gallery";

const currentTagList = [];

function addTagToList(tagName) {
    if(!currentTagList.includes(tagName.toLowerCase())) {
        currentTagList.push(tagName.toLowerCase());
    }
    renderCurrentlyTagged();
    getImagesByFilter();
}

function removeTagFromList(tagName) {
    let index = currentTagList.indexOf(tagName);
    currentTagList.splice(index, 1);
    renderCurrentlyTagged();
    if(currentTagList.length === 0) {
        getAllImages();
    } else {
        getImagesByFilter();
    }
}

function getAllTags() {
    fetch(path + "/all/tags")
        .then(response => response.json())
        .then(data => {
            var tagData = document.getElementById("tag-data").innerHTML;
            var template = Handlebars.compile(tagData);
            var allTags = template({
                tags: data
            });
            document.getElementById("tag-filter-section").innerHTML = allTags;
        })
};

function getAllImages() {
    fetch(path + "/all/images")
    .then(response => response.json())
    .then(data => {
        renderImages(data)
    })
};

function getImagesByFilter() {
    fetch(path + "/all/images/by-tags", {
        method: "POST",
        body: JSON.stringify({
            "tag-names": currentTagList
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        renderImages(data)
    })
}

function addNewTag() {
    const tagName = document.getElementById("new-tag-input").value;
    fetch(path + `/add/tag/${tagName}`, {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => getAllTags())
        .catch(error => {
            console.error(error.getMessage());
        })
}

function renderImages(data) {
    let imageData = document.getElementById("photo-data").innerHTML;
    let template = Handlebars.compile(imageData);
    let allImages = template({
        images: data
    });
    document.getElementById("photo-gallery").innerHTML = allImages;
}

function renderCurrentlyTagged() {
    var currentlyTagged = document.getElementById("current-tag-area-index").innerHTML;
    var template = Handlebars.compile(currentlyTagged);
    var tagArea = template({
        currentTagList: currentTagList
    });
    document.getElementById("currently-tagged-section-index").innerHTML = tagArea;
}

getAllTags();
getAllImages();











