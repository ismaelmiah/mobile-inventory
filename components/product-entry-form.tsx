import { Product } from "@/models";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Autocomplete,
  AutocompleteItem,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export const ProductEntryForm = (props: any) => {
  const product: Product = props.product;
  const isOpen: any = props.isOpen;
  const onClose: any = props.onClose;
  const onSave: any = props.onSave;
  const onOpenChange: any = props.onOpenChange;
  const categories: any[] = props.categories;
  const defaultCategory: any = props.defaultCategory || "";

  const [imei, setImei] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const isValidForm = () => {
    return imei != "" && model != "" && price != "" && category != "";
  };

  const resetForm = () => {
    setImei("");
    setModel("");
    setCategory("");
    setPrice("");
  };

  const handleFormSubmit = () => {
    onSave({ imei, model, price, category });
    resetForm();
  };

  useEffect(() => {
    setIsUpdate(!product);
    if (product != null) {
      setImei(product.imei);
      setModel(product.model);
      setCategory(defaultCategory);
      setPrice(product.price.toString());
    } else {
      resetForm();
    }
  }, [product, defaultCategory]);
  console.log("outside of useEffect: ", category);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Product Form</ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            aria-label="IMEI number"
            placeholder="Enter IMEI number"
            labelPlacement="outside"
            label="IMEI"
            type="text"
            isRequired
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />
          <Input
            placeholder="Enter phone model"
            aria-label="Phone model"
            labelPlacement="outside"
            value={model}
            label="Model"
            isRequired
            onChange={(e) => setModel(e.target.value)}
            type="text"
          />
          <Input
            placeholder="Enter price 0.00"
            aria-label="Price"
            type="number"
            label="Price"
            value={price}
            isRequired
            labelPlacement="outside"
            onChange={(e) => setPrice(e.target.value)}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          <div>
            <Autocomplete
              placeholder="Search category"
              aria-label="Category"
              defaultItems={categories as any[]}
              labelPlacement="outside"
              label="Category"
              value={category}
              onInputChange={setCategory}
              isRequired
              disableSelectorIconRotation
              defaultSelectedKey={defaultCategory}
            >
              {(item) => (
                <AutocompleteItem key={item.cid} value={item.cid}>
                  {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={() => {
              if (isValidForm()) {
                onClose();
                handleFormSubmit();
              }
            }}
          >
            {isUpdate ? "Save" : "Update"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
