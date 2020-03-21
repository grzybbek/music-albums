'use strict';

class Album {
    constructor(artist, title) {
        this.artist = artist;
        this.title = title;
    }

    toString() {
        return `${this.artist} - ${this.title}`;
    }
}

var albumsTexts = [
    new Album('Flaming Lips', 'Yoshimi Battles the Pink Robots'),
    new Album('Wilco', 'Yankee Hotel Foxtrot'),
    new Album('Interpol', 'Turn On the Bright Lights'),
    new Album('Nelly Furtado', 'Whoa, Nelly!'),
    new Album('Drake', 'Views')
];

const albumsUrl = "https://my-json-server.typicode.com/grzybbek/music-albums/albums";

var ulAlbums = document.getElementById("albums-list");

fetch(albumsUrl)
.then(response => response.json())
.then(albums => {
    albums.forEach(album => {
        let liAlbum = createLiAlbum(new Album(album.artist, album.title));
        addListeners(liAlbum);
        ulAlbums.appendChild(liAlbum);        
    })
});

function createLiAlbum(album) {
    let liAlbum = document.createElement("li");
    liAlbum.setAttribute('class', 'list-group-item');
    liAlbum.setAttribute('draggable', 'true');

    let icon = document.createElement("i");
    icon.setAttribute('class', 'fas fa-ellipsis-v');
    liAlbum.appendChild(icon);

    let textSpan = document.createElement("span");
    textSpan.appendChild(document.createTextNode(album.toString()));
    liAlbum.appendChild(textSpan);

    return liAlbum;
}

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
var newAlbumArtist = document.getElementById("artist");
var newAlbumTitle = document.getElementById("title");

addAlbum.addEventListener('click', function() {
    ulAlbums.appendChild(createLiAlbum(new Album(newAlbumArtist.value, newAlbumTitle.value)));

    newAlbumArtist.value = '';
    newAlbumTitle.value = '';
});

document.querySelectorAll("#new-album input").forEach((input) => {
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addAlbum.click();
        }
    });
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

// DRAG AND DROP
var movingElement = null;

function onDragStart(event) {
    movingElement = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('moving-el');
}

function onDragOver(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    event.dataTransfer.dropEffect = 'move';
    this.classList.add('over');
    return false;
}

function onDragLeave(event) {
    this.classList.remove('over');
}

function onDrop(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    }

    if (movingElement != this) {
        this.parentNode.removeChild(movingElement);

        this.insertAdjacentHTML('beforebegin', event.dataTransfer.getData('text/html'));
        
        addListeners(this.previousSibling);
    }
    this.classList.remove('moving-el');
    this.classList.remove('over');

    return false;
}

function onDragEnd(event) {
    this.classList.remove('moving-el');
    this.classList.remove('over');
}

function addListeners(item) {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragover', onDragOver);
    item.addEventListener('dragleave', onDragLeave);
    item.addEventListener('drop', onDrop);
    item.addEventListener('dragend', onDragEnd);
}