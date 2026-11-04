# Part 2: Add React Router to your Inventory Manager

> Do this **only after** the main assignment (`assignment.md`) is complete and pushed. The assignment bans routing on purpose; this is the follow-up.
> Concepts reference: `../router/react-router-dom.md`. Working demo (blog app): `../router/`.

## Goal

Turn the single page into a multi-page app with real URLs, and protect the edit actions behind a login.

| URL | Page | Access |
| --- | --- | --- |
| `/` | Inventory list + summary | public |
| `/products/:id` | One product's details | public |
| `/login` | Login form | public |
| `/products/new` | Add product form | **private** |
| `/products/:id/edit` | Edit product form | **private** |
| `*` | 404 page | public |

## What changes in your design

| Before (assignment) | After (router) |
| --- | --- |
| `editingProduct` state in context | The URL: `/products/:id/edit` says which product is edited |
| `startEditing`, `cancelEditing` | `<Link to=".../edit">` and `navigate("/")` |
| Form shown always on the same page | Form is its own page |
| `LOAD` reducer action + `key` trick | Read `id` with `useParams()`, find the product, initialise the form from it |

Keep: `InventoryContext` (products + `addProduct`, `updateProduct`, `deleteProduct`, `changeQuantity`), the form `useReducer`, validation, low-stock styling.

## Folder structure

```
src/
├── main.jsx
├── App.jsx                     <- route table (Routes / Route)
├── InventoryContext.jsx
├── AuthContext.jsx             <- NEW: user, login, logout
└── Components/
    ├── Layout.jsx              <- NEW: Header + <Outlet />
    ├── ProtectedRoute.jsx      <- NEW: private route guard
    ├── Header.jsx
    ├── ProductForm.jsx
    ├── ProductList.jsx
    └── ProductItem.jsx
└── pages/                      <- NEW
    ├── InventoryPage.jsx       (summary + ProductList)
    ├── ProductDetailPage.jsx
    ├── AddProductPage.jsx
    ├── EditProductPage.jsx
    ├── LoginPage.jsx
    └── NotFoundPage.jsx
```

## Steps

### Step 1: Install and set up
```bash
npm i react-router-dom
```
`main.jsx`: wrap everything in `BrowserRouter`, then the providers:
```jsx
<BrowserRouter>
  <AuthContextProvider>
    <InventoryContextProvider>
      <App />
    </InventoryContextProvider>
  </AuthContextProvider>
</BrowserRouter>
```

### Step 2: Layout with `Outlet`
`Layout` renders `Header` (with `NavLink`s: Inventory, Add Product, Login/Logout) and `<Outlet />`. Move the header summary here.

### Step 3: Route table (`App.jsx`)
```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<InventoryPage />} />
    <Route path="products/:id" element={<ProductDetailPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>             {/* guard for the group below */}
      <Route path="products/new" element={<AddProductPage />} />
      <Route path="products/:id/edit" element={<EditProductPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```
React Router ranks routes by specificity, so `products/new` wins over `products/:id`.

### Step 4: Auth + private route
1. `AuthContext` with `user` (starts `null`), `login(email, password)` (compare to a hard-coded user, e.g. `admin@shop.com / 123`) and `logout()`.
2. `ProtectedRoute`: if no `user`, `return <Navigate to="/login" state={{ from: location }} replace />`; otherwise `return <Outlet />`.
3. `LoginPage`: on success `navigate(location.state?.from?.pathname || "/", { replace: true })`. Show an error message on failure.
4. In `Header`: show "Add Product" and "Logout" only when `user` exists, "Login" otherwise.
5. In `ProductItem`: show **Edit**, **Delete**, **+**, **-** only when `user` exists. Everyone can see the list.

### Step 5: Pages
- `InventoryPage`: `ProductList`. `ProductItem` gets a `<Link to={`/products/${product.id}`}>` on the name, and Edit becomes `<Link to={`/products/${product.id}/edit`}>`.
- `ProductDetailPage`: `const { id } = useParams()`, find the product from context. If not found, show "Product not found" with a link back.
- `AddProductPage`: renders `ProductForm`; after `addProduct(...)` call `navigate("/")`.
- `EditProductPage`: find the product by `id`, then render `<ProductForm key={id} product={product} />`. Initialise the reducer from the `product` prop (this is the same `key` idea from the Edit hint, now for free). After `updateProduct(...)` call `navigate("/")`. Missing product -> "Product not found".
- `ProductForm`: add mode when no `product` prop, edit mode when present. "Cancel" is `navigate(-1)` or `<Link to="/">`.

### Step 6: Search and filter in the URL (bonus replaced)
Move the search text and category filter from `useState` to `useSearchParams` (`/?q=mouse&category=Electronics`). Filter during render as before. The filtered list is now shareable.

### Step 7: 404
`path: "*"` page with a link back to `/`.

## Rules for Part 2

| Allowed | Still not allowed |
| --- | --- |
| `react-router-dom`: `BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`, `NavLink`, `Navigate`, `useNavigate`, `useParams`, `useLocation`, `useSearchParams` | `useEffect`, `fetch`, `localStorage` |
| Everything from the main assignment | `createBrowserRouter`, loaders, actions (later, with real APIs) |

## Checklist

- [ ] Every page has its own URL; Back/Forward and refresh on `/products/2` work
- [ ] Navbar highlights the current page (`NavLink`)
- [ ] Logged out: visiting `/products/new` redirects to `/login`; after login you land on `/products/new`
- [ ] Logged out: no Edit / Delete / +/- buttons visible
- [ ] Editing works through `/products/:id/edit`; no `editingProduct` state left in context
- [ ] Unknown product id and unknown URL show a friendly message
- [ ] Search / category filter lives in the URL
- [ ] No topics from the "Still not allowed" column used

## Questions (add to `answers.md`)

1. Why is `editingProduct` state no longer needed once the URL has the product id?
2. What does `<Outlet />` do in `Layout`?
3. Why does `ProtectedRoute` pass `state={{ from: location }}`, and what happens without it?
4. Why `replace` on the login redirect?
5. A user hides the Edit button with devtools / types `/products/1/edit` after logging out of the UI. What actually stops them in a real app, and why is the route guard not enough?
6. Why must `BrowserRouter` wrap the whole app?
