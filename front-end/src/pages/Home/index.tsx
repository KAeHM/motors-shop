import React from "react";

import Header from "../../components/Header";
import { Box, Button, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import Carousel from "../../components/Carousel";
import CardAuction from "../../components/CardAuction";
import CardAd from "../../components/CardAd";
import Footer from "../../components/Footer";
import { Link } from "react-scroll";

import axios from "axios";

export default function Home() {
  const [isLargerThan768] = useMediaQuery("(min-width: 769px)");
  const arrayItens = [1, 2, 3]; // array enquanto a API não está pronta para o carrossel
  const [data, setData] = React.useState([] as any);

  React.useEffect(() => {
    axios.get("http://localhost:3000/listings").then((res) => {
      setData(res.data);
    });
  }, []);

  function filterTypeVehicle(type: string): object[] {
    return data.filter((elem: any) => {
      if (elem.typeVehicle === type) {
        return elem;
      }
    });
  }

  return (
    <Box>
      <Header></Header>
      <Box
        h={"600px"}
        bg={"brand.500"}
        w={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Text
          fontWeight={"700"}
          fontSize={"4xl"}
          textAlign={"center"}
          color={"#FDFDFD"}
        >
          Velocidade e experiência em um lugar feito para você
        </Text>
        <Text
          fontWeight={"400"}
          fontSize={"md"}
          textAlign={"center"}
          color={"#F8F9FA"}
        >
          Um ambiente feito para você explorar o seu melhor
        </Text>
        <Stack mt={"20px"} direction={isLargerThan768 ? "row" : "column"}>
          <Link smooth={true} offset={50} duration={500} to="Carros">
            <Button w={"180px"} color={"#FDFDFD"} variant={"outline"}>
              Carros
            </Button>
          </Link>
          <Link smooth={true} offset={50} duration={500} to="Motos">
            <Button w={"180px"} color={"#FDFDFD"} variant={"outline"}>
              Motos
            </Button>
          </Link>
        </Stack>
      </Box>

      <Box
        p={"20px"}
        margin={"20px 0px"}
        gap={"50px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Stack mt={"50px"} gap={"20px"}>
          <Text color={"#000000"} fontSize={"2xl"} fontWeight={"600"}>
            Leilão
          </Text>
          <Carousel>
            {arrayItens.map((key) => {
              return <CardAuction key={key + Math.random()}></CardAuction>;
            })}
          </Carousel>
        </Stack>

        <Stack id="Carros" mt={"50px"} gap={"20px"}>
          <Text color={"#000000"} fontSize={"2xl"} fontWeight={"600"}>
            Carros
          </Text>
          <Carousel>
            {data &&
              filterTypeVehicle("Carro").map((elem, key) => {
                return <CardAd key={key + Math.random()} data={elem}></CardAd>;
              })}
          </Carousel>
        </Stack>

        <Stack id="Motos" mt={"50px"} gap={"20px"}>
          <Text color={"#000000"} fontSize={"2xl"} fontWeight={"600"}>
            Motos
          </Text>
          <Carousel>
            {data &&
              filterTypeVehicle("Moto").map((elem, key) => {
                return <CardAd key={key + Math.random()} data={elem}></CardAd>;
              })}
          </Carousel>
        </Stack>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
