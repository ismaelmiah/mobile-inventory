import { Select, Input, SelectItem, Button } from "@nextui-org/react";
import { SearchIcon, PlusIcon } from "@/models/Icon";

export const ProductSearchBar = (props: any) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <div className="flex gap-3 w-full items-center">
          <Input
            className="w-full sm:max-w-[22%]"
            placeholder="Search here..."
            startContent={<SearchIcon />}
            labelPlacement="outside"
          />

          <div className="px-4 py-2 text-2xl text-red-900 font-semibold">
            Investment: 120434
          </div>
          <div className="px-4 py-2 text-2xl text-blue-900 font-semibold">
            Sale: 120434
          </div>
          <div className="px-4 py-2 text-2xl text-green-900 font-semibold">
            Profit: 120434
          </div>
        </div>
        <div className="flex gap-3">
          <Button color="primary" 
           endContent={<PlusIcon />}>
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};
