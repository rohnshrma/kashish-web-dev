// Fake "database". A real app would fetch this from an API inside a loader.
export const products = [
  { id: "1", name: "Wireless Mouse", category: "Electronics", price: 499 },
  { id: "2", name: "Mechanical Keyboard", category: "Electronics", price: 2499 },
  { id: "3", name: "Notebook", category: "Stationery", price: 99 },
  { id: "4", name: "Desk Lamp", category: "Home", price: 799 },
];

export const getProduct = (id) => products.find((p) => p.id === id);
