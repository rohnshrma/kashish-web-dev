# Food Order App: React SPA Frontend (Admin + User)

**Stack:** React (Vite), React Router, Axios, Context API (+ `useReducer` where it helps)
**Backend:** the Food Order API in `../backend` (Express, MongoDB, JWT)
**Time:** 16 hours, 5 phases
**Roles:** `admin` (restaurant owner), `user` (customer). One app, two experiences, chosen by `user.role`.

A single-page app for the Food Order API. A customer browses the menu, fills a cart and places a **dine-in** (books a table) or **delivery** (gives an address) order. The admin manages the menu, tables and orders from a dashboard.

Follow the code pattern from `REACT-SESSIONS/tdl`: function components with default exports, state shared through a Context provider wrapped in `main.jsx`, small components that read context with a custom hook, one component per file.

---

## Folder Structure

```
frontend/
├── index.html
├── package.json
├── .env                      # VITE_API_URL=http://localhost:5000/api
├── .env.example
└── src/
    ├── main.jsx              # wraps <App/> in the providers + <BrowserRouter>
    ├── App.jsx               # route table
    ├── api/
    │   └── axios.js          # axios instance + token interceptor
    ├── context/
    │   ├── AuthContext.jsx   # user, token, login, register, logout
    │   ├── CartContext.jsx   # cart, add/update/remove/clear, total
    │   └── MenuContext.jsx   # menu list + filters (optional)
    ├── routes/
    │   ├── ProtectedRoute.jsx   # must be logged in
    │   └── RoleRoute.jsx        # must have a given role
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Loader.jsx
    │   ├── ErrorMessage.jsx
    │   ├── MenuCard.jsx
    │   ├── MenuFilters.jsx
    │   ├── Pagination.jsx
    │   ├── CartItem.jsx
    │   ├── OrderCard.jsx
    │   └── StatusBadge.jsx
    └── pages/
        ├── Home.jsx
        ├── Login.jsx
        ├── Register.jsx
        ├── Menu.jsx
        ├── Cart.jsx
        ├── Checkout.jsx
        ├── MyOrders.jsx
        ├── OrderDetail.jsx
        ├── Profile.jsx
        ├── NotFound.jsx
        └── admin/
            ├── Dashboard.jsx
            ├── ManageMenu.jsx
            ├── ManageCategories.jsx
            ├── ManageTables.jsx
            ├── AdminOrders.jsx
            ├── AdminOrderDetail.jsx
            └── AdminUsers.jsx
```

**Rule of thumb:** pages fetch and compose, components only display, context holds shared state, `api/axios.js` is the only place that knows the base URL.

---

## Backend Contract (what the frontend talks to)

Every request goes through the axios instance. Send `Authorization: Bearer <token>` on protected routes.

| Area | Endpoints |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `GET/PUT /auth/me`, `POST /auth/me/addresses`, `DELETE /auth/me/addresses/:id` |
| Categories | `GET /categories`; admin: `POST`, `PUT /:id`, `DELETE /:id` |
| Menu | `GET /menu` (`category, isVeg, search, minPrice, maxPrice, page, limit, sort`), `GET /menu/:id`; admin: `POST`, `PUT /:id`, `PATCH /:id/availability`, `DELETE /:id` |
| Tables | admin: `GET/POST /tables`, `PUT/DELETE /tables/:id`; user: `GET /tables/available?guests=&time=` |
| Cart (user) | `GET /cart`, `POST /cart`, `PUT /cart/:menuItemId`, `DELETE /cart/:menuItemId`, `DELETE /cart` |
| Orders (user) | `POST /orders`, `GET /orders/my`, `GET /orders/:id`, `PATCH /orders/:id/cancel` |
| Admin | `GET /admin/orders`, `GET /admin/orders/:id`, `PATCH /admin/orders/:id/status`, `PATCH /admin/orders/:id/payment`, `GET /admin/stats`, `GET /admin/users`, `GET /admin/users/:id/orders` |

> Check the real response shape in Postman before writing each context function (for example whether the list sits under `data`, `menu` or `items`). Write the shape you find in a comment above the function.

---

## Phase 1: Setup, Routing and Auth (4 hrs)

### Task 1.1: Project setup (0.5 hr)
1. `npm create vite@latest frontend -- --template react`, then `npm i axios react-router-dom`.
2. Create the folders above. Delete the Vite starter CSS and demo code.
3. Add `.env` with `VITE_API_URL` and commit `.env.example`. Keep `.env` in `.gitignore`.
4. Make sure the backend allows your Vite origin in CORS.

### Task 1.2: Axios instance (0.5 hr)
`api/axios.js`:
1. `axios.create({ baseURL: import.meta.env.VITE_API_URL })`.
2. Request interceptor: read the token from `localStorage` and set the `Authorization` header.
3. Response interceptor: on `401`, clear the stored token and user and send the person to `/login`.

### Task 1.3: AuthContext (1.5 hrs)
State: `user`, `token`, `loading` (true while restoring the session).
1. On first load, if a token exists in `localStorage`, call `GET /auth/me` to restore `user`. On failure, clear everything.
2. `login(email, password)`: call the API, store the token, set `user`.
3. `register(data)`: call the API, then log in (or store the returned token).
4. `logout()`: clear token, user and the cart.
5. Export a `useAuth()` hook and an `isAdmin` boolean.
6. Never store the password anywhere. Only the token (and optionally the user object) goes in `localStorage`.

### Task 1.4: Routing and guards (1 hr)
1. `main.jsx`: `<BrowserRouter>` → `<AuthProvider>` → `<CartProvider>` → `<App />`.
2. `ProtectedRoute`: if `loading` show `<Loader />`; if no user, `<Navigate to="/login" />` and remember where they came from.
3. `RoleRoute role="admin"`: if the role does not match, redirect to `/` (or show a 403 page).
4. Route table in `App.jsx`:

| Path | Page | Access |
|---|---|---|
| `/` | Home | public |
| `/login`, `/register` | Login, Register | public (redirect away if logged in) |
| `/menu` | Menu | public |
| `/cart`, `/checkout` | Cart, Checkout | user |
| `/orders`, `/orders/:id` | MyOrders, OrderDetail | user |
| `/profile` | Profile | logged in |
| `/admin` and `/admin/*` | admin pages | admin |
| `*` | NotFound | public |

### Task 1.5: Login and Register pages (0.5 hr)
- Controlled forms. Show the backend `message` on failure (`err.response?.data?.message`).
- Disable the submit button while the request is running.
- After login, send an admin to `/admin` and a user to `/menu`.
- Do **not** send a `role` field on register.

### Check: Phase 1
- Refresh the page while logged in: you stay logged in.
- Open `/cart` logged out: redirected to `/login`.
- Log in as a user and open `/admin`: you are kept out.
- Wrong password shows the backend's "Invalid credentials" message.

**Done when:** a person can register, log in, refresh, log out, and the guards hold.

---

## Phase 2: Menu Browsing, Public Side (3 hrs)

### Task 2.1: Navbar (0.5 hr)
- Logged out: Menu, Login, Register.
- User: Menu, Cart (with item count badge), My Orders, Profile, Logout.
- Admin: Dashboard, Menu, Categories, Tables, Orders, Users, Logout.

### Task 2.2: Menu page (1.5 hrs)
1. Fetch `GET /menu` and `GET /categories` on load.
2. `MenuFilters`: category dropdown, veg-only toggle, search box, min/max price, sort (`price` / `-price`).
3. **Debounce** the search box (about 400 ms) so you do not hit the API on every key.
4. `Pagination` component driven by `page` and `limit`; keep the filters in the URL query string so a refresh keeps them.
5. `MenuCard`: image, name, price, veg/non-veg marker, prep time, "Add to cart" button.
6. States: loading, error, and an empty "No dishes found" message.

### Task 2.3: Menu item detail (0.5 hr)
Open `GET /menu/:id` in a modal or at `/menu/:id`. Show description and a quantity picker.

### Task 2.4: Add to cart from the menu (0.5 hr)
- Logged out: send to `/login`.
- Admin: hide the button (admins have no cart).
- Show a small success or error message; do not use `alert()`.

### Check: Phase 2
- Each filter narrows the list; combined filters work together.
- Page 2 loads and the URL reflects it.
- A sold-out item set by admin no longer appears for users.

**Done when:** anyone can browse and filter the menu.

---

## Phase 3: Cart and Checkout (3.5 hrs)

### Task 3.1: CartContext (1 hr)
State: `cart`, `loading`, `error`. Load the cart when a `user` (role `user`) is present; clear it on logout.
- `fetchCart()`, `addToCart(menuItemId, quantity)`, `updateQuantity(menuItemId, quantity)` (0 removes), `removeItem(menuItemId)`, `clearCart()`.
- After each write, update state from the response (or refetch) so the UI never drifts from the server.
- Derive `itemCount` and `total` from the cart; the **server** total is the one that counts at checkout.
- Export `useCart()`.

### Task 3.2: Cart page (1 hr)
- `CartItem`: name, price, quantity stepper (+ / −), remove button, line total.
- Show subtotal and a "Proceed to checkout" button. Disable it when the cart is empty.
- Empty state with a link to `/menu`.
- Show a clear message when the server rejects an item as unavailable.

### Task 3.3: Checkout page (1.5 hrs)
1. A toggle for **order type**: `dine-in` or `delivery`.
2. **Dine-in** fields: number of guests, reservation date and time, and a table picker loaded from `GET /tables/available?guests=&time=`. Reload the tables whenever guests or time change. Block past times.
3. **Delivery** fields: pick a saved address or type a new one (`street`, `city`, `pincode`, `phone`). Offer "save this address" which calls `POST /auth/me/addresses`.
4. Payment method: `cash` or `online`.
5. Show a **preview** only (subtotal, 5% tax, delivery fee 40, free above ₹500). Label it as an estimate; the server recalculates.
6. Submit `POST /orders`. Send only what the contract needs, never totals.
7. On success: clear the cart in context and go to `/orders/:id`. On failure show the backend message (table taken, capacity too small, etc.).

### Check: Phase 3
- Add, change quantity, remove and clear all work and survive a refresh.
- Dine-in with too many guests shows the backend error.
- Delivery without an address is blocked in the form and by the server.
- After a successful order the cart badge shows 0.

**Done when:** a user can go from menu to a placed order of either type.

---

## Phase 4: My Orders and Profile (2.5 hrs)

### Task 4.1: My Orders (1 hr)
- `GET /orders/my` with filters for status and order type.
- `OrderCard`: id, date, type, `StatusBadge`, total, "View" link. Newest first.

### Task 4.2: Order detail (1 hr)
- `GET /orders/:id`: items (snapshot name and price), subtotal, tax, fee, total, payment status, and the table or delivery address depending on type.
- A status **timeline** that shows the right steps for dine-in versus delivery.
- "Cancel order" button, shown **only** while the status is `placed`. Confirm with an inline "Are you sure?" step (no `window.confirm`). Show the backend message on failure.
- Add a manual "Refresh" button, or poll every 20-30 seconds while the order is not finished (and clean up the interval in the effect).

### Task 4.3: Profile (0.5 hr)
- Edit name and phone (`PUT /auth/me`).
- List, add and delete saved addresses.

### Check: Phase 4
- Someone else's order id in the URL shows a proper "not allowed" message, not a blank screen.
- Cancel disappears once the admin moves the order to `confirmed`.

**Done when:** a user can follow and manage their own orders.

---

## Phase 5: Admin Panel and Polish (3 hrs)

### Task 5.1: Dashboard (0.5 hr)
`GET /admin/stats`: cards for total orders, orders today, revenue today and total; lists for orders by type and by status; a top 5 selling items table.

### Task 5.2: Manage menu and categories (1 hr)
- **Menu table** with all items (including unavailable), an availability toggle (`PATCH /menu/:id/availability`), edit and delete.
- Add/edit form in a modal or on its own page: name, description, price, category, image URL, veg flag, preparation time.
- **Categories:** list, create, rename, delete. Show the backend message when delete is blocked because items still use it.

### Task 5.3: Manage tables (0.5 hr)
List with number, capacity, status. Create, edit, delete. Disable delete for `reserved` / `occupied` tables.

### Task 5.4: Admin orders (1 hr)
1. List with filters (status, type, date) and pagination.
2. Detail page with customer info.
3. Show **only the next valid status** as the action button (for example a dine-in order in `ready` offers "Mark served"). The backend still enforces it; the UI just should not offer invalid jumps.
4. "Mark cash as paid" button for cash orders.
5. Cancel allowed only from `placed` / `confirmed`.

### Task 5.5: Users (optional, 0.25 hr)
List users and open one user's orders.

### Task 5.6: Polish (0.75 hr)
- One shared `Loader`, `ErrorMessage` and empty-state style across the app.
- Responsive layout that works on a phone width.
- No `console.log` left in finished code.
- Fix every ESLint warning (`npm run lint`).
- `npm run build` passes.

### Check: Phase 5
- User token cannot reach any admin page; admin token cannot reach the cart.
- Walk one dine-in and one delivery order through every status from the admin panel, and watch it update on the user's order page.
- Completing a dine-in order makes the table `available` again in Manage Tables.
- Dashboard numbers match the orders you created.

**Done when:** the admin can run the restaurant from the UI alone.

---

## Time Split

| Phase | Hours |
|---|---|
| 1. Setup, Routing, Auth | 4 |
| 2. Menu Browsing | 3 |
| 3. Cart and Checkout | 3.5 |
| 4. My Orders and Profile | 2.5 |
| 5. Admin Panel and Polish | 3 |
| **Total** | **16** |

## Screen Access Summary

| Screen | Public | User | Admin |
|---|---|---|---|
| Home, Menu | ✅ | ✅ | ✅ |
| Login / Register | ✅ | redirect | redirect |
| Cart, Checkout | ❌ | ✅ | ❌ |
| My Orders, Order detail | ❌ | ✅ | ❌ |
| Profile | ❌ | ✅ | ✅ |
| Dashboard, Manage menu / categories / tables | ❌ | ❌ | ✅ |
| Admin orders, Users | ❌ | ❌ | ✅ |

## Submission Checklist
- [ ] Runs with `npm run dev` against the backend; API URL only in `.env`
- [ ] `.env` in `.gitignore`, `.env.example` committed
- [ ] Context, api, routes, components and pages are separated as in the folder structure
- [ ] No hard-coded API URLs or tokens outside `api/axios.js` and `AuthContext`
- [ ] Every page handles loading, error and empty states
- [ ] `npm run lint` and `npm run build` pass
- [ ] One commit per phase
