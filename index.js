'use strict';

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
    liAlbum.setAttribute('draggable', 'true');
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

// DRAG AND DROP
var movingElement = null;

function onDragStart(event) {
    this.style.opacity = '0.4';
    this.classList.add('dragElem');
    movingElement = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.outerHTML);
}

function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
}

function onDragLeave(event) {
}

function onDrop(event) {
    event.stopPropagation();

    if (movingElement != this) {
        // movingElement.innerHTML = this.innerHTML;
        // this.innerHTML = event.dataTransfer.getData('text/html');
        this.parentNode.removeChild(movingElement);

        this.insertAdjacentHTML('beforebegin', event.dataTransfer.getData('text/html'));
        
        addListeners(this.previousSibling);
    }

    return false;
}

function onDragEnd(event) {
    console.log(this.style.opacity);
    this.style.opacity = '1.0';
    this.classList.remove('dragElem');
    console.log(this.style.opacity);
}

document.querySelectorAll('#albums-list li').forEach((item) => {
    addListeners(item);
})

function addListeners(item) {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragover', onDragOver);
    item.addEventListener('dragleave', onDragLeave);
    item.addEventListener('drop', onDrop);
    item.addEventListener('dragend', onDragEnd);
}