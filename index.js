const path = "http://localhost:8080/api/photo-gallery";

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
        let imageData = document.getElementById("photo-data").innerHTML;
        let template = Handlebars.compile(imageData);
        let allImages = template({
            images: data
        });
        document.getElementById("photo-gallery").innerHTML += allImages;
    })
};

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

const testFunction = async () => {
    const res = await fetch(path + "/all/tags");
    const data = await res.json();
    console.log(data);
}

getAllTags();
getAllImages();
testFunction();











