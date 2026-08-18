# 🎬 CineSearch - Movie Database Search Application

A beautiful, interactive web application that allows users to search and discover movies using The Movie Database (TMDB) API. Built with vanilla JavaScript, HTML, and CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Code Flow Explanation](#code-flow-explanation)
- [JavaScript Functions Breakdown](#javascript-functions-breakdown)
- [How to Build It Yourself](#how-to-build-it-yourself)
- [API Key Setup](#api-key-setup)

## 🎯 Overview

CineSearch is a client-side web application that fetches movie data from TMDB API and displays it in an elegant, responsive grid layout. Users can search movies by name, filter by genre, or browse by release year.

## ✨ Features

- 🔍 Search movies by title
- 🎭 Filter by genre (Action, Comedy, Drama, etc.)
- 📅 Filter by release year
- 📊 View movie ratings and descriptions
- 🎨 Beautiful, responsive design
- ⚡ Fast and lightweight (no frameworks required)
- 📱 Mobile-friendly interface

## 🚀 Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Quick Start

1. **Clone or download this repository**
   ```bash
   # If using git
   git clone <repository-url>
   cd CineSearch
   ```

2. **Get your TMDB API Key**
   - Visit [TMDB](https://www.themoviedb.org/settings/api)
   - Sign up for a free account
   - Request an API key
   - **OR use the provided API key**: `b36db9ba640e52c05b3054e15904338c`

3. **Update the API key in `script.js`**
   ```javascript
   const apiKey = "YOUR_API_KEY_HERE"; // Replace with your key
   ```

4. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```
   - Navigate to `http://localhost:8000` in your browser

## 📊 Code Flow Explanation

### High-Level Flow

```
Page Loads
    ↓
DOMContentLoaded Event Fires
    ↓
searchMovies() is called automatically
    ↓
Shows popular movies by default
    ↓
User interacts (clicks search or presses Enter)
    ↓
searchMovies() determines search type
    ↓
Calls appropriate API function
    ↓
Receives movie data
    ↓
displayMovies() renders results
    ↓
User clicks a movie card
    ↓
showMovieDetails() displays movie info
```

### Detailed Flow

1. **Initialization Phase**
   - When the HTML page loads, the browser parses the DOM
   - `script.js` is loaded and executed
   - All DOM elements are selected and stored in variables
   - Event listeners are attached to buttons and input fields
   - When `DOMContentLoaded` fires, `searchMovies()` runs automatically to show popular movies

2. **User Interaction Phase**
   - User can:
     - Type a movie name and press Enter or click Search
     - Select a genre from dropdown
     - Enter a release year
     - Click the Search button
   - Any of these actions trigger `searchMovies()`

3. **Search Logic Phase**
   - `searchMovies()` checks what the user entered:
     - **If movie name exists**: Calls `searchByName()`
     - **If only genre/year exists**: Calls `discoverMovies()`
     - **If nothing entered**: Calls `getPopularMovies()`
   - Shows loading spinner during API calls

4. **API Request Phase**
   - Builds the appropriate TMDB API URL
   - Uses `fetch()` to make HTTP requests
   - Waits for response (async/await)
   - Parses JSON data
   - Filters results if genre is specified

5. **Display Phase**
   - `displayMovies()` receives the movie array
   - Hides loading spinner
   - Clears previous results
   - Loops through movies and creates cards
   - Appends cards to the grid
   - Smoothly scrolls to results

6. **Movie Card Interaction**
   - Each card is clickable
   - Clicking triggers `showMovieDetails()`
   - Displays movie information in an alert

## 🔧 JavaScript Functions Breakdown

### 1. **API Configuration** (Lines 1-3)
```javascript
const apiKey = "b36db9ba640e52c05b3054e15904338c";
const baseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
```
- Stores the API key for authentication
- Base URL for all API endpoints
- Image base URL for movie posters

### 2. **DOM Element Selection** (Lines 5-12)
```javascript
const movieNameInput = document.getElementById("movieName");
const genreSelect = document.getElementById("genre");
// ... etc
```
- Grabs references to HTML elements
- Allows JavaScript to interact with the page

### 3. **Event Listeners** (Lines 14-29)
```javascript
searchBtn.addEventListener("click", searchMovies);
movieNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});
```
- Makes the page respond to user actions
- Search button click triggers search
- Enter key in input fields also triggers search

### 4. **Main Search Function: `searchMovies()`** (Lines 31-71)
**Purpose**: Orchestrates the entire search process

**Flow**:
1. Gets user input (movie name, genre, year)
2. Shows loading spinner
3. Decides which API function to call based on input
4. Waits for movie data
5. Passes data to `displayMovies()`
6. Handles errors gracefully

**Key Logic**:
- If movie name → `searchByName()`
- If genre/year only → `discoverMovies()`
- If nothing → `getPopularMovies()`

### 5. **Search by Name: `searchByName()`** (Lines 73-104)
**Purpose**: Searches TMDB for movies matching a title

**Process**:
1. Builds search URL with movie name
2. Adds year filter if provided
3. Makes API request
4. Receives results
5. Filters by genre if specified
6. Returns filtered movie array

**URL Example**:
```
https://api.themoviedb.org/3/search/movie?api_key=XXX&query=Inception&year=2010
```

### 6. **Discover Movies: `discoverMovies()`** (Lines 106-126)
**Purpose**: Finds movies by genre and/or year (without a specific title)

**Process**:
1. Builds discover URL
2. Adds genre filter if provided
3. Adds year filter if provided
4. Sorts by popularity
5. Returns movie array

**URL Example**:
```
https://api.themoviedb.org/3/discover/movie?api_key=XXX&with_genres=28&year=2020
```

### 7. **Get Popular Movies: `getPopularMovies()`** (Lines 128-139)
**Purpose**: Fetches currently popular/trending movies

**Process**:
1. Calls the popular movies endpoint
2. Returns array of popular movies
3. Used as default when page loads

### 8. **Display Movies: `displayMovies()`** (Lines 141-169)
**Purpose**: Renders movie cards on the page

**Process**:
1. Hides loading spinner
2. Checks if movies exist
3. Shows results section
4. Clears old results
5. Loops through movies
6. Creates card for each movie
7. Appends cards to grid
8. Scrolls to results

### 9. **Create Movie Card: `createMovieCard()`** (Lines 171-213)
**Purpose**: Builds HTML structure for a single movie card

**Process**:
1. Creates a `<div>` element
2. Handles missing poster images (uses placeholder)
3. Extracts release year from date
4. Formats rating to 1 decimal place
5. Handles missing overview text
6. Builds HTML with movie data
7. Adds click event listener
8. Returns the card element

**Card Structure**:
- Movie poster image
- Movie title
- Release year
- Overview (description)
- Rating with star icon

### 10. **Show Movie Details: `showMovieDetails()`** (Lines 215-226)
**Purpose**: Displays detailed movie information when card is clicked

**Process**:
1. Formats movie data into readable string
2. Shows alert with details
3. Includes: title, release date, rating, overview

### 11. **Loading State Functions**

**`showLoading()`** (Lines 228-233):
- Shows loading spinner
- Hides results and no-results sections

**`hideLoading()`** (Lines 235-238):
- Hides loading spinner

**`showNoResults()`** (Lines 240-245):
- Hides loading spinner
- Shows "no results" message
- Hides results section

### 12. **Page Initialization** (Lines 247-252)
```javascript
document.addEventListener("DOMContentLoaded", () => {
  searchMovies();
});
```
- Waits for page to fully load
- Automatically shows popular movies on page load

## 🛠️ How to Build It Yourself

### Step 1: Create the HTML Structure

Create `index.html` with:
- Header with title
- Search form (movie name input, genre select, year input, search button)
- Loading section (hidden by default)
- Results section (hidden by default)
- No results section (hidden by default)
- Link to `script.js` and `styles.css`

**Key HTML Elements Needed**:
```html
<input id="movieName" />
<select id="genre"></select>
<input id="year" />
<button id="searchBtn">Search</button>
<div id="loading"></div>
<div id="resultsSection">
  <div id="moviesGrid"></div>
</div>
<div id="noResults"></div>
```

### Step 2: Set Up JavaScript Foundation

Create `script.js` and add:

1. **API Configuration**
   ```javascript
   const apiKey = "YOUR_API_KEY";
   const baseUrl = "https://api.themoviedb.org/3";
   const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
   ```

2. **DOM Element Selection**
   ```javascript
   const movieNameInput = document.getElementById("movieName");
   const genreSelect = document.getElementById("genre");
   const yearInput = document.getElementById("year");
   const searchBtn = document.getElementById("searchBtn");
   const loading = document.getElementById("loading");
   const resultsSection = document.getElementById("resultsSection");
   const moviesGrid = document.getElementById("moviesGrid");
   const noResults = document.getElementById("noResults");
   ```

### Step 3: Add Event Listeners

```javascript
searchBtn.addEventListener("click", searchMovies);
movieNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});
yearInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});
```

### Step 4: Build the Main Search Function

```javascript
async function searchMovies() {
  const movieName = movieNameInput.value.trim();
  const genre = genreSelect.value;
  const year = yearInput.value.trim();
  
  showLoading();
  
  try {
    let movies = [];
    if (movieName) {
      movies = await searchByName(movieName, year, genre);
    } else if (genre || year) {
      movies = await discoverMovies(genre, year);
    } else {
      movies = await getPopularMovies();
    }
    displayMovies(movies);
  } catch (error) {
    console.error("Error:", error);
    showNoResults();
  }
}
```

### Step 5: Implement API Functions

**Search by Name**:
```javascript
async function searchByName(query, year, genre) {
  let url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`;
  if (year) url += `&year=${year}`;
  
  const response = await fetch(url);
  const data = await response.json();
  let movies = data.results || [];
  
  if (genre && movies.length > 0) {
    movies = movies.filter(movie => 
      movie.genre_ids && movie.genre_ids.includes(parseInt(genre))
    );
  }
  return movies;
}
```

**Discover Movies**:
```javascript
async function discoverMovies(genre, year) {
  let url = `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`;
  if (genre) url += `&with_genres=${genre}`;
  if (year) url += `&year=${year}`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data.results || [];
}
```

**Get Popular Movies**:
```javascript
async function getPopularMovies() {
  const url = `${baseUrl}/movie/popular?api_key=${apiKey}&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results || [];
}
```

### Step 6: Create Display Functions

**Display Movies**:
```javascript
function displayMovies(movies) {
  hideLoading();
  if (!movies || movies.length === 0) {
    showNoResults();
    return;
  }
  
  resultsSection.style.display = "block";
  noResults.style.display = "none";
  moviesGrid.innerHTML = "";
  
  movies.forEach(movie => {
    const card = createMovieCard(movie);
    moviesGrid.appendChild(card);
  });
  
  resultsSection.scrollIntoView({ behavior: "smooth" });
}
```

**Create Movie Card**:
```javascript
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  
  const posterUrl = movie.poster_path 
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  
  const rating = movie.vote_average 
    ? movie.vote_average.toFixed(1) 
    : "N/A";
  
  card.innerHTML = `
    <img src="${posterUrl}" alt="${movie.title}" class="movie-poster">
    <div class="movie-info">
      <h3>${movie.title}</h3>
      <div>${releaseYear}</div>
      <p>${movie.overview || "No description"}</p>
      <div>⭐ ${rating}</div>
    </div>
  `;
  
  card.addEventListener("click", () => showMovieDetails(movie));
  return card;
}
```

### Step 7: Add Helper Functions

```javascript
function showLoading() {
  loading.style.display = "block";
  resultsSection.style.display = "none";
  noResults.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
}

function showNoResults() {
  hideLoading();
  resultsSection.style.display = "none";
  noResults.style.display = "block";
}

function showMovieDetails(movie) {
  alert(`
    Title: ${movie.title}
    Release Date: ${movie.release_date || "N/A"}
    Rating: ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
    Overview: ${movie.overview || "No description"}
  `);
}
```

### Step 8: Initialize on Page Load

```javascript
document.addEventListener("DOMContentLoaded", () => {
  searchMovies(); // Show popular movies by default
});
```

## 🔑 API Key Setup

### Option 1: Use the Provided API Key (Recommended for Testing)

You can use this API key directly in your project:
```javascript
const apiKey = "b36db9ba640e52c05b3054e15904338c";
```

### Option 2: Get Your Own API Key

1. Visit [TMDB Website](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key (it's free!)
5. Copy your API key
6. Replace the `apiKey` constant in `script.js`

### API Endpoints Used

- **Search Movies**: `/search/movie`
- **Discover Movies**: `/discover/movie`
- **Popular Movies**: `/movie/popular`
- **Images**: `https://image.tmdb.org/t/p/w500`

### API Documentation

For more details, visit: [TMDB API Documentation](https://developers.themoviedb.org/3)

## 📝 Key Concepts Explained

### Async/Await
- `async` functions can wait for data without blocking
- `await` pauses execution until a promise resolves
- Essential for API calls that take time

### Fetch API
- Modern way to make HTTP requests
- Returns a Promise
- Must use `.json()` to parse response

### DOM Manipulation
- `document.getElementById()` - finds elements
- `createElement()` - creates new elements
- `innerHTML` - sets HTML content
- `appendChild()` - adds elements to page
- `addEventListener()` - makes elements interactive

### Event Handling
- Click events trigger functions
- Keyboard events (Enter key) also trigger functions
- `DOMContentLoaded` ensures page is ready

## 🎓 Learning Points

1. **API Integration**: Learn how to fetch data from external APIs
2. **Async Programming**: Understand promises and async/await
3. **DOM Manipulation**: Create and modify HTML elements dynamically
4. **Event Handling**: Make web pages interactive
5. **Error Handling**: Use try/catch for robust code
6. **User Experience**: Loading states and smooth interactions

## 🐛 Troubleshooting

**Movies not showing?**
- Check browser console for errors
- Verify API key is correct
- Ensure internet connection is active

**CORS errors?**
- TMDB API supports CORS, but if issues occur, use a local server instead of opening HTML directly

**Images not loading?**
- Check image URLs in console
- Verify `imageBaseUrl` is correct

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Credits

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built with vanilla JavaScript, HTML, and CSS

---

**Happy Coding! 🎬✨**

