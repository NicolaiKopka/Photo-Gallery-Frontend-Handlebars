const path = "http://localhost:8080/api/photo-gallery";
let finalTagData;

function getAllTags()  {
    fetch(path + "/all/tags")
    .then(response => response.json())
    .then(data => {
        var tagData = document.getElementById("tag-data").innerHTML;
        var template = Handlebars.compile(tagData);
        var allTags = template({
            tags: data
        });
        document.getElementById("tag-filter-section").innerHTML += allTags;
    })
    
};

getAllTags();








