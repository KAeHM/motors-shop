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
  Stack,
  Box,
  Textarea,
  Text,
} from "@chakra-ui/react";
import InputComponent from "../../InputComponent";
import { UserContext } from "../../../contexts/userContext";
import axios from "axios";

interface IMainProps {
  isOpen: boolean;
  onClose: Function;
}

export default function AccountEdit({ isOpen, onClose }: IMainProps) {
  const { user, token, setUser } = React.useContext(UserContext);

  const [name, setName] = React.useState(user.name!);
  const [email, setEmail] = React.useState(user.email!);
  const [cpf, setCpf] = React.useState(user.cpf!);
  const [phone, setPhone] = React.useState(user.phone!);
  const [birthdate, setBirthDate] = React.useState(user.birthdate!);
  const [description, setDescription] = React.useState(user.description!);

  function makeObj() {
    const obj = { name, email, cpf, phone, birthdate, description };
    return obj;
  }

  function makeRequest() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .patch("http://localhost:3000/user/edit/", makeObj(), config)
      .then((res) => {
        let obj = makeObj();
        setUser({ ...user, ...obj });
        localStorage.setItem("user", JSON.stringify({ ...user, ...obj }));
        onClose();
      });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent maxW={[305, 305, 500]}>
          <ModalHeader fontSize={"md"}>Editar perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mt={"3"} spacing={"3"}>
              <Text mb={"5px"} fontWeight={500}>
                Informações Pessoais
              </Text>

              <InputComponent
                formLabel="Nome"
                inputType="text"
                value={name}
                setValue={setName}
              />
              <InputComponent
                formLabel="Email"
                inputType="email"
                value={email}
                setValue={setEmail}
              />
              <InputComponent
                formLabel="CPF"
                inputType="text"
                value={cpf}
                setValue={setCpf}
              />
              <InputComponent
                formLabel="Celular"
                inputType="text"
                value={phone}
                setValue={setPhone}
              />
              <InputComponent
                formLabel="Data de nascimento"
                inputType="date"
                value={birthdate}
                setValue={setBirthDate}
              />
              <Box>
                <Text mb={"5px"} fontWeight={500}>
                  Descrição
                </Text>
                <Textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Escreva algo sobre você!"
                ></Textarea>
              </Box>
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
              bg={"brand.500"}
              textColor={"white"}
              mr={3}
              onClick={makeRequest}
            >
              Salvar Alterações
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
