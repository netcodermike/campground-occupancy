# Campground Occupancy

Calculate peak occupied campsites and flag days that exceed a campground’s capacity.

![Sample run from Campground Occupancy](docs/demo.webp)

## Run

Install Node.js 22 or newer. Run these commands from the repository root.

```sh
node app.mjs sample.json
```

Replace `sample.json` with a JSON file following the same structure. The app prints a JSON report to standard output.

Provide ISO dates with arrival inclusive and checkout exclusive. Each booking uses one site.

## Verify

Run `python check.py` with Python 3.11 or newer after the build step when applicable. The check verifies the bundled scenario and confirms that an invalid input returns an error.
