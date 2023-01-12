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

import { NavLink } from "react-router-dom";

interface IMainProps {
  isOpen: boolean;
  onClose: Function;
}

export default function SucessAccountCreate({ isOpen, onClose }: IMainProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent maxW={[305, 305, 500]}>
          <ModalHeader fontSize={"md"}>Sucesso!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mt={"5"} spacing={"3"}>
              <Text fontWeight={500}> Sua conta foi criada com sucesso! </Text>
              <Text fontWeight={400} color={"textColor.200"}>
                Agora você poderá ver seus negócios crescendo em grande escala
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter mb={"5"} justifyContent={"flex-start"}>
            <Button
              bg={"brand.500"}
              textColor={"white"}
              mr={3}
              onClick={() => onClose()}
            >
              <NavLink to={"/login"}>Ir para o login</NavLink>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
