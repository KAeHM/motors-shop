import React from "react";

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Stack,
} from "@chakra-ui/react";

import axios from "axios";

interface IMainProps {
  isOpen: boolean;
  onClose: Function;
  id?: string;
  token?: string;
  resetData: any;
}

export default function AdDelete({
  isOpen,
  onClose,
  id,
  token,
  resetData,
}: IMainProps) {
  function makeRequest() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .delete("http://localhost:3000/listings/delete/" + id, config)
      .then((res) => {
        resetData();
        onClose();
      });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent maxW={[305, 305, 500]}>
          <ModalHeader fontSize={"md"}>Excluir Anuncio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mt={"5"} spacing={"3"}>
              <Text fontWeight={500}>
                {" "}
                Tem certeza que deseja remover este anúncio?{" "}
              </Text>
              <Text fontWeight={400} color={"textColor.200"}>
                Essa ação não pode ser desfeita. Isso excluirá permanentemente
                sua conta e removerá seus dados de nossos servidores.
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter mb={"5"}>
            <Button
              bg={"#DEE2E6"}
              textColor={"#495057"}
              mr={3}
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
            <Button
              bg={"#FDD8D8"}
              textColor={"#CD2B31"}
              mr={3}
              onClick={() => makeRequest()}
            >
              Sim, excluir anúncio
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
