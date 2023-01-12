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
  Tag,
  Input,
} from "@chakra-ui/react";
import InputComponent from "../../InputComponent";
import RadioButtons from "../../RadioButton";
import axios from "axios";
import { UserContext } from "../../../contexts/userContext";
import SucessAdCreate from "../SucessAdCreate";
import AdDelete from "../AdDelete";

interface IMainProps {
  isOpen: boolean;
  onClose: Function;
  data?: IDataVehicle;
  resetData: any;
}

interface IDataVehicle {
  id?: string;
  listingType?: string;
  name?: string;
  year?: string;
  km?: string;
  price?: string;
  description?: string;
  typeVehicle?: string;
  coverImage?: string;
}

export default function AdCreate({
  isOpen,
  onClose,
  data,
  resetData,
}: IMainProps) {
  const [name, setName] = React.useState(data ? data.name! : "");
  const [listingType, setListingType] = React.useState("Venda");
  const [year, setYear] = React.useState(data ? data.year! : "");
  const [km, setKm] = React.useState(data ? data.km! : "");
  const [price, setPrice] = React.useState(data ? data.price! : "");
  const [description, setDescription] = React.useState(
    data ? data?.description! : ""
  );
  const [typeVehicle, setTypeVehicle] = React.useState("Carro");
  const [coverImage, setCoverImage] = React.useState(
    data ? data.coverImage! : ""
  );
  const [imagesLinks, setImagesLinks] = React.useState([""]);

  const { token } = React.useContext(UserContext);

  const [sucessCreate, setSucessCreate] = React.useState(false);
  const [adDelete, setAdDelete] = React.useState(false);

  function setNewValueForLink(newValue: string, key: number) {
    const newArray = [...imagesLinks];
    newArray[key] = newValue;
    setImagesLinks(newArray);
  }

  function handleAdDelete() {
    setAdDelete(!adDelete);
  }

  function handleSucessCreate() {
    setSucessCreate(!sucessCreate);
  }

  function handleListingType(type: any) {
    setListingType(type);
  }

  function handleTypeVehicle(type: any) {
    setTypeVehicle(type);
  }

  function makeRequest() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (data) {
      axios
        .patch(
          "http://localhost:3000/listings/edit/" + data.id,
          makeObj(),
          config
        )
        .then((res) => {
          resetData();
          onClose();
        });
    } else {
      axios
        .post("http://localhost:3000/listings/register/", makeObj(), config)
        .then((res) => {
          handleSucessCreate();
          resetData();
          onClose();
        });
    }
  }

  function makeObj() {
    const obj = {
      name,
      listingType,
      year,
      km,
      price,
      description,
      typeVehicle,
      coverImage,
    };

    return obj;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setImagesLinks([""]);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent maxW={[305, 305, 500]}>
          <ModalHeader fontSize={"md"}>
            {data ? "Editar Anuncio" : "Criar Anuncio"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
              <Stack>
                <Text mb={"5px"} fontWeight={500}>
                  Tipo de anuncio
                </Text>

                <Box w={"100%"}>
                  <RadioButtons
                    name={"typeAd"}
                    defaultValue={data ? data.listingType! : "Venda"}
                    options={["Venda", "Leilão"]}
                    onChange={handleListingType}
                  ></RadioButtons>
                </Box>
              </Stack>

              <Stack>
                <Text mb={"5px"} fontWeight={500}>
                  Infomações do veículo
                </Text>

                <InputComponent
                  placeholder="Digite um Título"
                  formLabel="Título"
                  inputType={"text"}
                  value={name}
                  setValue={setName}
                />

                <Stack direction={"row"}>
                  <InputComponent
                    placeholder="Digitar ano"
                    formLabel="Ano"
                    inputType={"text"}
                    value={year}
                    setValue={setYear}
                  />
                  <InputComponent
                    placeholder="0"
                    formLabel="Quilometragem"
                    inputType={"number"}
                    value={km}
                    setValue={setKm}
                  />
                  <InputComponent
                    placeholder="Digitar preço"
                    formLabel="Preço"
                    inputType={"text"}
                    value={price}
                    setValue={setPrice}
                  />
                </Stack>

                <Box>
                  <Text mb={"5px"} fontWeight={500}>
                    Descrição
                  </Text>
                  <Textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Escreva algo sobre o produto!"
                  ></Textarea>
                </Box>
              </Stack>

              <Stack>
                <Text mb={"5px"} fontWeight={500}>
                  Tipo de veículo
                </Text>

                <Box w={"100%"}>
                  <RadioButtons
                    name={"typeCar"}
                    defaultValue={data ? data.typeVehicle! : "Carro"}
                    options={["Carro", "Moto"]}
                    onChange={handleTypeVehicle}
                  ></RadioButtons>
                </Box>
              </Stack>

              <Stack>
                <InputComponent
                  placeholder="Inserir URL da imagem"
                  formLabel="Imagem da Capa"
                  inputType={"text"}
                  value={coverImage}
                  setValue={setCoverImage}
                />

                {imagesLinks.map((elem, key) => {
                  return (
                    <Stack key={key + Math.random()}>
                      <Text>{key + 1}° Imagem da Capa</Text>
                      <Input
                        placeholder="Inserir URL da imagem"
                        type={"text"}
                        value={imagesLinks[key]}
                        onChange={(e) => {
                          setNewValueForLink(e.target.value, key);
                        }}
                      />
                    </Stack>
                  );
                })}

                <Tag
                  padding={"4px 8px"}
                  width={"290px"}
                  height={"32px"}
                  borderRadius={"4px"}
                  bg={"brand.100"}
                  textColor={"brand.500"}
                  cursor={"pointer"}
                  onClick={() => {
                    setImagesLinks([...imagesLinks, ""]);
                  }}
                >
                  Adicionar campo para imagem da galeria
                </Tag>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter mb={"3px"}>
            <Button
              bg={"#DEE2E6"}
              textColor={"#495057"}
              mr={"5px"}
              onClick={() => {
                if (data) {
                  onClose();
                  handleAdDelete();
                } else {
                  setImagesLinks([""]);
                  onClose();
                }
              }}
            >
              {data ? "Excluir Anuncio" : "Cancelar"}
            </Button>

            <Button
              bg={"brand.500"}
              textColor={"white"}
              mr={"5px"}
              onClick={() => {
                setImagesLinks([""]);
                makeRequest();
                onClose();
              }}
            >
              Salvar Alterações
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SucessAdCreate
        isOpen={sucessCreate}
        onClose={handleSucessCreate}
      ></SucessAdCreate>
      <AdDelete
        token={token && token}
        id={data && data.id}
        isOpen={adDelete}
        onClose={handleAdDelete}
        resetData={resetData}
      ></AdDelete>
    </>
  );
}
