import { Product } from "@/models";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export const ProductSaleForm = (props: any) => {
  const product: Product = props.product;
  const isOpen:any = props.isOpen;
  const onSale:any = props.onSale;
  const onOpenChange:any = props.onOpenChange;

  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    setPrice(product?.price.toString());
  }, [product])

  const isValidForm = () => {
    return Number.parseInt(price as string) >= product.price;
  };

  const handleFormSubmit = () => {    
    onSale(product.imei, price);    
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Product Sale
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Enter price 0.00"
                autoFocus
                aria-label="Price"
                type="number"
                label="Price"
                value={price as string}
                isRequired
                labelPlacement="outside"
                onChange={(e) => setPrice(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
              <Input
                aria-label="IMEI number"
                placeholder="Enter IMEI number"
                labelPlacement="outside"
                label="IMEI"
                type="text"
                readOnly
                value={product.imei}
              />
              <Input
                placeholder="Enter phone model"
                aria-label="Phone model"
                labelPlacement="outside"
                label="Model"
                readOnly
                value={product.model}
                type="text"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="success"
                onPress={() => {
                  if (isValidForm()) {
                    onClose();
                    handleFormSubmit();
                  }
                }}
              >
                Sale
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
