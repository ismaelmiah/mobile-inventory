export interface Product {
  imei: string;
  model: string;
  price: number;
  category: string;
  status: string;
  sale_date: string | null;
  sale_price: number | null;
}

export const columns = [
  { name: "IMEI", uid: "imei" },
  { name: "MODEL", uid: "model" },
  { name: "PRICE", uid: "price" },
  { name: "CATEGORY", uid: "category" },
  { name: "STATUS", uid: "status" },
  { name: "SALE DATE", uid: "sale_date" },
  { name: "SALE PRICE", uid: "sale_price" },
  { name: "ACTIONS", uid: "actions" },
];

export const status = [
  { name: "Sold", uid: "sold" },
  { name: "Entry", uid: "entry" },
];

export const categories = [
  { name: "Realme", uid: "realme" },
  { name: "Xiaomi", uid: "xiaomi" },
  { name: "Samsung", uid: "samsung" },
];
