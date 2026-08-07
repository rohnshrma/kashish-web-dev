# Assignment: Browser Weather App (XMLHttpRequest + Promise + Async/Await)

## Goal

Build a **browser-based weather app** (plain JS, no framework) that:

1. Takes a city name from the user via `prompt()`.
2. Fetches current weather data from the **OpenWeatherMap API** using **`XMLHttpRequest`** (not `fetch`, not `axios`).
3. Wraps that `XMLHttpRequest` call in a **`Promise`**.
4. Consumes the promise using **`async/await`** with proper `try/catch` error handling.
5. Displays the weather summary (or an error message) using `alert()`.

No solution code is provided here — only the steps and requirements. Implement it yourself in `weather.js` inside this `async` folder, and load it via a `<script>` tag from `index.html` (same pattern as the other files in this folder).

---

## Prerequisites

- A free API key from [OpenWeatherMap](https://openweathermap.org/api).
  - Sign up → Dashboard → API keys → copy your key.
  - New keys can take a few minutes to a couple of hours to activate.
- `XMLHttpRequest`, `prompt()`, and `alert()` are all native to the browser — no installs or polyfills needed.
- You'll be running this by opening `index.html` in the browser (or via a local dev server), not from the terminal.

---

## Step-by-Step Plan

### 1. Project setup
- [ ] Create `weather.js` in the `async` folder.
- [ ] Add a `<script src="./async/weather.js"></script>` tag to `index.html`.
- [ ] Store your API key as a constant at the top of the file — **do not commit real API keys to git** if this repo is public.

### 2. Read city name using `prompt()`
- [ ] Use `prompt()` to ask the user for a city name.
- [ ] Handle the case where the user enters nothing or clicks "Cancel" (`prompt()` returns `null` or an empty string) — show an `alert()` telling them a city name is required, and stop before making a request.

### 3. Build the OpenWeatherMap request URL
- [ ] Look up the OpenWeatherMap "Current Weather Data" endpoint in their docs.
- [ ] Figure out the required query parameters (city name, API key, units).
- [ ] Decide on units (metric vs imperial) and how that's passed in the URL.
- [ ] Think about city names with spaces (e.g. "New York") — how do you safely encode them into a URL?

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
- [ ] Write an `async function main()` (or similarly named entry point) that calls `prompt()` and then `getWeatherData(city)`.
- [ ] `await` the `getWeatherData(city)` call inside a `try/catch`:
  - On success, move to formatting/output (Step 6).
  - On failure, `alert()` a user-friendly error message (e.g. "City not found", "Network error", "Invalid API key") instead of a raw stack trace.
- [ ] Call `main()` so the flow actually runs when the script loads.

### 6. Format and display the output with `alert()`
- [ ] Decide what fields matter for a weather report, e.g.:
  - City name and country
  - Temperature (and "feels like")
  - Weather description (e.g. "light rain")
  - Humidity
  - Wind speed
- [ ] Build a multi-line string (`\n` between fields) and pass it to `alert()` — not raw JSON.

### 7. Edge cases and error handling to cover
- [ ] City name that doesn't exist (API returns a 404-style error).
- [ ] No internet connection / request timeout.
- [ ] Missing or invalid API key.
- [ ] User cancels or submits an empty `prompt()`.
- [ ] City name with spaces (e.g. "New York") — does your URL building handle this correctly?

### 8. Stretch goals (optional)
- [ ] Let the user pick units (Celsius/Fahrenheit) via a second `prompt()` or `confirm()`.
- [ ] After showing results, use `confirm()` to ask "Look up another city?" and loop if yes.
- [ ] Add a `console.log` "Fetching weather for <city>..." right before the request fires, so progress is visible in DevTools while the `alert()` is pending.
- [ ] Render the result into the DOM (e.g. update `#title` or a new `<div>`) in addition to, or instead of, the `alert()`.

---

## Concepts You Should Be Able to Explain Afterward

- Why wrap `XMLHttpRequest` in a `Promise` instead of using raw callbacks?
- What's the difference between `resolve`/`reject` inside the promise executor vs. `try`/`catch` around `await`?
- What happens if you forget to call `resolve()` or `reject()` inside the executor?
- Why is `async/await` considered "syntactic sugar" over `.then()/.catch()` chains?
- What's the difference between a network error (`onerror`) and an application-level error (e.g. valid response, but city not found)?
- Why do `prompt()` and `alert()` block the rest of the page's JS execution while they're open, and does that interact with your async code in any surprising way?

---

## Deliverable

A single working script (`weather.js`) in this folder, loaded from `index.html`, that:
- Asks for a city name via `prompt()`.
- Uses `XMLHttpRequest` wrapped in a `Promise` to call the OpenWeatherMap API.
- Uses `async/await` with `try/catch` to consume it.
- Shows a formatted weather report or a clear error message via `alert()`.
