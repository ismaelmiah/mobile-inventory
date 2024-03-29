import { NextPage } from "next";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
  useDisclosure,
} from "@nextui-org/react";
import { ProductEntryForm } from "@/components/product-entry-form";
import { ProductSearchBar } from "@/components/product-search-bar";
import { ProductSaleForm } from "@/components/product-sale-form";
import { categories, status, columns, Product } from "@/models";
import { EditIcon, MobileIcon, DeleteIcon } from "@/models/Icon";
import { ProductDeleteModal } from "@/components/product-delete-modal";

export async function getServerSideProps() {
  //const res = await fetch('https://sheetdb.io/api/v1/j5309zo0rjobp');
  //const products = await res.json();

  const products: Product[] = [
    {
      imei: "111111",
      model: "A23",
      price: 500,
      status: "entry",
      category: "samsung",
      sale_date: null,
      sale_price: 560,
    },
    {
      imei: "222222",
      model: "A23",
      price: 554,
      status: "sold",
      category: "realme",
      sale_date: null,
      sale_price: null,
    },
    {
      imei: "33333",
      model: "A23",
      price: 505,
      status: "sold",
      category: "xiaomi",
      sale_date: null,
      sale_price: null,
    },
    {
      imei: "44444",
      model: "A23",
      price: 5879,
      status: "entry",
      category: "samsung",
      sale_date: null,
      sale_price: null,
    },
  ];

  var investment = 0,
    sale = 0,
    profit = 0;

  products.forEach((item) => {
    if (item.status === "entry") {
      investment += item.price;
    }

    sale += item.sale_price !== null ? item.sale_price : 0;
    profit += item.sale_price !== null ? item.sale_price - item.price : 0;
  });

  return {
    props: {
      products: products,
      investment: investment,
      sale: sale,
      profit: profit,
    },
  };
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  entry: "success", //entry
  sold: "warning", //sale
};

interface Props {
  products: Product[];
  investment: number;
  sale: number;
  profit: number;
}

const HomePage: NextPage<Props> = (data: Props) => {
  const deleteModal = useDisclosure();
  const saleModal = useDisclosure();
  const entryModal = useDisclosure();
  const [investment, setInvestment] = useState(data.investment);
  const [sale, setSale] = useState(data.sale);
  const [profit, SetProfit] = useState(data.profit);
  const [products, setProducts] = useState(data.products);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const handleSaveProduct = (data: any) => {
    const { imei, model, price, category } = data;

    const updatedData = [...products];

    updatedData.push({
      imei: imei,
      model: model,
      price: price,
      category: category,
      status: "entry",
    } as Product);

    setInvestment(investment => investment + data.price);
    setProducts(updatedData);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const handleRowProduct = (
    product: any,
    saleProduct: boolean,
    updateProduct: boolean
  ) => {
    setSelectedProduct(product);
    const category = categories.find((c) => c.uid == product?.category)?.uid;
    setSelectedCategory(category);

    console.log("selected product: ", product);
    console.log("selected category: ", selectedCategory, "-", category);
    if (saleProduct) saleModal.onOpen();
    else if (updateProduct) entryModal.onOpen();
    else deleteModal.onOpen();
  };

  const handleSaleProduct = (imei: any, price: any) => {
    const indexToUpdate = products.findIndex((p) => p.imei == imei);
    const updatedData = [...products];
    updatedData[indexToUpdate] = {
      ...updatedData[indexToUpdate],
      status: "sold",
      sale_price: price,
      sale_date: formatDate(new Date()),
    };

    setSale(sale => sale + price);
    SetProfit(profit => profit + (price - updatedData[indexToUpdate].price));
    setProducts(updatedData);
  };

  const handleDeleteProduct = (imei: any) => {
    const updatedData = products.filter((p) => p.imei != imei);

    setProducts(updatedData);
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredProducts = products;
    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.imei.includes(filterValue) ||
          product.model.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "" &&
      Array.from(statusFilter.split(",")).length !== status.length
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.from(statusFilter.split(",")).includes(product.status)
      );
    }

    if (
      categoryFilter !== "" &&
      Array.from(categoryFilter.split(",")).length !== categories.length
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.from(categoryFilter.split(",")).includes(product.category)
      );
    }

    return filteredProducts;
  }, [products, hasSearchFilter, categoryFilter, statusFilter, filterValue]);

  const onSearchChange = (value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  };

  const renderCell = useCallback((product: Product, columnKey: React.Key) => {
    const cellValue = product[columnKey as keyof Product];
    switch (columnKey) {
      case "category":
        return <div className="capitalize">{cellValue}</div>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[product.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex gap-2">
            {product.status == "entry" && (
              <button
                aria-label="Product sale button"
                aria-labelledby="Product sale"
                onClick={() => handleRowProduct(product, true, false)}
                className="text-lg text-white bg-sky-500 px-2 py-1 rounded-md hover:bg-sky-300 cursor-pointer active:opacity-50"
              >
                <MobileIcon />
              </button>
            )}
            <button
              aria-label="Product update button"
              aria-labelledby="Product update"
              onClick={() => handleRowProduct(product, false, true)}
              className="text-lg text-white bg-orange-500 px-2 py-2 rounded-md hover:bg-orange-300 cursor-pointer active:opacity-50"
            >
              <EditIcon />
            </button>
            {product.status == "entry" && (
              <button
                aria-label="Product delete button"
                aria-labelledby="Product delete"
                onClick={() => handleRowProduct(product, false, false)}
                className="text-lg text-white bg-red-600 px-2 py-2 rounded-md hover:bg-red-300  cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table
        topContent={
          <ProductSearchBar
            onOpen={entryModal.onOpen}
            onSearchChange={onSearchChange}
            phoneCategories={categories}
            setCategoryFilter={setCategoryFilter}
            setStatusFilter={setStatusFilter}
            statusOptions={status}
            setProductNull={() => setSelectedProduct(null)}
            investment={investment}
            sale={sale}
            profit={profit}
          />
        }
        aria-label="Product table"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredItems}>
          {(item) => (
            <TableRow key={item.imei}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProductEntryForm
        isOpen={entryModal.isOpen}
        onClose={entryModal.onClose}
        onOpenChange={entryModal.onOpenChange}
        categories={categories}
        onSave={handleSaveProduct}
        product={selectedProduct}
        defaultCategory={selectedCategory}
      />

      <ProductSaleForm
        isOpen={saleModal.isOpen}
        onClose={saleModal.onClose}
        product={selectedProduct}
        onOpenChange={saleModal.onOpenChange}
        onSale={handleSaleProduct}
      />

      <ProductDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        iemi={selectedProduct?.imei}
        onDelete={handleDeleteProduct}
      />
    </>
  );
};

export default HomePage;
