const path = "http://localhost:8080/api/photo-gallery";
const cloudinaryPath = `https://api.cloudinary.com/v1_1/${env_data.CLOUDINARY_ID}/image/upload`
const form = document.querySelector("form");

const currentTagList = [];

function addTagToList(tagName) {
    if(!currentTagList.includes(tagName.toLowerCase())) {
        currentTagList.push(tagName.toLowerCase());
    }
    renderCurrentlyTagged();
}

function addTagByButton() {
    let elm = document.getElementById("new-tag-input-add");
    addTagToList(elm.value);
    elm.value = "";
}

function removeTagFromList(tagName) {
    let index = currentTagList.indexOf(tagName);
    currentTagList.splice(index, 1);
    renderCurrentlyTagged();
}

function renderCurrentlyTagged() {
    var currentlyTagged = document.getElementById("current-tag-area").innerHTML;
    var template = Handlebars.compile(currentlyTagged);
    var tagArea = template({
        currentTagList: currentTagList
    });
    document.getElementById("currently-tagged-section").innerHTML = tagArea;
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
        })
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();
    formData.append("file", files[0])
    formData.append("upload_preset", "images_upload")
    
    fetch(cloudinaryPath, {
        method: "POST",
        body: formData
    }).then(response => {
       return response.json();
    })
    .then(data => {
        saveImageInDB(data.secure_url)
    })

})

function saveImageInDB(image_url) {
    fetch(path + "/add/image", {
        method: "POST",
        body: JSON.stringify({
            "image-url": image_url,
            "tag-names": currentTagList
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
    }).then(window.location.replace("index.html"))
}

getAllTags()


