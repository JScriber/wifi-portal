function setLoading(loading) {
    const body = document.querySelector('body');
    const className = 'loading';

    if (loading) {
        body.classList.add(className);
    } else {
        body.classList.remove(className);
    }
}


/**
 * Fetches all the wifi available and display it.
 */
async function fetchWifi() {
    setLoading(true);
    const data = await fetch('/wifi')
    const json = await data.json();

    drawList(json);

    setLoading(false);
}

/**
 * Draws the list of WIFI on screen.
 * @param {*} elements 
 */
function drawList(elements) {

    const parent = document.querySelector('.wifi-list');

   // Delete old data.
    var first = parent.firstElementChild;
    while (first) {
        first.remove();
        first = parent.firstElementChild;
    }

    // Feed the table.
    elements.forEach(e => {
        const li = document.createElement('li');

        const naming = document.createElement('div');

        const name = document.createElement('p');
        name.innerHTML = e.name;

        const address = document.createElement('p');
        address.innerHTML = e.address;

        naming.appendChild(name);
        naming.appendChild(address);
        li.appendChild(naming);

        const quality = document.createElement('p');
        quality.innerHTML = e.quality;

        li.appendChild(quality)

        parent.appendChild(li);
    });
}


/**
 * Main entrpoint.
 */
window.addEventListener('load', () => {

    document.getElementById('refresh').addEventListener('click', fetchWifi);

    fetchWifi();
});
