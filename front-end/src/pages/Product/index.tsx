import React from "react";

import {
  Box,
  Image,
  useMediaQuery,
  Text,
  Stack,
  Tag,
  Button,
  Avatar,
  Textarea,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Gallery from "../../components/Gallery";
import Comment from "../../components/Comment";
import Footer from "../../components/Footer";
import { UserContext } from "../../contexts/userContext";
import axios from "axios";

interface IDataVehicle {
  id?: string;
  listingType?: string;
  name?: string;
  year?: string;
  km?: string;
  price?: string;
  description?: string;
  typeVehicle?: string;
  coverImage: string;
  user?: IDataUser;
  comments: IComments[];
}

interface IComments {
  id: string;
  message: string;
  createdAt: string;
  user: IDataUser;
}

interface IDataUser {
  id: string;
  name: string;
  description: string;
}

export default function Product() {
  const [isLargerThan768] = useMediaQuery("(min-width: 769px)");
  const [data, setData] = React.useState({} as IDataVehicle);
  const [comment, setComment] = React.useState("");

  const navigate = useNavigate();

  const images = [
    data.coverImage,
    data.coverImage,
    data.coverImage,
    data.coverImage,
    data.coverImage,
  ];

  const { viewProduct, user, setViewProfile, token, getColor } =
    React.useContext(UserContext);

  function getData() {
    axios.get("http://localhost:3000/listings/" + viewProduct).then((res) => {
      localStorage.setItem("viewProduct", JSON.stringify(viewProduct));
      setData(res.data[0]);
    });
  }

  function verifyIfIsLogged() {
    return Object.keys(user).length;
  }

  function makeComment() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .post(
        "http://localhost:3000/comments/register/" + data.id,
        { message: comment },
        config
      )
      .then((res) => {
        getData();
      });
  }

  React.useEffect(() => {
    getData();
  }, [viewProduct]);

  return (
    <Box>
      <Header></Header>
      <Box
        backgroundImage={"linear-gradient(to bottom,#5126EA 60%, #F1F3F5 40%)"}
        w={"100%"}
        p={"10px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          flexDirection={"column"}
          h={isLargerThan768 ? "830px" : "100%"}
          gap={"20px"}
          justifyContent={"center"}
        >
          <Box
            bg={"#FDFDFD"}
            borderRadius={"4px"}
            w={isLargerThan768 ? "800px" : "310px"}
            h={"360px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              objectFit={"cover"}
              boxSize={"100%"}
              src={data.coverImage}
            ></Image>
          </Box>
          <Box
            bg={"#FDFDFD"}
            borderRadius={"4px"}
            w={isLargerThan768 ? "800px" : "310px"}
            h={isLargerThan768 ? "230px" : "300px"}
            display={"flex"}
            flexDirection={"column"}
            p={"30px"}
            gap={"50px"}
          >
            <Text fontSize={"xl"} fontWeight={"700"}>
              {data && data.name}
            </Text>
            <Stack gap={"20px"}>
              <Box display={"flex"} justifyContent={"space-between"} w={"100%"}>
                <Stack direction={"row"}>
                  <Tag
                    padding={"4px 8px"}
                    height={"32px"}
                    borderRadius={"4px"}
                    bg={"brand.100"}
                    textColor={"brand.500"}
                  >
                    {data && data.year}
                  </Tag>
                  <Tag
                    padding={"4px 8px"}
                    height={"32px"}
                    borderRadius={"4px"}
                    bg={"brand.100"}
                    textColor={"brand.500"}
                  >
                    {data && data.km} KM
                  </Tag>
                </Stack>
                <Text size={"lg"} fontWeight={"700"}>
                  R$ {data && data.price}
                </Text>
              </Box>
              <Button w={"100px"} h={"40px"} color={"white"} bg={"brand.500"}>
                Comprar
              </Button>
            </Stack>
          </Box>
          <Box
            bg={"#FDFDFD"}
            borderRadius={"4px"}
            w={isLargerThan768 ? "800px" : "310px"}
            h={isLargerThan768 ? "200px" : "350px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack maxW={isLargerThan768 ? "730px" : "270px"} gap={"10px"}>
              <Text fontSize={"xl"} fontWeight={"700"}>
                Descrição
              </Text>
              <Text
                color={"#495057"}
                noOfLines={5}
                fontWeight={"400"}
                fontSize={"lg"}
              >
                {data && data.description}
              </Text>
            </Stack>
          </Box>
          <Gallery data={images}></Gallery>
          <Box
            bg={"#FDFDFD"}
            borderRadius={"4px"}
            w={isLargerThan768 ? "420px" : "310px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"20px"}
          >
            <Avatar
              size={"xl"}
              bg={getColor(data.user?.id)}
              color={"white"}
              name={data && data.user?.name}
            ></Avatar>
            <Text fontSize={"xl"} fontWeight={"700"}>
              {data && data.user?.name}
            </Text>
            <Text
              textAlign={"center"}
              w={"290px"}
              color={"#495057"}
              fontWeight={"400"}
              fontSize={"lg"}
            >
              {data && data.user?.description}
            </Text>
            <Button
              onClick={() => {
                setViewProfile(data.user);
                navigate("/profile");
              }}
              bg={"#0B0D0D"}
              color={"white"}
              h={"50px"}
            >
              Ver todos anuncios
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"20px"}
        pb={"30px"}
        bg={"#F1F3F5"}
      >
        <Box
          bg={"#F1F3F5"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            bg={"#FDFDFD"}
            borderRadius={"4px"}
            w={isLargerThan768 ? "800px" : "310px"}
            maxH={"800px"}
            display={"flex"}
            flexDirection={"column"}
            p={"35px 40px"}
            gap={"24px"}
          >
            <Text fontSize={"xl"} fontWeight={"700"}>
              Comentarios
            </Text>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"45"}
              overflowY={"auto"}
            >
              {data &&
                data.comments?.map((elem, key) => {
                  return (
                    <Comment key={key + Math.random()} data={elem}></Comment>
                  );
                })}
            </Box>
          </Box>
        </Box>

        <Box
          bg={"#F1F3F5"}
          w={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            bg={"#FDFDFD"}
            borderRadius={"4px"}
            w={isLargerThan768 ? "800px" : "310px"}
            maxH={"800px"}
            display={"flex"}
            flexDirection={"column"}
            p={"35px 40px"}
            gap={"24px"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              {verifyIfIsLogged() ? (
                <Avatar
                  bg={getColor(user.id)}
                  color={"white"}
                  name={user && user.name}
                ></Avatar>
              ) : (
                <></>
              )}
              <Text color={"#212529"} fontWeight={"500"} fontSize={"lg"}>
                {user && user.name}
              </Text>
            </Stack>
            <Box
              display={"flex"}
              flexDirection={isLargerThan768 ? "row" : "column"}
              border={"1px solid #E9ECEF"}
              p={"10px"}
            >
              <Textarea
                placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                border={"none"}
                resize={"none"}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                h={"130px"}
                focusBorderColor={"transparent"}
              />
              <Button
                alignSelf={isLargerThan768 ? "flex-end" : "flex-start"}
                w={"100px"}
                h={"40px"}
                color={"white"}
                bg={"brand.500"}
                disabled={!verifyIfIsLogged()}
                onClick={() => {
                  setComment("");
                  makeComment();
                }}
              >
                Comentar
              </Button>
            </Box>
            <Stack
              direction={"row"}
              flexWrap={"wrap"}
              gap={"10px"}
              justifyContent={isLargerThan768 ? "flex-start" : "center"}
            >
              <Tag
                height={"32px"}
                borderRadius={"24px"}
                bg={"#E9ECEF"}
                textColor={"#868E96"}
              >
                Gostei Muito!
              </Tag>
              <Tag
                height={"32px"}
                borderRadius={"24px"}
                bg={"#E9ECEF"}
                textColor={"#868E96"}
              >
                Incrivel
              </Tag>
              <Tag
                height={"32px"}
                borderRadius={"24px"}
                bg={"#E9ECEF"}
                textColor={"#868E96"}
              >
                Recomendarei para meus amigos
              </Tag>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
