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
  const [imei, setImei] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);


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
              Product Form
            </ModalHeader>
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
              >
                {isUpdate ? "Update" : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
