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
  Input,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import axios from "axios";

interface IMainProps {
  isOpen: boolean;
  onClose: Function;
}

export default function RecoveryPassword({ isOpen, onClose }: IMainProps) {
  const [email, setEmail] = React.useState("");

  function makeRequest() {
    axios
      .post("http://localhost:3000/user/password-recovery", { email })
      .then((res) => {});
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent maxW={[305, 305, 500]}>
          <ModalHeader fontSize={"md"}>Recuperar Senha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mt={"5"} spacing={"3"}>
              <Text fontWeight={500}> Digite o email da sua conta </Text>
              <Text fontWeight={400} color={"textColor.200"}>
                Será enviado um email para você com um link, não se esqueça de
                verificar sua caixa de spam!
              </Text>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </Stack>
          </ModalBody>

          <ModalFooter mb={"5"} justifyContent={"flex-start"}>
            <NavLink to={"/home"}>
              <Button
                bg={"brand.500"}
                textColor={"white"}
                mr={3}
                onClick={() => makeRequest()}
              >
                Recuperar Senha
              </Button>
            </NavLink>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
