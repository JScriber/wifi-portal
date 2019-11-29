
/**
 * Fetches all the wifi available and display it.
 */
async function fetchWifi() {
    const data = await fetch('/wifi')
    const json = await data.json();

    drawList(json);
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

        li.innerHTML = e.name;

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
