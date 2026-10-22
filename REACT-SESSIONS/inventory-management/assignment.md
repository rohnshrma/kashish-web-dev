# Assignment: Inventory Manager (React CRUD with Context API)

## Goal

Build a single-page **Inventory Manager** in React. A shop owner should be able to:

- **C**reate: add a new product
- **R**ead: see all products in a list
- **U**pdate: edit a product's details, and increase or decrease its stock
- **D**elete: remove a product

You have already built everything you need for this in the **intro** app (Counter, Form, Card, theme) and the **tdl** to-do app (AddTask, TaskList, Task, TaskContext). This assignment uses the same ideas, with one new part: **editing**.

---

## Rules: use only what we have covered

| Allowed | Not allowed (not covered yet) |
| --- | --- |
| Components, JSX, props, `children` | `useEffect`, `useRef`, `useMemo` |
| `.map()` with `key`, `.filter()`, spread `...` | React Router or any routing |
| `useState` | `localStorage`, `fetch`, APIs |
| Events (`onClick`, `onChange`, `onSubmit`) | Redux or any state library |
| Controlled forms (`value` + `onChange`) | UI libraries (MUI, Bootstrap, etc.) |
| `useReducer` with `dispatch({ type, payload })` | |
| `createContext`, a Provider, `useContext` | |
| Inline styles / conditional styles | |
| `uuid` for ids | |

> Data does **not** need to survive a page refresh. Keeping it in state is enough.

---

## The data

Each product is an object like this:

```
{
  id:       (from uuid)
  name:     "Wireless Mouse"
  category: "Electronics"
  price:    499
  quantity: 25
}
```

> **Tip:** values that come from an `<input>` are always **strings**. Convert `price` and `quantity` to numbers before you save them.

---

## Component tree

```
main.jsx
└── InventoryContextProvider        ← holds products + all CRUD functions
    └── App
        ├── Header                  ← app title + summary (total products, total stock value)
        ├── ProductForm             ← used for both ADD and EDIT (useReducer for form fields)
        └── ProductList             ← reads products from context, maps them
            └── ProductItem         ← shows one product + Edit / Delete / + / − buttons
```

Folder structure to follow:

```
inventory-management/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── InventoryContext.jsx
    └── Components/
        ├── Header.jsx
        ├── ProductForm.jsx
        ├── ProductList.jsx
        └── ProductItem.jsx
```

---

## Flow of the app (read this before coding)

### 1. Where the data lives

All products live in **one array inside the context provider**, just like `tasks` in `TaskContext.jsx`. No component except the provider owns the product list.

The provider also keeps **one more piece of state**: which product is being edited right now (`editingProduct`, starts as `null`).

### 2. Add flow (Create)

```
user types in ProductForm
  → onChange → dispatch({ type: <field name>, payload: value })   (local form reducer)
user clicks "Add Product"
  → onSubmit → preventDefault → build product object (+ uuid id, numbers converted)
  → call addProduct(newProduct) from context
  → dispatch({ type: "RESET" }) to clear the form
context updates products → ProductList re-renders → new item appears
```

### 3. Show flow (Read)

```
ProductList → useContext → gets products → products.map(p => <ProductItem product={p} key={p.id} />)
Header      → useContext → gets products → shows count and total value
```

### 4. Edit flow (Update) ← the new part

```
user clicks "Edit" on a ProductItem
  → call startEditing(product) from context → editingProduct = that product
ProductForm sees editingProduct is not null
  → fill the form with that product's values (dispatch a "LOAD" action)
  → button text changes to "Update Product" + a "Cancel" button appears
user changes fields and submits
  → call updateProduct(updatedProduct) from context
  → context replaces the matching product (by id) using .map()
  → editingProduct goes back to null, form resets
```

> **Hint:** the form must fill itself when `editingProduct` changes, and you are **not** allowed `useEffect`. Think about **where** the "Edit" click happens and what you can do at that moment. You could fill the form from the click itself, or you could use the `key` prop on `ProductForm` so that React gives you a fresh form each time a different product is being edited. Choose one and be ready to explain why it works.

### 5. Stock flow (Update quantity)

```
user clicks "+" or "−" on a ProductItem
  → call changeQuantity(id, +1) or changeQuantity(id, -1)
  → context maps over products and changes only the matching one
  → quantity must NEVER go below 0
```

### 6. Delete flow

```
user clicks "Delete" on a ProductItem
  → call deleteProduct(id) from context
  → context filters that product out
  → if the deleted product was being edited, also cancel editing
```

---

## Step-by-step tasks

### Step 1: Project setup
1. Inside `inventory-management/`, create a new Vite + React project (same as `intro` and `tdl`).
2. Install `uuid`.
3. Clean up `App.jsx`, `App.css`, `index.css` so you start empty.

### Step 2: Static components first
1. Create `Header`, `ProductForm`, `ProductList`, `ProductItem` with **hard-coded** JSX only (no state).
2. Render them in `App` and check the layout in the browser.
3. In `ProductForm`, create inputs for `name`, `category` (a `<select>` with at least 4 options), `price`, `quantity`.

### Step 3: Context
1. Create `InventoryContext.jsx` with `createContext()`.
2. Make an `InventoryContextProvider` component that:
   - holds `products` in state (start with 2–3 sample products so the list is not empty)
   - holds `editingProduct` in state (starts `null`)
   - defines these functions: `addProduct`, `deleteProduct`, `updateProduct`, `changeQuantity`, `startEditing`, `cancelEditing`
   - passes all of them through `value={{ ... }}`
   - renders `{children}`
3. Wrap `<App />` with the provider in `main.jsx`.

> Use the **previous state** form (`setProducts(prev => ...)`) for every update, like in `TaskContext`.

### Step 4: Read
1. In `ProductList`, get `products` with `useContext` and `.map()` them into `ProductItem`.
2. `ProductItem` receives one `product` via props and displays name, category, price, quantity, and **total value** (`price × quantity`).
3. If `products` is empty, show a message like *"No products in inventory"*.

### Step 5: Create
1. In `ProductForm`, manage the form fields with **`useReducer`** (one reducer, field name as the action type, plus a `RESET` action, same as `AddTask`).
2. Use **controlled inputs** (`value={...}` + `onChange`).
3. On submit: validate, build the product, call `addProduct`, reset.

### Step 6: Delete
1. Add a **Delete** button to `ProductItem` that calls `deleteProduct(product.id)`.

### Step 7: Update quantity
1. Add **+** and **−** buttons to `ProductItem`.
2. Implement `changeQuantity(id, amount)` in context with `.map()` and the spread operator.
3. Disable the **−** button when quantity is `0`.

### Step 8: Update (Edit)
1. Add an **Edit** button to `ProductItem` that calls `startEditing(product)`.
2. Add a `LOAD` action to your form reducer that replaces the whole form state with the product's values.
3. Make `ProductForm` switch between **Add mode** and **Edit mode**:
   - heading: "Add Product" / "Edit Product"
   - button: "Add Product" / "Update Product"
   - a "Cancel" button only in edit mode
4. On submit in edit mode, call `updateProduct` instead of `addProduct`.
5. Highlight the item currently being edited in the list (conditional inline style).

### Step 9: Header summary
Show in the `Header` (all read from context, calculated during render, **not** stored in state):
- Total number of products
- Total units in stock
- Total inventory value (sum of `price × quantity`)

### Step 10: Low-stock warning
- If a product's quantity is **5 or less**, show a "Low stock" label and change its card color (conditional style, like the theme in `intro`'s `Card`).
- If quantity is **0**, show "Out of stock" instead.

---

## Validation rules

Do not add the product, and show an error message under the form (use state for the message), if:

- name is empty or only spaces
- no category is selected
- price is empty or `≤ 0`
- quantity is empty or `< 0`

---

## Bonus (optional, still only covered topics)

1. **Search box**: filter the displayed list by name. Store the search text in state and filter **during render**. Do not change the real `products` array.
2. **Category filter**: a dropdown that shows only one category, or "All".
3. **Theme toggle**: dark/light mode with a second context (`ThemeContext`), so you don't pass `theme` as a prop.
4. **Convert to `useReducer`**: replace `useState` in the provider with a reducer that handles `ADD`, `DELETE`, `UPDATE`, `CHANGE_QTY` actions.

---

## Submission checklist

- [ ] App runs with `npm run dev` with no errors in the console
- [ ] Products can be added, listed, edited, deleted
- [ ] `+` / `−` changes stock, and stock never goes below 0
- [ ] Form uses `useReducer` and controlled inputs
- [ ] **No prop drilling**: only `ProductItem` receives a product via props; all functions come from context
- [ ] Header totals update automatically
- [ ] Low-stock / out-of-stock styling works
- [ ] Validation errors are shown
- [ ] No topics from the "Not allowed" column used
- [ ] Code pushed inside the `inventory-management/` folder

---

## Questions to answer (write them in a `answers.md` file)

1. Why do the product list and its functions live in the context and not in `App`?
2. Why does only `ProductItem` receive data through props, while everything else uses `useContext`?
3. Why should totals in the `Header` be **calculated** and not stored in their own state?
4. How did you make the form fill itself when "Edit" is clicked without `useEffect`?
5. Why do we use `setProducts(prev => ...)` instead of `setProducts(products ...)`?
