const path = "http://localhost:8080/api/photo-gallery";

const currentTagList = [];

//should be buttons instead of text area strings
function addTagToList(tagName) {
    if(!currentTagList.includes(tagName.toLowerCase())) {
        currentTagList.push(tagName.toLowerCase());
        document.getElementById("current-tag-area").innerHTML = currentTagList;
    }
}

function addTagByButton() {
    let elm = document.getElementById("new-tag-input-add");
    addTagToList(elm.value);
    elm.value = "";
}

function removeTagFromList(tagName) {
    let index = currentTagList.indexOf(tagName);
    currentTagList.splice(index, 1);
    document.getElementById("current-tag-area").innerHTML = currentTagList;
}

function getAllTags() {
    fetch(path + "/all/tags")
        .then(response => response.json())
        .then(data => {
            var tagData = document.getElementById("tag-data-add").innerHTML;
            var template = Handlebars.compile(tagData);
            var allTags = template({
                tags: data
            });
            document.getElementById("tag-filter-section-add").innerHTML = allTags;
            let allTagElements = document.getElementsByClassName("tag-check")
            Array.prototype.forEach.call(allTagElements, function(elm) {
                elm.addEventListener('change', (event) => {
                    if(event.currentTarget.checked) {
                        addTagToList(elm.name);
                    } else {
                        removeTagFromList(elm.name);
                    }
                })
            })
        })
};

function uploadImage() {
    let url = document.getElementById("image-url").value;
    fetch(path + "/add/image", {
        method: "POST",
        body: JSON.stringify({
            "image-url": url,
            "tag-names": currentTagList
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
    }).then(window.location.replace("index.html"))
}

getAllTags()

document.getElementById("current-tag-area").innerHTML = currentTagList;

