# Assignment: Food Order App (React SPA with Context API)

## Goal

Build the **frontend** for the Food Order API (see `../backend/food_order_api_assignment.md`) as a single-page React app, using the same style as our **intro** and **tdl** apps.

There are two kinds of people using the app:

- **User (customer):** sees the menu, fills a cart, places a **dine-in** (books a table) or **delivery** (gives an address) order, and tracks their orders.
- **Admin (restaurant owner):** manages the menu, categories, tables and orders.

One app, two sets of screens. Which set you see depends on the `role` the backend sends after login.

---

## Rules: use only what we have covered

| Allowed | Not allowed (not covered yet) |
| --- | --- |
| Components, JSX, props, `children` | `useEffect`, `useRef`, `useMemo` |
| `.map()` with `key`, `.filter()`, spread `...` | React Router or any routing library |
| `useState` | `localStorage`, `sessionStorage` |
| Events (`onClick`, `onChange`, `onSubmit`) | Redux or any state library |
| Controlled forms (`value` + `onChange`) | UI libraries (MUI, Bootstrap, etc.) |
| `useReducer` with `dispatch({ type, payload })` | Custom hooks |
| `createContext`, a Provider, `useContext` | Debounce, polling, `setInterval` |
| Inline styles / conditional styles | |
| Conditional rendering (`&&`, ternary, early `return`) | |

**One new thing is allowed, because the backend needs it:** `axios` (or `fetch`) to call the API using `async / await` inside event handlers. Nothing else is new.

> Data does **not** need to survive a page refresh. After a refresh the person simply logs in again. Keep the token in state (inside the context), not in the browser storage.

---

## How do we move between screens without a router?

We do not have React Router, so keep **one state value** called `page` (for example `"menu"`, `"cart"`, `"checkout"`, `"orders"`, `"admin-orders"`). `App` reads it and shows the matching component using conditional rendering.

```
const { page } = useContext(NavContext);

{page === "menu" && <Menu />}
{page === "cart" && <Cart />}
```

Keep `page` and a `goTo(pageName)` function in a small `NavContext`, so any component (for example Checkout, after the order is placed) can change the screen without props drilling.

> **Hint (no `useEffect`):** normally we would load data when a screen opens. We cannot do that here, so load the data **at the moment of an event**: after login succeeds, when the person clicks a navbar link, or when they press "Apply filters". Think about which click should trigger which API call, and be ready to explain your choice.

---

## Component tree

```
main.jsx
└── NavContextProvider
    └── AuthContextProvider          ← user, token, login, register, logout
        └── CartContextProvider      ← cart + cart functions
            └── App                  ← shows one page based on `page` and `user.role`
                ├── Navbar
                ├── Login / Register
                ├── Menu
                │   ├── MenuFilters
                │   └── MenuCard
                ├── Cart
                │   └── CartItem
                ├── Checkout
                ├── MyOrders
                │   └── OrderCard
                ├── OrderDetail
                ├── Profile
                └── Admin screens
                    ├── Dashboard
                    ├── ManageMenu       (MenuForm + list)
                    ├── ManageCategories
                    ├── ManageTables
                    └── AdminOrders      (list + status buttons)
```

Folder structure to follow (same style as `tdl`):

```
food-order/frontend/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api.js                    ← axios instance with the base URL
    ├── NavContext.jsx
    ├── AuthContext.jsx
    ├── CartContext.jsx
    └── Components/
        ├── Navbar.jsx
        ├── Login.jsx
        ├── Register.jsx
        ├── Menu.jsx
        ├── MenuFilters.jsx
        ├── MenuCard.jsx
        ├── Cart.jsx
        ├── CartItem.jsx
        ├── Checkout.jsx
        ├── MyOrders.jsx
        ├── OrderCard.jsx
        ├── OrderDetail.jsx
        ├── Profile.jsx
        └── admin/
            ├── Dashboard.jsx
            ├── ManageMenu.jsx
            ├── ManageCategories.jsx
            ├── ManageTables.jsx
            └── AdminOrders.jsx
```

**Rule of thumb:** contexts hold shared data and functions, components display it, and only `api.js` knows the backend URL.

---

## What the backend gives us

Send `Authorization: Bearer <token>` on every protected call. Before you write each function, hit the endpoint once in Postman and note the exact shape of the response (is the list inside `data`? `menu`? `items`?). Write that as a comment above the function.

| Area | Endpoints |
| --- | --- |
| Auth | `POST /auth/register`, `POST /auth/login`, `GET` and `PUT /auth/me`, `POST /auth/me/addresses`, `DELETE /auth/me/addresses/:id` |
| Categories | `GET /categories`; admin: `POST`, `PUT /:id`, `DELETE /:id` |
| Menu | `GET /menu` (`category`, `isVeg`, `search`, `minPrice`, `maxPrice`, `page`, `limit`, `sort`), `GET /menu/:id`; admin: `POST`, `PUT /:id`, `PATCH /:id/availability`, `DELETE /:id` |
| Tables | admin: `GET`, `POST`, `PUT /:id`, `DELETE /:id`; user: `GET /tables/available?guests=&time=` |
| Cart (user) | `GET /cart`, `POST /cart`, `PUT /cart/:menuItemId`, `DELETE /cart/:menuItemId`, `DELETE /cart` |
| Orders (user) | `POST /orders`, `GET /orders/my`, `GET /orders/:id`, `PATCH /orders/:id/cancel` |
| Admin | `GET /admin/orders`, `PATCH /admin/orders/:id/status`, `PATCH /admin/orders/:id/payment`, `GET /admin/stats` |

> **Tip:** values from an `<input>` are always **strings**. Convert `price`, `guests`, `quantity` etc. to numbers before sending.

---

## Flow of the app (read this before coding)

### 1. Where the data lives
- `AuthContext`: `user`, `token`, and the functions `login`, `register`, `logout`.
- `CartContext`: `cart` and the functions `addToCart`, `updateQuantity`, `removeItem`, `clearCart`.
- `NavContext`: `page` and `goTo`.
- Lists like menu items or orders can stay in `useState` inside the page that shows them. Not everything needs to be in context (see the "when to use Context" part of `CONTEXT-API-EXPLAINED.md`).

### 2. Login flow
```
user types in Login form  (useReducer for email + password)
  → onSubmit → preventDefault → login(email, password) from context
  → context calls POST /auth/login, saves token + user in state
  → goTo("admin-dashboard") if role is admin, else goTo("menu")
```
Show the backend `message` if it fails (`err.response?.data?.message`). Do **not** send a `role` field while registering.

### 3. Every protected call
`api.js` only creates the axios instance. Because we have no interceptors or storage, pass the token in the call:

```
api.get("/cart", { headers: { Authorization: `Bearer ${token}` } })
```

Keep this inside the context functions so the components never touch the token.

### 4. Cart flow
```
user clicks "Add to cart" on a MenuCard
  → addToCart(menuItemId, 1) from CartContext
  → POST /cart → update `cart` state from the response
Navbar reads cart from context → shows item count
```

### 5. Checkout flow
```
user picks order type: dine-in OR delivery   (a state value + conditional rendering)
dine-in   → guests, date/time, table (load free tables on a button click: "Find tables")
delivery  → street, city, pincode, phone
payment   → cash or online
submit    → POST /orders  (send only what the backend asks for, never totals)
success   → clearCart state, goTo("orders")
failure   → show the backend message (table already booked, capacity too small, ...)
```
Show an **estimate** of tax (5%) and delivery fee (₹40, free above ₹500) but label it "estimate". The server decides the final amount.

### 6. Admin order flow
Show **only the next valid status** as a button (for a dine-in order in `ready` → "Mark served"). The backend still checks it, the UI should just not offer a wrong jump. Keep the status order in a plain object:

```
const nextStatus = {
  "dine-in":  { placed: "confirmed", confirmed: "preparing", ... },
  "delivery": { placed: "confirmed", confirmed: "preparing", ... },
};
```

---

## Step-by-step tasks

### Phase 1: Setup and Login (3 hrs)

**Task 1.1: Project setup (0.5 hr)**
1. Create a Vite + React project inside `frontend/`, same as `tdl`. Install `axios`.
2. Clean `App.jsx`, `App.css`, `index.css`.
3. Create the folders above.
4. Ask the backend developer (or check `server.js`) that CORS allows your Vite port.

**Task 1.2: `api.js` (0.25 hr)**
`axios.create({ baseURL: "http://localhost:5000/api" })`. Change the port to match your backend.

**Task 1.3: `NavContext` (0.5 hr)**
`page` (starts at `"menu"`), `goTo`. Wrap `App` in it inside `main.jsx`.

**Task 1.4: `AuthContext` (1 hr)**
`user`, `token`, `login`, `register`, `logout`. On `logout`, set both back to `null` and `goTo("login")`.

**Task 1.5: Login and Register screens (0.75 hr)**
Controlled forms with `useReducer`, error message, button disabled while the request is running.

**Check:**
- Wrong password shows "Invalid credentials".
- Admin lands on the dashboard, user lands on the menu.
- Logout brings you back to the login screen.

---

### Phase 2: Navbar and Menu (3 hrs)

**Task 2.1: Navbar (0.5 hr)**
Different links using conditional rendering:
- Not logged in: Menu, Login, Register.
- User: Menu, Cart (with count), My Orders, Profile, Logout.
- Admin: Dashboard, Menu, Categories, Tables, Orders, Logout.

**Task 2.2: Menu screen (1.5 hrs)**
1. Load categories and menu when the Menu link is clicked.
2. `MenuFilters` (controlled inputs): category dropdown, veg-only checkbox, search text, min and max price, sort.
3. Filters are applied only when the person presses **Apply** (no live search).
4. `Previous` / `Next` buttons using a `page` number in `useState`.
5. `MenuCard`: name, description, price (₹), veg or non-veg marker, preparation time, "Add to cart".
6. Show "Loading...", an error message, and "No dishes found" when the list is empty.

**Task 2.3: Add to cart rules (0.5 hr)**
- Not logged in → send to login.
- Admin → hide the button.
- Show a small message in the page for success or failure (no `alert()`).

**Task 2.4: Sold out items (0.5 hr)**
If the backend returns an item with `isAvailable: false` (admin view), show "Sold out" and disable the button.

**Check:**
- Each filter works alone and together.
- Page 2 shows different dishes.
- An item the admin marked unavailable no longer shows for a user.

---

### Phase 3: Cart and Checkout (3.5 hrs)

**Task 3.1: `CartContext` (1 hr)**
`cart`, `addToCart`, `updateQuantity` (0 removes), `removeItem`, `clearCart`. After every call, set `cart` from the server response so the screen never goes out of sync. Calculate `itemCount` from the cart array.

**Task 3.2: Cart screen (1 hr)**
- `CartItem`: name, price, `+` / `−` buttons, remove button, line total.
- Subtotal, and a "Proceed to checkout" button that is disabled when the cart is empty.
- Empty message with a button to go to the menu.

**Task 3.3: Checkout screen (1.5 hrs)**
Follow the checkout flow above. One `useReducer` can hold all the form fields; `type` is the field name, just like `AddTask` in `tdl`.

**Check:**
- Dine-in with more guests than the table capacity shows the backend message.
- Delivery with a missing address is stopped.
- After a successful order, the cart count in the Navbar becomes 0.

---

### Phase 4: My Orders and Profile (2.5 hrs)

**Task 4.1: My Orders (1 hr)**
Load `GET /orders/my` on click. `OrderCard` shows id, date, type, status, total, and a "View" button. Add two dropdowns to filter by status and type.

**Task 4.2: Order detail (1 hr)**
- Items with the name and price saved at the time of the order, tax, delivery fee, total, payment status, and the table or the address depending on the type.
- A **status timeline**: keep the list of steps in an array and `.map()` over it, highlighting the steps already done using a conditional style.
- "Cancel order" button, visible **only** when the status is `placed`. Ask "Are you sure?" with a second button on the page (do not use `window.confirm`).
- A "Refresh" button to get the latest status.

**Task 4.3: Profile (0.5 hr)**
Edit name and phone. List saved addresses with add and delete.

**Check:**
- Opening another person's order shows a clear "not allowed" message, not a blank page.
- Cancel button disappears once the admin confirms the order.

---

### Phase 5: Admin Screens (3 hrs)

**Task 5.1: Dashboard (0.5 hr)**
Show `GET /admin/stats` as simple cards and lists: total orders, orders today, revenue today and total, orders by type, orders by status, top 5 items.

**Task 5.2: Manage menu and categories (1 hr)**
- List all items with an availability toggle, Edit and Delete.
- Menu form (add and edit in the same form, like `ProductForm` in the inventory assignment): name, description, price, category, image URL, veg, preparation time.
- Categories: list, add, rename, delete. Show the backend message when delete is blocked.

**Task 5.3: Manage tables (0.5 hr)**
List number, capacity, status. Add, edit, delete. Disable delete for reserved or occupied tables.

**Task 5.4: Admin orders (1 hr)**
List with status and type filters. Show only the **next valid status** button, a "Mark cash as paid" button, and Cancel (only for `placed` or `confirmed`).

**Check:**
- A user account cannot see any admin screen, and the admin has no Cart link.
- Take one dine-in and one delivery order through every status.
- Completing a dine-in order makes the table `available` again.

---

### Phase 6: Clean-up (1 hr)
- Same look for loading, error and empty messages in every screen.
- Remove every `console.log`.
- Fix all ESLint warnings (`npm run lint`).
- `npm run build` runs without errors.
- Check the layout once on a mobile width.

---

## Time Split

| Phase | Hours |
| --- | --- |
| 1. Setup and Login | 3 |
| 2. Navbar and Menu | 3 |
| 3. Cart and Checkout | 3.5 |
| 4. My Orders and Profile | 2.5 |
| 5. Admin Screens | 3 |
| 6. Clean-up | 1 |
| **Total** | **16** |

## Who sees what

| Screen | Not logged in | User | Admin |
| --- | --- | --- | --- |
| Menu | ✅ | ✅ | ✅ |
| Login / Register | ✅ | ❌ | ❌ |
| Cart, Checkout | ❌ | ✅ | ❌ |
| My Orders, Order detail | ❌ | ✅ | ❌ |
| Profile | ❌ | ✅ | ✅ |
| Dashboard, Manage menu / categories / tables | ❌ | ❌ | ✅ |
| Admin orders | ❌ | ❌ | ✅ |

## Submission Checklist
- [ ] Runs with `npm run dev` and talks to the backend
- [ ] Only the topics from the Rules table are used (plus `axios`)
- [ ] No `useEffect`, no router, no `localStorage`
- [ ] The API URL is written only in `api.js`
- [ ] Contexts, components and admin screens are in separate files as shown above
- [ ] Every screen shows loading, error and empty messages
- [ ] `npm run lint` and `npm run build` pass
- [ ] One commit per phase
