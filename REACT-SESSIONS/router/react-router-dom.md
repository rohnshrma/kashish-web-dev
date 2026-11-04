# React Router (react-router-dom) - concise guide

React is a single page. Router makes it *feel* like many pages: it watches the URL and decides which component to render, **without a page reload**.

Everything below is implemented in this folder. Run it: `npm install && npm run dev`
Login with `user@test.com / 123` or `admin@test.com / 123`.

> Version: v7. `react-router-dom` re-exports everything from `react-router`, so the imports you see in tutorials still work.

---

## 1. Setup

```bash
npm i react-router-dom
```

**Data router (what we use)** - `createBrowserRouter` + `RouterProvider`. Needed for loaders, actions and `errorElement`.

```jsx
// main.jsx
<RouterProvider router={createBrowserRouter([...routes])} />
```

*Implemented in:* `src/main.jsx`, `src/router.jsx`

The older **declarative** style does the same job for simple apps:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

Same ideas, different syntax. Pick one per app.

---

## 2. Cheat sheet

| Thing | What it does | Example |
| --- | --- | --- |
| `path` + `element` | URL -> component | `{ path: "about", element: <About /> }` |
| `index: true` | Default child, renders at the parent's URL | `{ index: true, element: <Home /> }` |
| `children` | Nested routes (paths are joined) | `/products` + `:id` = `/products/3` |
| `<Outlet />` | Where the matched child renders inside a parent | `Layout.jsx` |
| `<Link to>` | Navigate without reload (replaces `<a>`) | `<Link to="/about">` |
| `<NavLink to>` | `Link` that knows if it is active | `style={({isActive}) => ...}`; add `end` for `/` |
| `:id` | Dynamic segment, read with `useParams()` | `/products/:id` |
| `useParams()` | `{ id: "3" }` (always a string) | |
| `useNavigate()` | Navigate from code | `navigate("/dashboard", { replace: true })`, `navigate(-1)` |
| `<Navigate to>` | Redirect while rendering | `<Navigate to="/login" replace />` |
| `useLocation()` | Current `pathname`, `search`, and `state` | read `location.state.from` |
| `useSearchParams()` | The `?q=abc` part, like `useState` in the URL | `Products.jsx` |
| `path: "*"` | Catch-all = 404 page | `NotFound.jsx` |
| `loader` + `useLoaderData()` | Fetch data **before** the page renders | `ProductDetail.jsx` |
| `action` + `<Form>` | Handle form submit without `onSubmit`/state | `Contact.jsx` |
| `redirect()` | Redirect from a loader/action | `return redirect("/")` |
| `errorElement` + `useRouteError()` | Error/404 UI for a route | `ErrorPage.jsx` |
| `useNavigation()` | `"idle" / "loading" / "submitting"`, for spinners | `Layout.jsx`, `Contact.jsx` |
| `lazy` | Load a page's code only when visited | `/admin` in `router.jsx` |

---

## 3. How each piece is implemented

### Layout route + `Outlet` (`components/Layout.jsx`)
The parent route renders the navbar and an `<Outlet />`. Every child page appears at the outlet, so the navbar is written once.

### Index and nested routes (`router.jsx`)
`products` has two children: the index (`/products`, the list) and `:id` (`/products/3`, the detail).

### Active links (`Layout.jsx`)
`NavLink` passes `{ isActive }` to `style`/`className`. `end` on `/` stops Home from being active everywhere.

### Dynamic params + loader (`pages/ProductDetail.jsx`)
```jsx
export const productLoader = ({ params }) => {
  const product = getProduct(params.id);
  if (!product) throw new Response("Product not found", { status: 404 });
  return product;
};
const product = useLoaderData();
```
The loader runs first, so the component always has its data (no `useEffect`, no loading flag). Throwing sends the user to `errorElement`.

### Search params (`pages/Products.jsx`)
`?q=lamp&category=Home` is the single source of truth for the filters. The filtered list can be bookmarked, shared, and survives a refresh and the Back button.

### Form + action (`pages/Contact.jsx`)
`<Form method="post">` + a route `action` receives `request.formData()`. Return an object for errors or `redirect()` on success.

### Error and 404 (`ErrorPage.jsx`, `NotFound.jsx`)
- `path: "*"` shows 404 for unknown URLs.
- `errorElement` shows errors thrown by loaders, actions or components (`useRouteError`, `isRouteErrorResponse`).

### Lazy loading (`router.jsx`)
```jsx
lazy: async () => ({ Component: (await import("./pages/Admin")).default })
```
The build creates a separate `Admin-xxxx.js` file, downloaded only when `/admin` is opened.

---

## 4. Private (protected) routes

Idea: a **guard** component that checks login. If allowed it renders `<Outlet />`, otherwise it redirects.

```jsx
// components/ProtectedRoute.jsx
const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
};
```

Use it as a **pathless layout route** so it protects a whole group:

```jsx
{ element: <ProtectedRoute />,            children: [{ path: "dashboard", element: <Dashboard /> }] },
{ element: <ProtectedRoute role="admin" />, children: [{ path: "admin", ... }] },
```

**Redirect back after login** (`pages/Login.jsx`): the guard saves where the user wanted to go in `state.from`; `Login` reads it with `useLocation()` and calls `navigate(from, { replace: true })`.

Auth state (`context/AuthContext.jsx`) is plain Context API: `user`, `login`, `logout`. `AuthContextProvider` wraps `RouterProvider` in `main.jsx`, so guards and pages can all call `useAuth()`.

Flow:
```
visit /dashboard (logged out) -> guard -> /login (state.from = /dashboard)
login success -> navigate("/dashboard", { replace: true })
logged in as user -> /admin -> /unauthorized
```

> **Important:** a route guard is **UX only**. Anyone can edit frontend code. The backend must check the token / role on every protected API request.
>
> Our demo keeps `user` in memory, so a refresh logs you out. A real app stores the token (cookie or `localStorage`) and restores it on load.

---

## 5. Common mistakes

- `<a href>` instead of `<Link>` -> full page reload, state lost.
- Forgetting `<Outlet />` in a layout -> child pages never show.
- Leading `/` in a child path (`"/about"`) makes it absolute, so skip it for children.
- `useParams()` values are strings: `"3" !== 3`.
- Using `useNavigate` to redirect during render. Use `<Navigate>` in render, `navigate()` in handlers.
- Forgetting `replace` on login/guard redirects, so Back bounces to the guard.
- Putting the router hooks outside `RouterProvider` / `BrowserRouter`.
- On deploy, a static host must serve `index.html` for every URL, or refreshing `/products/3` gives 404.
