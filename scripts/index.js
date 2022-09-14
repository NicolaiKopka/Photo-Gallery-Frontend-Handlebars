const path = "http://localhost:8080/api/photo-gallery";

const currentTagList = [];

const form = document.querySelector("form");

function addTagToList(tagName) {
    if (!currentTagList.includes(tagName.toLowerCase())) {
        currentTagList.push(tagName.toLowerCase());
    }
    renderCurrentlyTagged();
    getImagesByFilter();
}

function removeTagFromList(tagName) {
    let index = currentTagList.indexOf(tagName);
    currentTagList.splice(index, 1);
    renderCurrentlyTagged();
    if (currentTagList.length === 0) {
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

function deleteImage(id) {
    fetch(path + "/delete/" + id, {
            method: "DELETE"
        })
        .then(() => {
            getAllImages();
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

let updatedTagList = [];

function editTagList(id) {
    let div = document.getElementById("tagsFor" + id);
    let removeButtons = div.querySelectorAll(".removeButton");
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].classList.remove("hidden");
        updatedTagList.push(removeButtons[i].value.split("-")[0]);
    }

    div.querySelector("div #newTagInput").classList.remove("hidden")
}

function addTagToEditList(currentId) {
    let newTagName = document.getElementById("newTagFor" + currentId).value.toLowerCase();

    if (!updatedTagList.includes(newTagName)) {
        updatedTagList.push(newTagName);

        let newButton = document.createElement("button");
        newButton.innerHTML = "x";
        newButton.setAttribute("id", "removeButton" + newTagName);
        newButton.setAttribute("value", newTagName + "-" + currentId);
        newButton.setAttribute("onclick", "removeTagFromEditList(this.value);");

        let newSpan = document.createElement("span");
        newSpan.setAttribute("id", "tagId" + newTagName);
        newSpan.innerHTML = newTagName;

        document.getElementById("currentTagsFor" + currentId).append(newSpan, newButton);
    }

    document.getElementById("newTagFor" + currentId).value = "";
}

function removeTagFromEditList(value) {
    let tagName = value.split("-")[0];
    let currentId = value.split("-")[1];

    let index = updatedTagList.indexOf(tagName);
    updatedTagList.splice(index, 1);

    let span_elm = document.getElementById("tagId" + tagName);
    let button_elm = document.getElementById("removeButton" + tagName);

    document.getElementById("currentTagsFor" + currentId).removeChild(span_elm);
    document.getElementById("currentTagsFor" + currentId).removeChild(button_elm);
}

form.addEventListener("submit", (ev) => {
    if(!form.checkValidity()) {
        ev.preventDefault()
    }

    form.classList.add("was-validated")
    
})

getAllTags();
getAllImages();
