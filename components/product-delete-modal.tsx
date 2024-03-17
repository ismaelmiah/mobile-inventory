import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export const ProductDeleteModal = (props: any) => {
  const isOpen: any = props.isOpen;
  const onClose: any = props.onClose;
  const onDelete: any = props.onDelete;

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Are you sure
          </ModalHeader>
          <ModalBody>
            <h2>Do you want to delete this product?</h2>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => {
                onClose();
                onDelete(props.iemi);
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
