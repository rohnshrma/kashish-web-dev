# React Router DOM - Simple Guide (every concept, every code)

Read this top to bottom. Each part has: **what it is** -> **why we need it** -> **the code** -> **what each line does**.

Run the demo while reading:
```bash
npm install
npm run dev
```
Login: `user@test.com / 123` (normal user) or `admin@test.com / 123` (admin).

---

## 0. What problem does React Router solve?

A normal website has many pages: `/about`, `/contact`. Each URL loads a new HTML file.

React has only **one** HTML page (`index.html`). So how do we get `/about` and `/contact`?

**React Router** watches the URL. When the URL changes, it swaps which component is shown. The browser never reloads. That is why it feels fast.

```
URL: /about     ->  show <About />
URL: /contact   ->  show <Contact />
```

Think of it as a **table of "URL -> component"** plus some helpers (links, redirects, protection).

---

## 1. Install

```bash
npm i react-router-dom
```

---

## 2. The 3 steps to start (smallest working example)

### Step 1: make the route table
```jsx
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/",      element: <Home /> },
  { path: "/about", element: <About /> },
]);
```
- `createBrowserRouter` takes a list (array) of routes.
- `path` = the URL.
- `element` = the component to show for that URL.

### Step 2: give it to React
```jsx
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```
`RouterProvider` replaces `<App />`. It reads the URL and shows the right component.

### Step 3: link between pages
```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```
That's the basics. Everything below is extra features on top of this.

> Another style you may see in old videos: `<BrowserRouter><Routes><Route path="/" element={<Home />} /></Routes></BrowserRouter>`. Same idea, different way of writing. We use `createBrowserRouter` because loaders, actions and error pages need it.

---

## 3. Our project, file by file

```
src/
├── main.jsx                     starts the app
├── router.jsx                   the route table (URL -> component)
├── data.js                      fake product data
├── context/AuthContext.jsx      who is logged in
├── components/
│   ├── Layout.jsx               navbar + page area
│   └── ProtectedRoute.jsx       the private route guard
└── pages/
    ├── Home.jsx  About.jsx
    ├── Products.jsx             search + filter in URL
    ├── ProductDetail.jsx        one product (params + loader)
    ├── Contact.jsx              form (action)
    ├── Login.jsx
    ├── Dashboard.jsx            private
    ├── Admin.jsx                private + admin only + lazy
    ├── Unauthorized.jsx
    ├── NotFound.jsx             404
    └── ErrorPage.jsx            errors
```

---

## 4. `main.jsx` - starting the app

```jsx
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
);
```
- `RouterProvider` shows the correct page.
- `AuthContextProvider` (login info) is **outside** `RouterProvider`, so every page and the private-route guard can use it.
- Rule: anything the pages need (context) goes **outside** the router.

---

## 5. `router.jsx` - the route table

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      ...
      { path: "*", element: <NotFound /> },
    ],
  },
]);
```

Now each idea in this file:

### 5.1 Nested routes (`children`)
Pages live inside `Layout`. The parent route `/` has `children`. A child's path is added after the parent's: parent `/` + child `about` = `/about`.
**Do not** write a leading `/` in child paths (`"about"`, not `"/about"`).

### 5.2 Index route (`index: true`)
```jsx
{ index: true, element: <Home /> }
```
"What to show when the URL is exactly the parent's URL." Here, at `/`, show `Home`. An index route has no `path`.

### 5.3 Dynamic route (`:id`)
```jsx
{ path: ":id", element: <ProductDetail />, loader: productLoader }
```
`:id` is a **variable part** of the URL. `/products/1`, `/products/2`, `/products/99` all match. We read the value with `useParams` (section 9).

### 5.4 Nested inside nested
```jsx
{
  path: "products",
  children: [
    { index: true, element: <Products /> },     // /products
    { path: ":id", element: <ProductDetail /> }, // /products/3
  ],
}
```
`products` has no `element` of its own. It only groups children under `/products`.

### 5.5 Catch-all 404
```jsx
{ path: "*", element: <NotFound /> }
```
`*` = "anything nothing else matched". Always put it last.

### 5.6 `errorElement`
What to show if something crashes or a loader throws. Explained in section 12.

### 5.7 Private routes
The `ProtectedRoute` entries. Explained in section 13.

---

## 6. `Layout.jsx` - shared navbar with `Outlet`

**Problem:** every page needs the same navbar. Copy-pasting is bad.

**Solution:** a layout route. The navbar is written once, and the changing page goes into `<Outlet />`.

```jsx
const Layout = () => {
  ...
  return (
    <div>
      <nav>...links...</nav>
      <main><Outlet /></main>
    </div>
  );
};
```

`<Outlet />` = "put the matched child page here".
- URL `/about` -> `<About />` appears where `<Outlet />` is.
- URL `/products` -> `<Products />` appears there.

If you forget `<Outlet />`, the navbar shows but pages never do.

### `Link` vs `<a>`
```jsx
<Link to="/login">Login</Link>
```
- `<a href>` reloads the whole page and React state is lost.
- `<Link>` changes the URL **without reload**. Always use `Link` for internal pages. (Use `<a>` only for outside websites.)

### `NavLink` - a Link that knows if it is active
```jsx
const linkStyle = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
  color: isActive ? "tomato" : "inherit",
});

<NavLink to="/about" style={linkStyle}>About</NavLink>
<NavLink to="/" style={linkStyle} end>Home</NavLink>
```
- `NavLink` gives `isActive` (true when the URL matches this link).
- We use it to highlight the current page.
- `end` on Home: without it, `/` matches *every* URL, so Home would always be highlighted. `end` means "only exact `/`".

### `useNavigation` - is something loading?
```jsx
const navigation = useNavigation();
{navigation.state === "loading" && <p>Loading...</p>}
```
`navigation.state` is `"idle"`, `"loading"` (a loader is running) or `"submitting"` (a form is being sent). Use it for spinners.

### Showing links by login/role
```jsx
{user && <NavLink to="/dashboard">Dashboard</NavLink>}
{user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
```
Plain conditional rendering: hide links the user should not see. (Hiding is not security. See section 13.)

---

## 7. `useNavigate` - go to another page from code

`Link` is for clicking. `useNavigate` is for when **your code** decides to move (after login, after saving a form).

```jsx
const navigate = useNavigate();

navigate("/dashboard");                    // go to /dashboard
navigate("/dashboard", { replace: true }); // go, and replace the current history entry
navigate(-1);                              // go back one page (like Back button)
```

### What is `replace`?
Normally navigating *adds* a history entry. After login, if you press Back you'd return to the login page. With `replace: true` the login page is *replaced*, so Back skips it.

Used in `ProductDetail.jsx`:
```jsx
<button onClick={() => navigate(-1)}>Back</button>
```

---

## 8. `Navigate` (capital N) - redirect while rendering

```jsx
if (user) return <Navigate to="/dashboard" replace />;
```
- `useNavigate()` = a function you call inside click handlers / after events.
- `<Navigate />` = a component you **return** to redirect immediately during render.

Never call `navigate()` directly while rendering. Use `<Navigate>` there.

---

## 9. `useParams` - read the `:id` from the URL

For URL `/products/3` and route `path: ":id"`:
```jsx
const params = useParams();   // { id: "3" }
```
Important: the value is always a **string** (`"3"`, not `3`). That's why our data uses string ids.

In our app we use `params.id` inside the loader (next section).

---

## 10. Loader - get data BEFORE the page shows

**Old way:** show the page, then `useEffect` fetches data, show "loading...", then show data.
**Loader way:** fetch first. The page opens with data already there.

### In `ProductDetail.jsx`
```jsx
export const productLoader = ({ params }) => {
  const product = getProduct(params.id);
  if (!product) throw new Response("Product not found", { status: 404 });
  return product;
};
```
- A loader is a normal function attached to a route.
- It receives `{ params }` (and `request`).
- Whatever it **returns** becomes the page's data.
- If the product doesn't exist, we **throw** a 404 `Response`. React Router then shows the `errorElement` instead of the page.

### Connect it in `router.jsx`
```jsx
{ path: ":id", element: <ProductDetail />, loader: productLoader }
```

### Read it in the component
```jsx
const product = useLoaderData();
```
`useLoaderData()` gives exactly what the loader returned. No `useState`, no `useEffect`, no loading flag.

In a real app the loader would do `await fetch("/api/products/" + params.id)`.

---

## 11. `useSearchParams` - the `?q=...` part of the URL

URL: `/products?q=mouse&category=Home`

`q` and `category` are **search params**. `useSearchParams` works like `useState`, but the value lives **in the URL**.

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const q = searchParams.get("q") ?? "";            // "mouse", or "" if missing
const category = searchParams.get("category") ?? "All";
```
- `searchParams.get("q")` reads a value.
- `?? ""` gives a default when it's missing (`null`).

Filter during render (no extra state needed):
```jsx
const visible = products.filter(
  (p) =>
    p.name.toLowerCase().includes(q.toLowerCase()) &&
    (category === "All" || p.category === category),
);
```

Updating:
```jsx
const update = (key, value) => {
  const next = new URLSearchParams(searchParams); // copy the current params
  if (value && value !== "All") next.set(key, value); // add/change
  else next.delete(key);                               // remove if empty
  setSearchParams(next);                               // changes the URL
};
```
Used as: `onChange={(e) => update("q", e.target.value)}`.

**Why use the URL instead of `useState`?**
- Refresh keeps the filter.
- You can copy the link and share the exact filtered view.
- Back button goes to the previous filter.

### Links with dynamic URLs
```jsx
<Link to={`/products/${p.id}`}>{p.name}</Link>
```
Template string builds `/products/1`, `/products/2`...

---

## 12. Errors and 404

### 404 page (URL doesn't exist)
`path: "*"` -> `NotFound.jsx`, a simple message with `<Link to="/">`.

### `errorElement` (something went wrong)
```jsx
const error = useRouteError();
const message = isRouteErrorResponse(error)
  ? `${error.status} - ${error.data}`   // our thrown Response: 404 - Product not found
  : "Something went wrong";             // any other crash
```
- `useRouteError()` gives the thing that was thrown.
- `isRouteErrorResponse(error)` is `true` if it was a `Response` (like our 404).
- Put `errorElement` on the top route, so it catches errors from all children. Try `/products/99` to see it.

---

## 13. PRIVATE ROUTES (protected routes)

**Goal:** `/dashboard` only for logged-in users. `/admin` only for admins.

### 13.1 Who is logged in? `AuthContext.jsx`
```jsx
const [user, setUser] = useState(null);   // null = nobody logged in

const login = (email, password) => {
  const found = USERS.find((u) => u.email === email && u.password === password);
  if (!found) return false;
  setUser({ email: found.email, role: found.role });
  return true;
};
const logout = () => setUser(null);
```
- Normal Context API (same as your TaskContext).
- `user` is `null` or `{ email, role }`.
- `useAuth()` is a small shortcut: `export const useAuth = () => useContext(AuthContext);`
- Here users are hard-coded. A real app asks the backend and gets a token.

### 13.2 The guard: `ProtectedRoute.jsx`
```jsx
const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};
```
Line by line:
1. Get `user` from context.
2. `useLocation()` = info about the current URL (`pathname`, `search`, `state`).
3. **Not logged in?** Redirect to `/login`.
   - `state={{ from: location }}` carries a note: "they wanted to visit this page" (so we can send them back after login).
   - `replace` so Back doesn't return to the blocked page.
4. **Logged in but wrong role?** (`role` prop given and doesn't match) go to `/unauthorized`.
5. **All good?** `return <Outlet />` -> show the protected child page.

### 13.3 Use it in `router.jsx`
```jsx
{
  element: <ProtectedRoute />,                       // no path = only a guard
  children: [{ path: "dashboard", element: <Dashboard /> }],
},
{
  element: <ProtectedRoute role="admin" />,          // admin only
  children: [{ path: "admin", ... }],
},
```
A route with **no `path`** only wraps its children. Everything inside the `children` list is protected. To protect more pages, just add them to that list.

### 13.4 Send them back after login: `Login.jsx`
```jsx
const location = useLocation();
const from = location.state?.from?.pathname || "/dashboard";

if (user) return <Navigate to={from} replace />;   // already logged in

const submitHandler = (e) => {
  e.preventDefault();
  if (login(email, password)) navigate(from, { replace: true });
  else setError("Wrong email or password");
};
```
- `location.state.from` is the note the guard left. `?.` avoids a crash if it's missing (user opened `/login` directly).
- `|| "/dashboard"` = default destination.
- After a successful `login()`, go to `from`.

### Full flow
```
1. Logged out, open /dashboard
2. ProtectedRoute: no user -> redirect to /login (note: from=/dashboard)
3. Enter email + password -> login() succeeds
4. navigate("/dashboard") -> Dashboard shows
5. Logged in as normal user, open /admin -> /unauthorized
6. Logged in as admin -> /admin works
```

### 13.5 `Dashboard.jsx`
```jsx
const { user } = useAuth();
<p>Welcome, {user.email}</p>
```
We can use `user.email` without checking `null` because the guard guarantees someone is logged in.

> **VERY IMPORTANT:** A frontend guard only improves the experience. Anyone can change frontend code. **Real security is the backend** checking the token/role on every API request. Never trust the frontend.
>
> In this demo `user` is in memory, so refreshing logs you out. A real app saves the token (cookie / localStorage) and restores it when the page loads.

---

## 14. Forms with `<Form>` and `action`: `Contact.jsx`

Normal React form: `useState` for each field + `onSubmit` + `preventDefault`.
Router way: let the router handle it.

```jsx
export const contactAction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  if (!data.message?.trim()) return { error: "Message is required" };
  console.log("Contact form:", data);
  return redirect("/?sent=1");
};
```
- An **action** is a function that runs when a `<Form method="post">` is submitted.
- `request.formData()` holds all inputs, keyed by their `name` attribute.
- `Object.fromEntries(...)` turns it into a plain object `{ email, message }`.
- Return an object for an error, or `redirect("/somewhere")` after success.

```jsx
<Form method="post">
  <input name="email" />
  <textarea name="message" />
  <button disabled={sending}>{sending ? "Sending..." : "Send"}</button>
</Form>
```
- Capital-F `Form` from react-router (not the HTML `form`).
- Inputs need a `name`. They don't need `value`/`onChange`.
- Connect in `router.jsx`: `{ path: "contact", element: <Contact />, action: contactAction }`.
- `useNavigation().state === "submitting"` tells us the form is being sent (to disable the button).

(To show the returned error, read it with `useActionData()`.)

---

## 15. Lazy loading: `Admin.jsx`

Normally all pages are in one big JS file. Lazy loading downloads a page **only when it is visited**.

```jsx
{
  path: "admin",
  lazy: async () => ({
    Component: (await import("./pages/Admin")).default,
  }),
}
```
- `import("./pages/Admin")` loads the file on demand.
- `.default` is the component exported by that file.
- After `npm run build` you'll see a separate `Admin-xxxx.js` file.

Use it for big or rarely visited pages.

---

## 16. All hooks and components in one table

| Name | Use it for | Where in this project |
| --- | --- | --- |
| `createBrowserRouter` | Build the route table | `router.jsx` |
| `RouterProvider` | Run the router | `main.jsx` |
| `Outlet` | Place where child pages appear | `Layout`, `ProtectedRoute` |
| `Link` | Click to navigate | everywhere |
| `NavLink` | Link with active styling | `Layout` |
| `Navigate` | Redirect during render | `ProtectedRoute`, `Login` |
| `useNavigate` | Navigate from code | `Login`, `ProductDetail` |
| `useParams` | Read `:id` | loader receives `params` |
| `useLocation` | Current URL + `state` | `ProtectedRoute`, `Login` |
| `useSearchParams` | Read/write `?q=` | `Products` |
| `useLoaderData` | Get the loader's data | `ProductDetail` |
| `useActionData` | Get the action's returned data | (for form errors) |
| `useNavigation` | idle / loading / submitting | `Layout`, `Contact` |
| `useRouteError` | Read the error | `ErrorPage` |
| `Form` | Form handled by an action | `Contact` |
| `redirect` | Redirect from loader/action | `Contact` action |
| `loader` | Fetch before render | `ProductDetail` |
| `action` | Handle form submit | `Contact` |
| `errorElement` | Error page | top route |
| `lazy` | Load page on demand | `/admin` |
| `path: "*"` | 404 | last route |

---

## 17. Common mistakes

1. Using `<a href="/about">` instead of `<Link>` -> page reloads, state lost.
2. Forgetting `<Outlet />` in a layout -> child pages don't show.
3. Writing `path: "/about"` for a child. Write `"about"`.
4. Expecting `params.id` to be a number. It is a string.
5. Using `navigate()` during render. Use `<Navigate />` there.
6. No `replace` on redirects -> Back button goes back to the blocked page.
7. Using router hooks outside `RouterProvider` -> error.
8. Putting context providers *inside* the router, so pages can't see them. Put them outside.
9. Trusting the private route for security. The backend must check too.
10. After deploying, refreshing `/products/3` gives 404. The host must serve `index.html` for every URL.

---

## 18. Practice

1. Add a page `/profile` that only logged-in users can open.
2. Add `/products/:id/reviews` as a child of the product page.
3. Make `/admin` show a list of users (hint: loader).
4. Add `?sort=price` to the products page.
5. Open `/products/99` and `/random`. Explain why each one shows a different page.
