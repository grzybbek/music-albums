var searchInput = document.getElementById("search");
var albums = document.querySelectorAll('#albums-list li');

searchInput.addEventListener('input', function() {
    let searchPhrase = searchInput.value.toUpperCase();

    albums.forEach(function (item, index) {
        if (searchPhrase === '' || item.innerHTML.toUpperCase().includes(searchPhrase)) {
            item.removeAttribute('hidden');
        } else {
            item.setAttribute('hidden', true);
        }
    });
});

var addAlbum = document.getElementById("add-album");
var newAlbum = document.getElementById("new-album");

addAlbum.addEventListener('click', function() {
    let ulAlbums = document.getElementById("albums-list");
    let liAlbum = document.createElement("li");

    liAlbum.appendChild(document.createTextNode(newAlbum.value));
    liAlbum.setAttribute('class', 'list-group-item');
    ulAlbums.appendChild(liAlbum);
});

newAlbum.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addAlbum.click();
    }
});