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

        const informations = document.createElement('div');
        informations.classList.add('informations');

        let intensity;

        if (e.signal > -50) {
            intensity = 'wifi-4';
        } else {
            if (e.signal < -70) {
                intensity = 'wifi-1';
            } else {
                if (e.signal < -60) {
                    intensity = 'wifi-2';
                } else {
                    intensity = 'wifi-3';
                }
            }
        }

        const image = document.createElement('img');

        image.setAttribute('src', `/static/images/${intensity}.png`);

        informations.appendChild(image);

        const naming = document.createElement('div');

        const name = document.createElement('p');
        name.innerHTML = e.name;

        const address = document.createElement('p');
        address.innerHTML = e.address;

        naming.appendChild(name);
        naming.appendChild(address);
        informations.appendChild(naming);
        li.appendChild(informations);

        if (e.encrypted) {
            const lock = document.createElement('img');
            lock.classList.add('lock');
            lock.setAttribute('src', '/static/images/lock.svg');
            li.appendChild(lock);
        }


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
