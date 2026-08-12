// ============================================
// CINESEARCH - Movie Search Application
// Detailed Student Implementation Steps
// ============================================

// ============================================
// STEP 1: API Configuration Setup
// ============================================
// TODO 1.1: Create a const variable named ‘apiKey’
//           - Assign it the TMDB API key value (you’ll be given this)
//
// TODO 1.2: Create a const variable named ‘baseUrl’
//           - This should be the TMDB API base URL (https://api.themoviedb.org/3)
//           - This is the starting point for all API requests
//
// TODO 1.3: Create a const variable named ‘imageBaseUrl’
//           - This should be the URL for TMDB images (https://image.tmdb.org/t/p/w500)
//           - This is used to construct full image paths for movie posters
//           - The w500 means the images will be 500 pixels wide


// ============================================
// STEP 2: Select HTML Elements from the Page
// ============================================
// TODO 2.1: Create a const named ‘movieNameInput’
//           - Use document.getElementById() to find the element with id "movieName"
//           - This is the text input where users type the movie name
//
// TODO 2.2: Create a const named ‘genreSelect’
//           - Use document.getElementById() to find the element with id "genre"
//           - This is the dropdown/select element for choosing a genre
//
// TODO 2.3: Create a const named ‘yearInput’
//           - Use document.getElementById() to find the element with id "year"
//           - This is the text input where users type the year
//
// TODO 2.4: Create a const named ‘searchBtn’
//           - Use document.getElementById() to find the element with id "searchBtn"
//           - This is the button users click to search
//
// TODO 2.5: Create a const named ‘loading’
//           - Use document.getElementById() to find the element with id "loading"
//           - This element shows a spinner while data is being fetched
//
// TODO 2.6: Create a const named ‘resultsSection’
//           - Use document.getElementById() to find the element with id "resultsSection"
//           - This is the container where movie results will be displayed
//
// TODO 2.7: Create a const named ‘moviesGrid’
//           - Use document.getElementById() to find the element with id "moviesGrid"
//           - This is where individual movie cards will be added
//
// TODO 2.8: Create a const named ‘noResults’
//           - Use document.getElementById() to find the element with id "noResults"
//           - This shows a message when no movies match the search


// ============================================
// STEP 3: Attach Event Listeners for User Interactions
// ============================================
// TODO 3.1: Add a click event listener to searchBtn
//           - The event listener should call the searchMovies() function
//           - Use addEventListener("click", ...)
//
// TODO 3.2: Add a keypress event listener to movieNameInput
//           - Check if the pressed key is "Enter" (e.key === "Enter")
//           - If it is Enter, call the searchMovies() function
//           - This lets users search by pressing Enter instead of clicking the button
//
// TODO 3.3: Add a keypress event listener to yearInput
//           - Check if the pressed key is "Enter" (e.key === "Enter")
//           - If it is Enter, call the searchMovies() function
//           - This lets users search by pressing Enter in the year field


// ============================================
// STEP 4: Create the Main Search Function
// ============================================
// TODO 4.1: Create an async function named ‘searchMovies’
//           - It takes no parameters
//
// TODO 4.2: Inside searchMovies(), extract the user’s search inputs
//           - Get movieName from movieNameInput.value and .trim() it
//           - Get genre from genreSelect.value
//           - Get year from yearInput.value and .trim() it
//
// TODO 4.3: Call showLoading() to show the loading spinner
//
// TODO 4.4: Wrap the rest in a try block (error handling)
//
// TODO 4.5: Inside try, create a let variable named ‘movies’ and set it to an empty array []
//
// TODO 4.6: Implement conditional logic to choose which search method to use:
//           - If movieName has a value (not empty string):
//             * Call await searchByName(movieName, year, genre)
//             * Store the result in the movies variable
//           - Else if genre has a value OR year has a value:
//             * Call await discoverMovies(genre, year)
//             * Store the result in the movies variable
//           - Else (nothing was entered):
//             * Call await getPopularMovies()
//             * Store the result in the movies variable
//
// TODO 4.7: After getting the movies, call displayMovies(movies) to show them
//
// TODO 4.8: Implement the catch block
//           - Catch any error parameter
//           - Log the error to console using console.error()
//           - Call showNoResults() to display the error message


// ============================================
// STEP 5: Create Search by Movie Name Function
// ============================================
// TODO 5.1: Create an async function named ‘searchByName’
//           - Parameters: query, year, genre
//           - These are the search criteria from the user inputs
//
// TODO 5.2: Build the API URL string
//           - Start with: ${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1
//           - Note: encodeURIComponent() makes sure special characters in the movie name don’t break the URL
//           - Store this in a let variable named ‘url’
//
// TODO 5.3: If year has a value (user entered a year):
//           - Append &year=${year} to the url string
//
// TODO 5.4: Log the url to console for debugging (console.log())
//
// TODO 5.5: Fetch data from the API
//           - Use fetch(url) with await
//           - Store the response in a const named ‘response’
//           - Call response.json() with await to convert it to usable data
//           - Store the parsed data in a const named ‘data’
//
// TODO 5.6: Log the initial results for debugging
//           - console.log("initial movies recieved => ", data.results)
//
// TODO 5.7: Extract movies from the response
//           - Get data.results or use an empty array [] if it doesn’t exist
//           - Store in a let variable named ‘movies’
//
// TODO 5.8: Filter by genre if the user selected one
//           - Only do this filtering if genre has a value AND movies array has items
//           - Use the filter() method on the movies array
//           - Keep only movies where:
//             * movie.genre_ids exists
//             * movie.genre_ids.includes(parseInt(genre)) returns true
//           - Note: parseInt(genre) converts the genre from string to number
//
// TODO 5.9: Log the filtered results for debugging
//           - console.log("filtered movies as per genre", movies)
//
// TODO 5.10: Return the movies array


// ============================================
// STEP 6: Create Discover Movies Function
// ============================================
// TODO 6.1: Create an async function named ‘discoverMovies’
//           - Parameters: genre, year
//           - These are used to find movies by category and release date
//
// TODO 6.2: Build the API URL string
//           - Start with: ${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc
//           - This sorts results by popularity (most popular first)
//           - Store this in a let variable named ‘url’
//
// TODO 6.3: If genre has a value:
//           - Append &with_genres=${genre} to the url string
//
// TODO 6.4: If year has a value:
//           - Append &year=${year} to the url string
//
// TODO 6.5: Fetch data from the API
//           - Use fetch(url) with await
//           - Store the response in a const named ‘response’
//           - Call response.json() with await
//           - Store the parsed data in a const named ‘data’
//
// TODO 6.6: Return the movies
//           - Return data.results or empty array [] if no results


// ============================================
// STEP 7: Create Get Popular Movies Function
// ============================================
// TODO 7.1: Create an async function named ‘getPopularMovies’
//           - It takes no parameters
//           - This shows trending/popular movies by default
//
// TODO 7.2: Log a message to console
//           - console.log("Popular movies search")
//
// TODO 7.3: Build the API URL
//           - URL: ${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1
//           - Store in a const named ‘url’
//
// TODO 7.4: Fetch and parse the data
//           - Use fetch(url) with await
//           - Store response in const ‘response’
//           - Call response.json() with await
//           - Store data in const ‘data’
//
// TODO 7.5: Return the movies
//           - Return data.results or empty array [] if no results


// ============================================
// STEP 8: Create Display Movies Function
// ============================================
// TODO 8.1: Create a function named ‘displayMovies’
//           - Parameter: movies (the array of movie objects to display)
//
// TODO 8.2: Hide the loading spinner
//           - Call hideLoading()
//
// TODO 8.3: Check if there are no movies to display
//           - If movies is null, undefined, or has length 0:
//             * Call showNoResults()
//             * Use return to stop executing the rest of this function
//
// TODO 8.4: Show the results section and hide the no-results message
//           - Set resultsSection.style.display = "block" (show it)
//           - Set noResults.style.display = "none" (hide it)
//
// TODO 8.5: Clear any old movie cards from the grid
//           - Set moviesGrid.innerHTML = "" (empty string removes all content)
//
// TODO 8.6: Loop through each movie and create cards
//           - Use movies.forEach() to loop through the array
//           - For each movie:
//             * Call createMovieCard(movie) to create a card element
//             * Store the result in a variable (e.g., movieCard)
//             * Use moviesGrid.appendChild(movieCard) to add it to the grid
//
// TODO 8.7: Scroll to the results
//           - Use resultsSection.scrollIntoView() with { behavior: "smooth" }
//           - This smoothly scrolls the page to show the results


// ============================================
// STEP 9: Create Movie Card Element Function
// ============================================
// TODO 9.1: Create a function named ‘createMovieCard’
//           - Parameter: movie (a single movie object)
//           - Returns: the HTML element for the card
//
// TODO 9.2: Create a new div element
//           - Use document.createElement("div")
//           - Store in a const named ‘card’
//
// TODO 9.3: Add the class name to the card
//           - Set card.className = "movie-card"
//
// TODO 9.4: Handle the poster image URL
//           - Use a ternary operator: condition ? trueValue : falseValue
//           - Check if movie.poster_path exists
//           - If it exists: use ${imageBaseUrl}${movie.poster_path} as the URL
//           - If it doesn’t: use "https://via.placeholder.com/500x750/e1e5e9/666?text=No+Image" (placeholder)
//           - Store in a const named ‘posterUrl’
//
// TODO 9.5: Extract the release year
//           - Use a ternary operator
//           - Check if movie.release_date exists
//           - If it exists: create a new Date object from it, then call getFullYear()
//           - If it doesn’t: use "N/A"
//           - Store in a const named ‘releaseYear’
//
// TODO 9.6: Extract the rating
//           - Use a ternary operator
//           - Check if movie.vote_average exists
//           - If it exists: use .toFixed(1) to round to 1 decimal place
//           - If it doesn’t: use "N/A"
//           - Store in a const named ‘rating’
//
// TODO 9.7: Extract the overview/description
//           - Use a ternary operator
//           - Check if movie.overview exists
//           - If it exists: use movie.overview
//           - If it doesn’t: use "No description available."
//           - Store in a const named ‘overview’
//
// TODO 9.8: Build the HTML for the card
//           - Set card.innerHTML with a template string containing:
//             * An <img> with src="${posterUrl}", alt="${movie.title}", class="movie-poster", loading="lazy"
//             * A <div class="movie-info"> containing:
//               - <h3 class="movie-title"> with the movie title
//               - <div class="movie-year"> with the release year
//               - <p class="movie-overview"> with the description
//               - <div class="movie-rating"> with:
//                 * A star emoji ⭐
//                 * A <span class="rating-score"> with the rating
//
// TODO 9.9: Add a click event listener to the card
//           - Use card.addEventListener("click", ...)
//           - When clicked, call showMovieDetails(movie)
//
// TODO 9.10: Return the card element


// ============================================
// STEP 10: Create Show Movie Details Function
// ============================================
// TODO 10.1: Create a function named ‘showMovieDetails’
//            - Parameter: movie (a single movie object)
//
// TODO 10.2: Build a details string
//            - Include the movie title
//            - Include the release date (or "N/A" if none)
//            - Include the rating rounded to 1 decimal place (or "N/A"), with "/10" after it
//            - Include the overview (or default message if none)
//            - Format it nicely with line breaks and labels
//            - Store in a const named ‘details’
//
// TODO 10.3: Show the details in an alert
//            - Use alert(details) to display the information


// ============================================
// STEP 11: Create Loading State Functions
// ============================================
// TODO 11.1: Create a function named ‘showLoading’
//            - It takes no parameters
//            - Set loading.style.display = "block" (show the spinner)
//            - Set resultsSection.style.display = "none" (hide results)
//            - Set noResults.style.display = "none" (hide no-results message)
//
// TODO 11.2: Create a function named ‘hideLoading’
//            - It takes no parameters
//            - Set loading.style.display = "none" (hide the spinner)
//
// TODO 11.3: Create a function named ‘showNoResults’
//            - It takes no parameters
//            - Call hideLoading() to turn off the spinner
//            - Set resultsSection.style.display = "none" (hide results)
//            - Set noResults.style.display = "block" (show no-results message)


// ============================================
// STEP 12: Initialize the Page on Load
// ============================================
// TODO 12.1: Add a DOMContentLoaded event listener to document
//            - Use document.addEventListener("DOMContentLoaded", ...)
//            - This runs when the HTML page has fully loaded
//
// TODO 12.2: Inside the event listener callback
//            - Call searchMovies() to load and display popular movies
//            - This makes the page show movies immediately when it loads
