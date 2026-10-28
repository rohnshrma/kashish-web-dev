# Food Order API: Role-Based (Admin + User)

**Stack:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Postman
**Time:** 15 hours, 4 phases
**Roles:** `admin` (restaurant owner), `user` (customer)

A restaurant backend. The admin runs the menu, tables and orders. The user browses the menu and places an order as either **dine-in** (books a table) or **delivery** (gives an address).

---

## Folder Structure

```
food-order-api/
├── config/
│   ├── db.js
│   └── env.js
├── middleware/
│   ├── auth.js          # verify JWT
│   ├── role.js          # allow only certain roles
│   ├── validate.js      # request body checks
│   └── error.js         # 404 + central error handler
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── MenuItem.js
│   ├── Table.js
│   ├── Cart.js
│   └── Order.js
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   ├── menuController.js
│   ├── tableController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── adminController.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── menuRoutes.js
│   ├── tableRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
├── .env
├── app.js
└── server.js
```

**Rule of thumb:** routes only map URL → controller. Controllers hold logic. Models hold schema. Middleware guards the route before the controller runs.

---

## Phase 1: Setup, Auth and Roles (3.5 hrs)

### Task 1.1: Project setup (0.5 hr)
1. `npm init -y`, install `express mongoose dotenv bcryptjs jsonwebtoken cors morgan`, dev: `nodemon`.
2. Create the folders above.
3. `config/env.js`: read `PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN` from `.env` and export them. Crash on start if `JWT_SECRET` or `MONGO_URI` is missing.
4. `config/db.js`: `connectDB()` using `mongoose.connect`. Log success, exit on failure.
5. `app.js`: create the express app, add `express.json()`, `cors()`, `morgan`, a `GET /api/health` route. Export it.
6. `server.js`: connect DB, then `app.listen`.

### Task 1.2: User model (0.5 hr)
Fields: `name`, `email` (unique, lowercase), `password` (`select: false`), `phone`, `role` (`enum: ['admin','user']`, default `user`), `addresses[]` (`label`, `street`, `city`, `pincode`), `timestamps`.
- Pre-save hook: hash password with bcrypt (10 rounds) only if modified.
- Method `comparePassword(plain)`.

### Task 1.3: Auth controller and routes (1 hr)
| Method | Route | Access | What it does |
|---|---|---|---|
| POST | `/api/auth/register` | public | creates a `user` (never trust `role` from body) |
| POST | `/api/auth/login` | public | checks email + password, returns JWT |
| GET | `/api/auth/me` | logged in | returns own profile |
| PUT | `/api/auth/me` | logged in | update name, phone |
| POST | `/api/auth/me/addresses` | user | add a saved address |
| DELETE | `/api/auth/me/addresses/:id` | user | remove a saved address |

- JWT payload: `{ id, role }`.
- Same error message for wrong email and wrong password ("Invalid credentials").

### Task 1.4: Middleware (1 hr)
1. `auth.js`: read `Authorization: Bearer <token>`, verify, load user, attach to `req.user`. Missing/bad token → 401.
2. `role.js`: `authorize(...roles)` returns middleware. If `req.user.role` not in list → 403.
3. `validate.js`: small helper to check required fields and return 400 with a clear message.
4. `error.js`: `notFound` (404) and `errorHandler` (status + message JSON). Handle Mongoose duplicate key (11000), `CastError`, `ValidationError`.
5. Register error middleware last in `app.js`.

### Task 1.5: Seed the admin (0.5 hr)
Write `seedAdmin.js`: creates one admin from `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) if none exists. Admins are **never** created via the public register route.

### Postman: Phase 1
- Create a collection **Food Order API** and an environment with `baseUrl`, `adminToken`, `userToken`.
- Add a collection-level test on login requests that saves the token: `pm.environment.set("userToken", pm.response.json().token)`.
- Tests to run:
  - Register user → 201. Register same email again → 400/409.
  - Login user and admin → 200, tokens saved.
  - `GET /auth/me` with no token → 401. With token → 200, no password in response.
  - Try `role: "admin"` in the register body → the created user must still be `user`.

**Done when:** admin and user can log in, and a wrong/missing token is rejected.

---

## Phase 2: Menu, Categories and Tables, Admin Side (3.5 hrs)

### Task 2.1: Models (1 hr)
- **Category:** `name` (unique), `description`, `isActive`.
- **MenuItem:** `name`, `description`, `price`, `category` (ref), `image` (url string), `isVeg`, `isAvailable`, `preparationTime` (minutes), `timestamps`.
- **Table:** `tableNumber` (unique), `capacity`, `status` (`available | reserved | occupied`), `isActive`.

### Task 2.2: Category CRUD (0.5 hr)
| Method | Route | Access |
|---|---|---|
| GET | `/api/categories` | public |
| POST | `/api/categories` | admin |
| PUT | `/api/categories/:id` | admin |
| DELETE | `/api/categories/:id` | admin |

Block delete if any menu item still uses the category.

### Task 2.3: Menu CRUD (1.5 hrs)
| Method | Route | Access |
|---|---|---|
| GET | `/api/menu` | public |
| GET | `/api/menu/:id` | public |
| POST | `/api/menu` | admin |
| PUT | `/api/menu/:id` | admin |
| PATCH | `/api/menu/:id/availability` | admin (toggle sold out) |
| DELETE | `/api/menu/:id` | admin |

`GET /api/menu` query support:
- `?category=<id>`
- `?isVeg=true`
- `?search=paneer` (case-insensitive on name)
- `?minPrice=100&maxPrice=400`
- `?page=1&limit=10`
- `?sort=price` / `?sort=-price`

Users only see `isAvailable: true`. Admin sees everything (check `req.user`, so this route needs an optional-auth step).

### Task 2.4: Table management (0.5 hr)
| Method | Route | Access |
|---|---|---|
| GET | `/api/tables` | admin |
| POST | `/api/tables` | admin |
| PUT | `/api/tables/:id` | admin |
| DELETE | `/api/tables/:id` | admin (not if reserved/occupied) |
| GET | `/api/tables/available?guests=4&time=...` | user, admin |

### Postman: Phase 2
- Admin: create 3 categories, 8+ menu items, 5 tables.
- User token on any POST/PUT/DELETE → 403.
- No token on `POST /menu` → 401.
- Filters: veg only, price range, search, page 2.
- Toggle an item unavailable, then confirm a user no longer sees it.
- Delete a category that has items → blocked.
- Duplicate `tableNumber` → error.

**Done when:** the whole menu is manageable by admin and browsable by anyone.

---

## Phase 3: Cart and Orders, Dine-In + Delivery (4.5 hrs)

### Task 3.1: Cart (1 hr)
**Cart model:** `user` (unique ref), `items[]` (`menuItem` ref, `quantity`), `timestamps`.

| Method | Route | What it does |
|---|---|---|
| GET | `/api/cart` | cart with populated items and a computed total |
| POST | `/api/cart` | add `{ menuItemId, quantity }`; if already there, increase quantity |
| PUT | `/api/cart/:menuItemId` | set quantity (0 removes) |
| DELETE | `/api/cart/:menuItemId` | remove one item |
| DELETE | `/api/cart` | clear cart |

Reject unavailable items. All routes: `auth` + `authorize('user')`.

### Task 3.2: Order model (1 hr)
Fields:
- `user` (ref)
- `items[]`: `menuItem`, `name`, `price`, `quantity` (**snapshot** name and price so later menu edits don't change old orders)
- `orderType`: `dine-in | delivery`
- `status`: `placed → confirmed → preparing → ready → out-for-delivery → delivered | served → completed | cancelled`
- `subtotal`, `tax` (5%), `deliveryFee`, `totalAmount`
- `paymentMethod`: `cash | online`, `paymentStatus`: `pending | paid`
- **dine-in only:** `table` (ref), `guests`, `reservationTime`
- **delivery only:** `deliveryAddress` (`street`, `city`, `pincode`, `phone`)
- `cancelReason`, `timestamps`

### Task 3.3: Place order (1.5 hrs)
`POST /api/orders` (user)

Body for dine-in:
```json
{ "orderType": "dine-in", "tableId": "...", "guests": 2, "reservationTime": "2026-10-01T19:30:00Z", "paymentMethod": "cash" }
```
Body for delivery:
```json
{ "orderType": "delivery", "deliveryAddress": { "street": "...", "city": "...", "pincode": "..." }, "paymentMethod": "online" }
```

Controller steps, in this order:
1. Load the user's cart. Empty → 400.
2. Re-check every item is still available and re-read the **current** price from the DB.
3. Branch on `orderType`:
   - **dine-in:** table exists, `capacity >= guests`, `status === 'available'`, reservation time is in the future. Set table to `reserved`. No delivery fee.
   - **delivery:** address required and complete. `deliveryFee = 40` (flat, free above ₹500 subtotal).
4. Calculate subtotal, tax, fee, total on the server. Never accept totals from the client.
5. Save the order, then clear the cart.

### Task 3.4: User order routes (0.5 hr)
| Method | Route | What it does |
|---|---|---|
| GET | `/api/orders/my` | own orders, newest first, filter `?status=&orderType=` |
| GET | `/api/orders/:id` | own order only (403 on someone else's) |
| PATCH | `/api/orders/:id/cancel` | only while `placed`; frees the table if dine-in |

### Postman: Phase 3
- Add 3 items to the cart, update one quantity, remove one, check total.
- Place a **dine-in** order → table becomes `reserved`.
- Place the same table again → rejected.
- Dine-in with `guests` > capacity → rejected.
- Place a **delivery** order under ₹500 → fee 40. Over ₹500 → fee 0.
- Delivery without address → 400.
- Cart is empty after a successful order.
- Change a menu price afterwards → old order total unchanged.
- User B fetches User A's order → 403.
- Cancel a `placed` order → OK. Cancel a `preparing` order → rejected.

**Done when:** both order types work end to end from cart to saved order.

---

## Phase 4: Admin Order Handling, Dashboard, Hardening (3.5 hrs)

### Task 4.1: Admin order management (1.5 hrs)
| Method | Route | What it does |
|---|---|---|
| GET | `/api/admin/orders` | all orders; filters `?status=&orderType=&date=&page=` |
| GET | `/api/admin/orders/:id` | any order with user details |
| PATCH | `/api/admin/orders/:id/status` | move to the next valid status |
| PATCH | `/api/admin/orders/:id/payment` | mark cash as `paid` |

**Allowed status flow (enforce it in the controller with a map):**
- dine-in: `placed → confirmed → preparing → ready → served → completed`
- delivery: `placed → confirmed → preparing → ready → out-for-delivery → delivered`
- `cancelled` allowed from `placed` / `confirmed` only.

Invalid jump (e.g. `placed → delivered`) → 400. When a dine-in order becomes `completed` or `cancelled`, set the table back to `available`.

### Task 4.2: Dashboard stats (1 hr)
`GET /api/admin/stats` using Mongoose `aggregate`:
- total orders, orders today
- revenue today and total (only `paid` / non-cancelled)
- orders split by `orderType`
- orders count per status
- top 5 selling items (`$unwind` items, `$group` by menuItem, `$sum` quantity)

### Task 4.3: Users management (0.5 hr)
| Method | Route | Access |
|---|---|---|
| GET | `/api/admin/users` | admin |
| GET | `/api/admin/users/:id/orders` | admin |

### Task 4.4: Hardening (0.5 hr)
- Validate all ObjectId params (bad id → 400, not a crash).
- Make sure `password` never appears in any response.
- Add `express-rate-limit` on `/api/auth/login`.
- Add `helmet`.
- Check every route has the right `auth` / `authorize` in its route file.

### Task 4.5: Final Postman pass (0.5 hr)
- Organise the collection into folders: **Auth, Categories, Menu, Tables, Cart, Orders, Admin**.
- Add basic tests to each request (status code + one field check).
- Run the collection with the **Collection Runner** top to bottom.
- Export the collection and environment JSON into a `/postman` folder.

### Postman: Phase 4
- User token on any `/admin/*` route → 403.
- Walk one full dine-in order and one full delivery order through every status as admin.
- Try skipping a status → 400.
- Complete a dine-in order → table is `available` again.
- Check `/admin/stats` numbers against the orders you made.

**Done when:** admin can run the restaurant from Postman alone, and the collection runs green.

---

## Time Split

| Phase | Hours |
|---|---|
| 1. Setup, Auth, Roles | 3.5 |
| 2. Menu, Categories, Tables | 3.5 |
| 3. Cart, Orders | 4.5 |
| 4. Admin, Stats, Hardening | 3.5 |
| **Total** | **15** |

## Access Summary

| Area | Public | User | Admin |
|---|---|---|---|
| Register / login | ✅ | ✅ | ✅ |
| View menu, categories | ✅ | ✅ | ✅ |
| Manage menu, categories, tables | ❌ | ❌ | ✅ |
| Cart | ❌ | ✅ | ❌ |
| Place / cancel own order | ❌ | ✅ | ❌ |
| View all orders, update status | ❌ | ❌ | ✅ |
| Stats, user list | ❌ | ❌ | ✅ |

## Submission Checklist
- [ ] Runs with `npm run dev`, secrets only in `.env`
- [ ] `.env` in `.gitignore`, `.env.example` committed
- [ ] Config, middleware, models, controllers, routes all separated
- [ ] Postman collection + environment exported
- [ ] One commit per phase
