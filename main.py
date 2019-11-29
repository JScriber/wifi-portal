from flask import Flask, jsonify, render_template, request
from wifi import Cell

app = Flask(__name__)

INTERFACE = 'wlp5s0'
MINIMAL_SIGNAL = -60


@app.route("/")
def vue():
    return render_template("index.html")


@app.route("/connect")
def connect_to_wifi():
    if request.method == 'POST':
        print("Connect to ")


@app.route("/wifi")
def wifi():
    if request.method == 'GET':
        cells = Cell.all(INTERFACE)

        # Sorts by signal.
        sorted_cells = sorted(cells, key=lambda c: c.signal)
        sorted_cells.reverse()

        # Filters the cells.
        filtered_cells = list(filter(lambda x: x.signal > MINIMAL_SIGNAL, sorted_cells))

        # Get only the data that we want.
        dtos = list(map(lambda x: {
            'name': x.ssid,
            'quality': x.quality,
            'address': x.address
        }, filtered_cells))

        return jsonify(dtos)


if __name__ == "__main__":
    app.run()
