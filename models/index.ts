export interface Product {
  imei: string;
  model: string;
  price: string;
  category: string;
  status: string;
  sale_date: string | null;
  sale_price: string | null;
}

export interface Category{
  name: string;
  cid: string;
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

export const categories: Category[] = [
  { name: "Realme", cid: "realme" },
  { name: "Xiaomi", cid: "xiaomi" },
  { name: "Samsung", cid: "samsung" },
];
