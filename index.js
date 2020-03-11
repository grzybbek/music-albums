let searchInput = document.getElementById("search");
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

