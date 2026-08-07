# Assignment: CLI Weather App (XMLHttpRequest + Promise + Async/Await)

## Goal

Build a **command-line weather app** in Node.js that:

1. Takes a city name from the terminal.
2. Fetches current weather data from the **OpenWeatherMap API** using **`XMLHttpRequest`** (not `fetch`, not `axios`).
3. Wraps that `XMLHttpRequest` call in a **`Promise`**.
4. Consumes the promise using **`async/await`** with proper `try/catch` error handling.
5. Prints a clean, readable weather summary to the console.

No solution code is provided here — only the steps and requirements. Implement it yourself in `weather-cli.js` inside this `async` folder.

---

## Prerequisites

- Node.js installed (`node -v` to check).
- A free API key from [OpenWeatherMap](https://openweathermap.org/api).
  - Sign up → Dashboard → API keys → copy your key.
  - New keys can take a few minutes to a couple of hours to activate.
- Node does **not** have `XMLHttpRequest` built in like a browser does. You'll need to either:
  - Install a package that polyfills it (e.g. `xmlhttprequest` from npm), **or**
  - Run this specific script in the **browser console / an HTML file** instead of Node, since `XMLHttpRequest` is native there.
  - Decide which environment you're targeting before you start — this changes how you read CLI arguments (`process.argv` in Node vs. a `prompt()`/input field in browser).

---

## Step-by-Step Plan

### 1. Project setup
- [ ] Create `weather-cli.js` in the `async` folder.
- [ ] If using Node, run `npm init -y` and install any polyfill package needed for `XMLHttpRequest`.
- [ ] Store your API key in a separate config/`.env`-style file or a constant at the top — **do not commit real API keys to git**.

### 2. Read city name from the command line
- [ ] Figure out how to accept a city name as a CLI argument (e.g. `node weather-cli.js London`).
- [ ] Handle the case where no city name is provided — show a usage message and exit gracefully.

### 3. Build the OpenWeatherMap request URL
- [ ] Look up the OpenWeatherMap "Current Weather Data" endpoint in their docs.
- [ ] Figure out the required query parameters (city name, API key, units).
- [ ] Decide on units (metric vs imperial) and how that's passed in the URL.

### 4. Wrap `XMLHttpRequest` in a Promise
- [ ] Write a function, e.g. `getWeatherData(city)`, that returns a `new Promise((resolve, reject) => {...})`.
- [ ] Inside the promise executor:
  - Create an `XMLHttpRequest` instance.
  - Open a `GET` request to your constructed URL.
  - Set up the `onload` (or `onreadystatechange`) handler:
    - If the HTTP status indicates success, `resolve()` the parsed JSON response.
    - If the status indicates failure (e.g. city not found, 404/401), `reject()` with a meaningful error.
  - Set up an `onerror` handler for network-level failures and `reject()` there too.
  - Call `.send()` to fire the request.
- [ ] Think about: what does "parsing" the response look like? What format does `xhr.responseText` come back in, and how do you turn it into a usable object?

### 5. Consume the promise with async/await
- [ ] Write an `async function main()` (or similarly named entry point).
- [ ] Inside it, `await` your `getWeatherData(city)` call.
- [ ] Wrap the `await` call in `try/catch`:
  - On success, move to formatting/output (Step 6).
  - On failure, print a user-friendly error message (e.g. "City not found", "Network error", "Invalid API key") instead of a raw stack trace.

### 6. Format and display the output
- [ ] Decide what fields matter for a CLI weather report, e.g.:
  - City name and country
  - Temperature (and "feels like")
  - Weather description (e.g. "light rain")
  - Humidity
  - Wind speed
- [ ] Print these in a clean, human-readable format to the console — not raw JSON.

### 7. Edge cases and error handling to cover
- [ ] City name that doesn't exist (API returns a 404-style error).
- [ ] No internet connection / request timeout.
- [ ] Missing or invalid API key.
- [ ] Empty or missing CLI input.
- [ ] (Optional stretch) City name with spaces (e.g. "New York") — does your URL building handle this correctly?

### 8. Stretch goals (optional)
- [ ] Support a `--units` flag to toggle between Celsius and Fahrenheit.
- [ ] Allow looking up multiple cities in one run (comma-separated list), fetching them concurrently and awaiting all results.
- [ ] Add a loading indicator (e.g. "Fetching weather for London...") before the request resolves.
- [ ] Cache the last successful result to a local JSON file as a fallback if the API call fails.

---

## Concepts You Should Be Able to Explain Afterward

- Why wrap `XMLHttpRequest` in a `Promise` instead of using raw callbacks?
- What's the difference between `resolve`/`reject` inside the promise executor vs. `try`/`catch` around `await`?
- What happens if you forget to call `resolve()` or `reject()` inside the executor?
- Why is `async/await` considered "syntactic sugar" over `.then()/.catch()` chains?
- What's the difference between a network error (`onerror`) and an application-level error (e.g. valid response, but city not found)?

---

## Deliverable

A single working script (`weather-cli.js`) in this folder that:
- Accepts a city name as input.
- Uses `XMLHttpRequest` wrapped in a `Promise` to call the OpenWeatherMap API.
- Uses `async/await` with `try/catch` to consume it.
- Prints a formatted weather report or a clear error message.
