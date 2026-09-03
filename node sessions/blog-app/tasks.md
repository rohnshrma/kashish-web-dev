# Blog App — Tasks

Build a small blog with **Create** and **Read**. Same stack and same folder
layout as the expense tracker you already built: Express + EJS + Mongoose,
ES modules (`import` / `export`, not `require`).

The three views and the stylesheet are already done for you. **Do not edit
`public/css/style.css`.** Your job is everything else: the server, the config,
the model, the routes, and the EJS logic inside the three `.ejs` files.

---

## What you are building

| Page | URL | What it does |
| --- | --- | --- |
| Home | `GET /` | Hero + the 3 most recent posts |
| Blogs | `GET /blogs` | Every post, newest first |
| Compose | `GET /compose` | The write-a-post form |
| Save | `POST /compose` | Saves the post, then redirects to `/blogs` |

Where you end up:

```
blog-app/
├── config/
│   └── db.js
├── model/
│   └── Post.js
├── routes/
│   └── blog.js
├── public/
│   └── css/
│       └── style.css      ← already done, leave it alone
├── views/
│   ├── home.ejs           ← starter markup, add your EJS
│   ├── blogs.ejs          ← starter markup, add your EJS
│   └── compose.ejs        ← starter markup, add your EJS
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Phase 1 — Project setup

- [ ] **1.1** Run `npm init -y` inside `blog-app`.
- [ ] **1.2** Open `package.json` and add `"type": "module"` so `import`
      syntax works. Without this line every `import` throws.
- [ ] **1.3** Install the four packages you need: `express`, `ejs`,
      `mongoose`, `dotenv`.
- [ ] **1.4** Install `nodemon` as a dev dependency.
- [ ] **1.5** Add two scripts: `"start"` runs `node server.js`, `"dev"` runs
      `nodemon server.js`.
- [ ] **1.6** Create a `.gitignore` with `node_modules` and `.env` in it.

**Done when:** `npm run dev` fails with "Cannot find module server.js" and
nothing else. That is the correct failure at this stage.

---

## Phase 2 — Config (`config/db.js`)

- [ ] **2.1** Create `.env` with two variables: `PORT` (use `3003`, so it does
      not clash with the expense tracker on 3002) and `MONGO_URI` pointing at
      a local database called `blog-db`.
- [ ] **2.2** Create `config/db.js`. Export one default `async` function that
      connects Mongoose to `process.env.MONGO_URI`.
- [ ] **2.3** Wrap the connect in `try / catch`. On success log the connected
      host, on failure log the error and exit the process with code `1`.

**Watch out:** `process.env.MONGO_URI` is `undefined` unless `dotenv` has
already run. That is why `config()` gets called at the very top of
`server.js`, *before* you call your connect function.

---

## Phase 3 — Model (`model/Post.js`)

- [ ] **3.1** Create `model/Post.js` and build a Mongoose schema with three
      fields:

      | Field | Type | Rules |
      | --- | --- | --- |
      | `title` | String | required, min length 3 |
      | `author` | String | required, min length 2 |
      | `content` | String | required, min length 10 |

- [ ] **3.2** Turn on `timestamps` in the schema options. This is what gives
      you `createdAt`, which the views print as the post date.
- [ ] **3.3** Create the model from the schema and export it as the default.

**Watch out:** the validation rules here must match the `minlength` attributes
already sitting on the form inputs in `compose.ejs`. The browser check is a
convenience; the schema check is the one that actually protects your data.

---

## Phase 4 — Routes (`routes/blog.js`)

Use `Router` from Express. Every handler is `async` and wrapped in
`try / catch` — exactly like `routes/expense.js` in the expense tracker.

- [ ] **4.1** `GET /` — read the posts newest first, then render `home` and
      pass the posts in. (Look up `.sort()` on a Mongoose query; sorting by
      `createdAt` descending is what "newest first" means.)
- [ ] **4.2** `GET /blogs` — same read, render `blogs`.
- [ ] **4.3** `GET /compose` — no database call needed. Just render `compose`.
- [ ] **4.4** `POST /compose` — pull `title`, `author` and `content` off
      `req.body`, build a new `Post`, save it, then **redirect** to `/blogs`.
- [ ] **4.5** In every `catch`, log the error and redirect somewhere sensible
      instead of leaving the browser hanging.
- [ ] **4.6** Export the router as the default.

**Watch out:** the compose page reads a variable called `error` when it shows
the red banner. If you render `compose` from more than one place, every one of
those `res.render` calls has to pass the same set of variables — EJS throws
`x is not defined` the moment one is missing. Decide early whether `error` is
always passed (as `null` when there is no error) or whether the view uses a
`typeof` check.

**Why redirect after POST?** If you render the list directly from the POST
handler, the browser URL is still `/compose`, and a refresh re-submits the
form and saves the post twice. Redirecting fixes that.

---

## Phase 5 — Server (`server.js`)

- [ ] **5.1** Call `config()` from dotenv first, then your `connectDB()`.
- [ ] **5.2** Create the Express app and read `PORT` from `process.env`, with
      `3000` as a fallback.
- [ ] **5.3** Middleware, in this order:
      - serve the `public` folder as static files
      - `express.urlencoded({ extended: true })` so form bodies get parsed
      - set the view engine to `ejs`
- [ ] **5.4** Mount your router at `/`.
- [ ] **5.5** `app.listen` and log the port.

**Watch out:** if you forget the `urlencoded` middleware, `req.body` is
`undefined` and your POST route crashes. If you forget the static middleware,
the page loads with zero styling.

---

## Phase 6 — EJS in the views

Every spot that needs your code is marked with a `TODO (student)` comment
inside the `.ejs` files. Work through them in this order:

### `home.ejs`
- [ ] **6.1** Print the real post count in `.section-head__count`.
- [ ] **6.2** Loop over `posts` to repeat the `<li class="post">` card, but
      only for the first 3.
- [ ] **6.3** Fill in index, title, author, date and a short preview of the
      content.
- [ ] **6.4** Show the `.empty` block instead of the list when there are no
      posts.
- [ ] **6.5** Delete the sample card.

### `blogs.ejs`
- [ ] **6.6** Print the real count in both the chip and the section head.
- [ ] **6.7** Loop over every post and fill in the card.
- [ ] **6.8** Show the `.empty` block when the array is empty.
- [ ] **6.9** Delete both sample cards.

### `compose.ejs`
- [ ] **6.10** Set the form's `action` and `method`.
- [ ] **6.11** Show the `.flash` banner only when an `error` was passed in.

**Two output tags, one right answer:** EJS gives you `<%= %>` and `<%- %>`.
One escapes HTML, one does not. Post content is typed by a stranger — if you
print it with the non-escaping tag, someone can type a `<script>` tag into
your form and it will run in every visitor's browser. Work out which tag is
which and use the safe one everywhere you print user data.

---

## Phase 7 — Test it

- [ ] **7.1** `npm run dev`, open `http://localhost:3003`.
- [ ] **7.2** Empty database → all three pages load, home and blogs show the
      empty state, nothing crashes.
- [ ] **7.3** Publish a post → you land on `/blogs` and see it.
- [ ] **7.4** Refresh `/blogs` → still one post, not two.
- [ ] **7.5** Publish four more → home shows 3, blogs shows 5, newest first.
- [ ] **7.6** Type a 1-character title and submit → it does not reach the
      database. (Turn off the browser check with devtools if you want to see
      your schema validation actually fire.)
- [ ] **7.7** Publish a post whose content is `<b>hello</b>` → the page should
      show the literal text `<b>hello</b>`, not bold text. If it is bold, you
      used the wrong output tag in 6.x.
- [ ] **7.8** Write a post with multiple paragraphs → the line breaks survive
      on `/blogs`.

---

## Stretch goals

- [ ] **S1** Single post page: `GET /blogs/:id`, using `findById`. Make each
      card title a link to it.
- [ ] **S2** Move the top bar into `views/partials/header.ejs` and include it
      in all three pages, so the nav lives in one file instead of three.
- [ ] **S3** Highlight the active nav link from the server: pass the current
      page name into each render and add `nav__link--active` conditionally.
- [ ] **S4** Truncate the home preview properly — cut at 120 characters and
      add `…` only if the content was actually longer.
- [ ] **S5** Real validation errors: catch the Mongoose `ValidationError` in
      the POST route, re-render `compose` with the message and the values the
      user already typed, so nothing gets lost.
- [ ] **S6** Nicer dates: format `createdAt` as `2 Sep 2026` instead of the
      default `toDateString()`.

---

## Reference — the expense tracker

Open `../expense-tracker/` when you get stuck. It is the same shape with a
smaller model:

- `server.js` — dotenv, connect, middleware, mount router, listen
- `config/db.js` — the exact connect pattern you need
- `model/Expense.js` — schema, timestamps, default export
- `routes/expense.js` — `router.route("/").get(...).post(...)` with async
  handlers and `try / catch`

The difference here is three fields instead of one, three pages instead of
one, and a sort on the read.
