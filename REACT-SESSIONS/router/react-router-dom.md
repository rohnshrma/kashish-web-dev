# React Router DOM - Simple Guide (with a Blog App)

We learn React Router by building a tiny **blog app**. Every concept below has: **what it is -> why -> the code -> what each line does**.

Run it while you read:
```bash
npm install
npm run dev
```
Login: **any name + password `123`**.

What we will learn (beginner to intermediate):

1. `BrowserRouter`, `Routes`, `Route`
2. `Link` and `NavLink`
3. Dynamic URLs with `useParams`
4. `useNavigate` (go to a page from code)
5. Nested routes and `Outlet`
6. Search in the URL with `useSearchParams`
7. Private routes with `Navigate` + `useLocation`
8. 404 page

---

## 0. Why do we need a router?

A normal website has many HTML files: `/about`, `/contact`. React has only **one** HTML page.

React Router reads the URL and **shows a different component** for each URL, without reloading the page.

```
/            ->  <Home />
/blogs       ->  <Blogs />
/blogs/2     ->  <BlogDetail />
```

Install it:
```bash
npm i react-router-dom
```

---

## 1. The pages of our blog

| URL | Page | Who can open |
| --- | --- | --- |
| `/` | Home | everyone |
| `/blogs` | List of all posts (+ search) | everyone |
| `/blogs/2` | One post | everyone |
| `/login` | Login | everyone |
| `/dashboard` | My posts | **logged in only** |
| `/dashboard/new` | Write a new post | **logged in only** |
| anything else | 404 | everyone |

Files (same structure as our `tdl` app and the inventory assignment: contexts in `src`, components in `src/Components`):
```
src/
├── main.jsx                 BrowserRouter + providers
├── App.jsx                  all routes (URL -> component)
├── AuthContext.jsx          who is logged in
├── BlogContext.jsx          the posts
└── Components/
    ├── Navbar.jsx           links
    ├── ProtectedRoute.jsx   private route
    ├── Home.jsx             \
    ├── Blogs.jsx             |
    ├── BlogDetail.jsx        |  one component per page
    ├── Login.jsx             |
    ├── Dashboard.jsx         |
    ├── MyPosts.jsx           |
    ├── NewPost.jsx           |
    └── NotFound.jsx         /
```
Pages are just normal components. A "page" is only a component that a `Route` points to.

---

## 2. `main.jsx` - turn on the router

```jsx
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <BlogContextProvider>
        <App />
      </BlogContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
```

- `BrowserRouter` = "routing works for everything inside me". Wrap your whole app **once**, at the top.
- Router features (`Link`, `useParams`...) only work **inside** it. Using them outside gives an error.
- The two context providers hold our login info and posts (same Context API you already know).

---

## 3. `App.jsx` - the route table (the most important file)

```jsx
<Navbar />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/blogs/:id" element={<BlogDetail />} />
  <Route path="/login" element={<Login />} />

  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<MyPosts />} />
      <Route path="new" element={<NewPost />} />
    </Route>
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>
```

### `Routes` and `Route`
- `<Routes>` = a box holding all routes. It picks the **one** that matches the URL.
- `<Route path="/blogs" element={<Blogs />} />` = "when the URL is `/blogs`, show `<Blogs />`".

### `<Navbar />` is outside `<Routes>`
Anything placed outside `<Routes>` shows on **every** page. That's how the navbar is written once.

### The rest of the file
Dynamic route `:id` (section 6), nested routes (section 9), private route (section 10), and `path="*"` for 404 (section 11). We'll cover each one.

---

## 4. `Link` - move between pages

```jsx
<Link to="/blogs">Read blogs</Link>
```

- Looks like `<a>`, but **does not reload the page**, so your React state is kept.
- Always use `Link` for pages inside your app. (`<a>` is only for other websites.)

Dynamic link, using a template string:
```jsx
<Link to={`/blogs/${post.id}`}>{post.title}</Link>
```
For `post.id = "2"` this makes `/blogs/2`.

---

## 5. `NavLink` - a Link that knows if it is the current page

In `Navbar.jsx`:
```jsx
const style = ({ isActive }) => ({
  marginRight: 12,
  fontWeight: isActive ? "bold" : "normal",
});

<NavLink to="/" style={style} end>Home</NavLink>
<NavLink to="/blogs" style={style}>Blogs</NavLink>
```

- `NavLink` calls your `style` function and gives `{ isActive }`.
- `isActive` is `true` when the URL matches that link, so we make it bold.
- `end` on Home: every URL starts with `/`, so without `end`, Home would **always** be active. `end` = "only when the URL is exactly `/`".

Show links only when logged in:
```jsx
{user && <NavLink to="/dashboard" style={style}>Dashboard</NavLink>}
```
This is normal conditional rendering. If `user` is `null`, nothing is shown.

---

## 6. Dynamic URLs with `useParams`

**Problem:** we can't write one route per post (`/blogs/1`, `/blogs/2`, ...).

**Solution:** put a variable in the path with `:`.

```jsx
<Route path="/blogs/:id" element={<BlogDetail />} />
```

`:id` matches anything: `/blogs/1`, `/blogs/2`, `/blogs/abc`.

Read the value in `BlogDetail.jsx`:
```jsx
const { id } = useParams();            // URL /blogs/2  ->  id = "2"
const { posts } = useContext(BlogContext);
const post = posts.find((p) => p.id === id);
```

- `useParams()` returns an object of all `:something` values in the URL.
- **It is always a string** (`"2"`, not `2`). That's why our post ids are strings.
- We then `find` the matching post from our list.

If the post doesn't exist (`/blogs/999`):
```jsx
if (!post) return <h1>Post not found</h1>;
```
The URL shape was valid, but no data, so we show a message ourselves.

---

## 7. `useNavigate` - go to a page from code

`Link` is for **clicking**. `useNavigate` is when **your code** decides to move (after login, after publishing).

```jsx
const navigate = useNavigate();

navigate("/blogs");                      // go to /blogs
navigate("/blogs", { replace: true });   // go, replacing the current history entry
navigate(-1);                            // go back one page (like the Back button)
```

Used in the project:

**Back button** (`BlogDetail.jsx`):
```jsx
<button onClick={() => navigate(-1)}>Back</button>
```

**After publishing** (`NewPost.jsx`):
```jsx
const id = uuidv4();                   // from the uuid package, like in AddTask
addPost({ id, title, body, author: user.name });
navigate(`/blogs/${id}`);               // open the new post
```

**What is `replace`?** Normally every navigation adds a history entry. After login, pressing Back would return to the login page. `replace: true` swaps the current entry, so Back skips it.

---

## 8. Search in the URL with `useSearchParams`

URL: `/blogs?search=react`. The `?search=react` part is a **search param** (also called query string).

`useSearchParams` works like `useState`, but the value lives **in the URL**.

`Blogs.jsx`:
```jsx
const [searchParams, setSearchParams] = useSearchParams();
const search = searchParams.get("search") || "";
```
- `searchParams.get("search")` reads the value. It is `null` if missing, so `|| ""` gives an empty string.

Filter while rendering (no extra state):
```jsx
const visible = posts.filter((p) =>
  p.title.toLowerCase().includes(search.toLowerCase()),
);
```

Update the URL as the user types:
```jsx
<input
  value={search}
  onChange={(e) => setSearchParams(e.target.value ? { search: e.target.value } : {})}
/>
```
- `setSearchParams({ search: "react" })` makes the URL `/blogs?search=react`.
- `setSearchParams({})` removes it (empty box = clean URL).

**Why URL and not `useState`?** Refresh keeps the search, you can share the link, and Back goes to the previous search.

---

## 9. Nested routes and `Outlet` (the dashboard)

The dashboard has a small menu (My posts / New post). Only the part **below** the menu changes. The menu stays.

### In `App.jsx`
```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<MyPosts />} />
  <Route path="new" element={<NewPost />} />
</Route>
```
- Routes **inside** a route are its **children**.
- A child's path is added after the parent: `/dashboard` + `new` = `/dashboard/new`.
- Child paths have **no leading `/`** (`"new"`, not `"/new"`).
- `index` = "what to show at the parent's exact URL". At `/dashboard`, show `MyPosts`. An index route has no `path`.

### In `Dashboard.jsx`
```jsx
<h1>Dashboard</h1>
<NavLink to="/dashboard" end>My posts</NavLink>
<NavLink to="/dashboard/new">New post</NavLink>
<hr />
<Outlet />
```
**`<Outlet />` = "put the matched child here".**
- URL `/dashboard` -> `<MyPosts />` appears at the Outlet.
- URL `/dashboard/new` -> `<NewPost />` appears there.

If you forget `<Outlet />`, the parent shows but the child never does.

(`end` on "My posts" for the same reason as Home: so it isn't active on `/dashboard/new` too.)

---

## 10. Private routes (only for logged-in users)

**Goal:** `/dashboard` and `/dashboard/new` must need login.

### Step 1: who is logged in? `AuthContext.jsx`
```jsx
const [user, setUser] = useState(null);     // null = logged out

const login = (name, password) => {
  if (!name.trim() || password !== "123") return false;
  setUser({ name: name.trim() });
  return true;
};
const logout = () => setUser(null);
```
- `user` is `null` (logged out) or `{ name }` (logged in).
- `login` returns `true`/`false` so the form can show an error.
- This is a **fake** login for learning. A real app asks the backend.
- Any component reads it with `const { user, login, logout } = useContext(AuthContext);`, exactly like `TaskContext` in the to-do app.

### Step 2: the guard. `ProtectedRoute.jsx`
```jsx
const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
```
Line by line:
1. Get `user` from `AuthContext` with `useContext`.
2. `useLocation()` gives info about the **current URL** (`pathname`, `search`, `state`).
3. **Not logged in?** `<Navigate to="/login" />` redirects immediately.
   - `state={{ from: location }}` attaches a note: "they were trying to open this page".
   - `replace` so Back doesn't return to the blocked page.
4. **Logged in?** `<Outlet />` shows the protected child page.

### Step 3: wrap the private routes in `App.jsx`
```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />}> ... </Route>
</Route>
```
A `Route` with **no `path`** only wraps its children. Everything inside is protected. To protect another page, put it inside.

### Step 4: go back to the wanted page after login. `Login.jsx`
```jsx
const location = useLocation();
const from = location.state?.from?.pathname || "/dashboard";

if (user) return <Navigate to={from} replace />;

const submitHandler = (e) => {
  e.preventDefault();
  if (login(name, password)) navigate(from, { replace: true });
  else setError("Enter a name and the password 123");
};
```
- `location.state.from` is the note left by `ProtectedRoute`.
- `?.` stops a crash if there is no note (user opened `/login` directly).
- `|| "/dashboard"` = default page.
- If already logged in, `<Navigate>` skips the login form.
- On success, `navigate(from, { replace: true })`.

### `Navigate` vs `useNavigate`
| | Use when |
| --- | --- |
| `<Navigate to="..." />` | redirect **while rendering** (`if (!user) return <Navigate ... />`) |
| `navigate("...")` | redirect **after an event** (button click, form submit) |

### The whole flow
```
1. Logged out, open /dashboard
2. ProtectedRoute sees no user -> redirect to /login  (note: from = /dashboard)
3. Enter a name + 123 -> login() is true
4. navigate("/dashboard") -> dashboard opens
```

> **Important:** a private route only improves user experience. Anyone can edit frontend code. **Real security is the backend** checking the login token on every API request.
>
> Here `user` lives in memory, so a refresh logs you out. A real app saves a token and restores it on load.

---

## 11. 404 page

```jsx
<Route path="*" element={<NotFound />} />
```
`*` means "anything no other route matched". Put it **last**. `NotFound.jsx` is a message plus `<Link to="/">`.

Try `/random` in the browser to see it.

---

## 12. Using login info inside pages

`MyPosts.jsx` shows only the current user's posts:
```jsx
const { user } = useContext(AuthContext);
const mine = posts.filter((p) => p.author === user.name);
```
We can use `user.name` without checking for `null`, because `ProtectedRoute` guarantees a logged-in user on this page.

---

## 13. Cheat sheet

| Name | What it does | Where we used it |
| --- | --- | --- |
| `BrowserRouter` | Turns routing on | `main.jsx` |
| `Routes` | Picks the matching route | `App.jsx` |
| `Route` | One URL -> component | `App.jsx` |
| `path="/blogs/:id"` | Dynamic URL | `App.jsx` |
| `index` | Default child route | `App.jsx` |
| `path="*"` | 404 | `App.jsx` |
| `Link` | Click to move, no reload | many pages |
| `NavLink` | Link with `isActive` | `Navbar`, `Dashboard` |
| `Outlet` | Where the child route shows | `Dashboard`, `ProtectedRoute` |
| `useParams` | Read `:id` | `BlogDetail` |
| `useNavigate` | Move from code | `Login`, `BlogDetail`, `NewPost` |
| `Navigate` | Redirect while rendering | `ProtectedRoute`, `Login` |
| `useLocation` | Current URL + `state` | `ProtectedRoute`, `Login` |
| `useSearchParams` | Read/write `?search=` | `Blogs` |

---

## 14. Common mistakes

1. `<a href="/blogs">` instead of `<Link>`: page reloads, state is lost.
2. Forgetting `<Outlet />` in a parent route: children never show.
3. Writing `path="/new"` for a child. Write `path="new"`.
4. Expecting `useParams` to give a number. It is a string.
5. Using `navigate()` during render. Use `<Navigate />` there.
6. Forgetting `replace` on redirects: Back returns to the blocked page.
7. Using router features outside `<BrowserRouter>`.
8. Thinking a private route is real security. The backend must check too.
9. After deploying, refreshing `/blogs/2` gives 404 on some hosts. The host must serve `index.html` for every URL.

---

## 15. Practice

1. Add a `/about` page and a NavLink.
2. Add an edit page `/dashboard/edit/:id` for a post.
3. Add a `?sort=title` search param to sort the blog list.
4. Open `/blogs/999` and `/random`. Explain why they show different messages.
5. Make "Delete" go back to `/dashboard` using `useNavigate`.

---

## 16. What comes next (advanced, not covered here)

`createBrowserRouter` + `RouterProvider`, `loader`, `action`, `<Form>`, `errorElement`, `lazy`. These are for data fetching with a real backend.
