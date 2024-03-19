import { Select, Input, SelectItem, Button } from "@nextui-org/react";
import { SearchIcon, PlusIcon } from "@/models/Icon";

export const ProductSearchBar = (props: any) => {
  const {
    onOpen,
    onSearchChange,
    phoneCategories,
    setCategoryFilter,
    setStatusFilter,
    statusOptions,
    setProductNull,
    investment,
    sale,
    profit
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <div className="flex gap-3 w-full items-center">
          <Input
            className="w-full sm:max-w-[22%]"
            placeholder="Search here..."
            startContent={<SearchIcon />}
            labelPlacement="outside"
            onValueChange={onSearchChange}
          />

          <Select
            placeholder="Select category"
            selectionMode="multiple"
            labelPlacement="outside"
            className="sm:max-w-[15%]"
            onChange={(e) => {
              setCategoryFilter(e.target.value);
            }}
          >
            {(phoneCategories as any[]).map((item) => (
              <SelectItem key={item.uid} value={item.uid}>
                {item.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Status"
            selectionMode="multiple"
            className="sm:max-w-[10%]"
            labelPlacement="outside"
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
          >
            {(statusOptions as any[]).map((status) => (
              <SelectItem key={status.uid} value={status.uid}>
                {status.name}
              </SelectItem>
            ))}
          </Select>

          <div className="px-4 py-2 text-2xl text-red-900 font-semibold">
            Investment: {investment}
          </div>
          <div className="px-4 py-2 text-2xl text-blue-900 font-semibold">
            Sale: {sale}
          </div>
          <div className="px-4 py-2 text-2xl text-green-900 font-semibold">
            Profit: {profit}
          </div>
        </div>
        <div className="flex gap-3">
          <Button color="primary" 
          onPress={() => {
            setProductNull();
            onOpen()
          }}
           endContent={<PlusIcon />}>
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};
