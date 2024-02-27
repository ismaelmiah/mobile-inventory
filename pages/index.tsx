import { NextPage } from "next";
import React, { useCallback, useMemo, useState } from "react";
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
      sale_price: null,
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

  return {
    props: {
      data: products,
    },
  };
}

const HomePage: NextPage<Props> = ({ data }: Props) => {

  return (
    <>
    </>
  );
};

export default HomePage;
