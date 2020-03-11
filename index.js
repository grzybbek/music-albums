var searchInput = document.getElementById("search");

searchInput.addEventListener('input', function() {
    let searchPhrase = searchInput.value.toUpperCase();
    let albums = document.querySelectorAll('#albums-list li');

    albums.forEach(function (item) {
        if (searchPhrase === '' || item.innerHTML.toUpperCase().includes(searchPhrase)) {
            item.removeAttribute('hidden');
        } else {
            item.setAttribute('hidden', true);
        }
    });
});

var addAlbum = document.getElementById("add-album");
var newAlbum = document.getElementById("new-album");
var ulAlbums = document.getElementById("albums-list");

addAlbum.addEventListener('click', function() {
    let liAlbum = document.createElement("li");

    liAlbum.appendChild(document.createTextNode(newAlbum.value));
    liAlbum.setAttribute('class', 'list-group-item');
    ulAlbums.appendChild(liAlbum);

    newAlbum.value = '';
});

newAlbum.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addAlbum.click();
    }
});

var azSort = document.getElementById("azSort");
var zaSort = document.getElementById("zaSort");

azSort.addEventListener('click', () => { sortAlbums(true) });
zaSort.addEventListener('click', () => { sortAlbums(false) });

function sortAlbums(ascending) {
    let albumsArray = [];
    ulAlbums.childNodes.forEach((item) => {
        if (item.nodeName === 'LI') {
            albumsArray.push(item);
        }
    });
    albumsArray.sort((item1, item2) => {
        let text1 = item1.innerHTML.toUpperCase();
        let text2 = item2.innerHTML.toUpperCase();
        
        if (ascending) {
            return (text1 < text2) ? -1 : (text1 > text2) ? 1 : 0;
        } else {
            return (text1 > text2) ? -1 : (text1 < text2) ? 1 : 0;
        }
    });
    albumsArray.forEach((item) => {
        ulAlbums.appendChild(item);
    })
}