import React from "react";

import Header from "../../components/Header";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Tag,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Carousel from "../../components/Carousel";
import CardAuction from "../../components/CardAuction";
import CardAd from "../../components/CardAd";
import Footer from "../../components/Footer";

import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import AdCreate from "../../components/Modals/AdCreate";
import SucessAdCreate from "../../components/Modals/SucessAdCreate";

export default function Profile() {
  const arrayItens = [1, 2, 3]; // array enquanto a API não está pronta para o carrossel
  const [data, setData] = React.useState([]);
  const [admin, setAdmin] = React.useState(false);
  const [createAd, setCreateAd] = React.useState(false);

  const { viewProfile, user, getColor } = React.useContext(UserContext);

  function handleCreateAd() {
    setCreateAd(!createAd);
  }

  function makeRequest() {
    axios
      .get("http://localhost:3000/listings/seller/" + viewProfile.id)
      .then((res) => {
        localStorage.setItem("viewProfile", JSON.stringify(viewProfile));
        setData(res.data);
      });
  }

  React.useEffect(() => {
    setAdmin(viewProfile.id === user.id);
  }, [viewProfile, user]);

  React.useEffect(() => {
    makeRequest();
  }, [viewProfile]);

  function filterTypeVehicle(type: string): object[] {
    return data.filter((elem: any) => {
      if (elem.typeVehicle === type) {
        return elem;
      }
    });
  }

  return (
    <Box bg={"#F1F3F5"}>
      <Header></Header>
      <Box
        h={"550px"}
        backgroundImage={"linear-gradient(to top, #F1F3F5 50%, #5126EA 50%)"}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Box
          width={"90%"}
          height={"450px"}
          bg={"white"}
          borderRadius={"4px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={"24px"}
          pl={"35px"}
        >
          <Avatar
            size={"xl"}
            bg={getColor(viewProfile.id)}
            color={"white"}
            name={viewProfile.name}
          ></Avatar>
          <Stack direction={"row"} alignItems={"center"}>
            <Text color={"#212529"} fontSize={"lg"} fontWeight={"600"}>
              {viewProfile.name}
            </Text>
            <Tag
              padding={"4px 8px"}
              width={"95px"}
              height={"28px"}
              borderRadius={"4px"}
              bg={"brand.100"}
              textColor={"brand.500"}
            >
              Anunciante
            </Tag>
          </Stack>
          <Text color={"#495057"} fontSize={"md"} fontWeight={"400"}>
            {viewProfile.description}
          </Text>
          {admin && (
            <Button
              w={"180px"}
              color={"brand.700"}
              borderColor={"brand.700"}
              variant={"outline"}
              onClick={handleCreateAd}
            >
              Criar Anuncio
            </Button>
          )}
        </Box>
      </Box>

      <Box
        p={"20px"}
        margin={"20px 0px"}
        gap={"150px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Stack mt={"50px"} gap={"20px"}>
          <Text color={"#000000"} fontSize={"2xl"} fontWeight={"600"}>
            Leilão
          </Text>
          <Carousel>
            {arrayItens.map((key) => {
              return (
                <CardAuction
                  key={key + Math.random()}
                  admin={admin}
                ></CardAuction>
              );
            })}
          </Carousel>
        </Stack>

        <Stack id={"Carros"} mt={"50px"} gap={"20px"}>
          <Text color={"#000000"} fontSize={"2xl"} fontWeight={"600"}>
            Carros
          </Text>
          <Carousel>
            {data &&
              filterTypeVehicle("Carro").map((elem, key) => {
                return (
                  <CardAd
                    resetData={makeRequest}
                    admin={admin}
                    key={key + Math.random()}
                    data={elem}
                  ></CardAd>
                );
              })}
          </Carousel>
        </Stack>

        <Stack id={"Motos"} mt={"50px"} gap={"20px"}>
          <Text color={"#000000"} fontSize={"2xl"} fontWeight={"600"}>
            Motos
          </Text>
          <Carousel>
            {data &&
              filterTypeVehicle("Moto").map((elem, key) => {
                return (
                  <CardAd
                    resetData={makeRequest}
                    admin={admin}
                    key={key + Math.random()}
                    data={elem}
                  ></CardAd>
                );
              })}
          </Carousel>
        </Stack>
      </Box>
      <Footer></Footer>
      <AdCreate
        resetData={makeRequest}
        isOpen={createAd}
        onClose={handleCreateAd}
      ></AdCreate>
    </Box>
  );
}
