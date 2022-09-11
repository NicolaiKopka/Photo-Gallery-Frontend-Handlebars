const path = "http://localhost:8080/api/photo-gallery";

export function getAllTags()  {
    fetch(path + "/all/tags")
    .then(response => response.json())
    .then(data => console.log(data))
};