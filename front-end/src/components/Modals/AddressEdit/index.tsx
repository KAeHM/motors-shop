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

export default function AddressEdit({ isOpen, onClose }: IMainProps) {
  const { user, token, setUser } = React.useContext(UserContext);

  const [cep, setCep] = React.useState(user.cep!);
  const [city, setCity] = React.useState(user.city!);
  const [state, setState] = React.useState(user.state!);
  const [street, setStreet] = React.useState(user.street!);
  const [number, setNumber] = React.useState(user.number!);
  const [complement, setComplement] = React.useState(user.complement!);

  function makeObj() {
    const obj = { cep, city, state, street, number, complement };
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
          <ModalHeader fontSize={"md"}>Editar endereço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mt={"3"} spacing={"3"}>
              <Text mb={"5px"} fontWeight={500}>
                Infomações de endereço
              </Text>

              <InputComponent
                formLabel="CEP"
                inputType="text"
                placeholder="89888.888"
                value={cep}
                setValue={setCep}
              />
              <Stack direction={"row"}>
                <InputComponent
                  formLabel="Estado"
                  inputType="text"
                  placeholder="Paraná"
                  value={state}
                  setValue={setState}
                />
                <InputComponent
                  formLabel="Cidade"
                  inputType="text"
                  placeholder="Curitiba"
                  value={city}
                  setValue={setCity}
                />
              </Stack>
              <InputComponent
                formLabel="Rua"
                inputType="text"
                placeholder="Rua do paraná"
                value={street}
                setValue={setStreet}
              />
              <Stack direction={"row"}>
                <InputComponent
                  formLabel="Número"
                  inputType="text"
                  placeholder="1029"
                  value={number}
                  setValue={setNumber}
                />
                <InputComponent
                  formLabel="Complemento"
                  inputType="text"
                  placeholder="Apart 12"
                  value={complement}
                  setValue={setComplement}
                />
              </Stack>
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
