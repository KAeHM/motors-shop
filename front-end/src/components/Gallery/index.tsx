import React from "react";

import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";

interface IMainProps {
  data: string[];
}

export default function Gallery({ data }: IMainProps) {
  const [isLargerThan768] = useMediaQuery("(min-width: 769px)");

  return (
    <Box
      bg={"#FDFDFD"}
      borderRadius={"4px"}
      w={isLargerThan768 ? "420px" : "310px"}
      display={"flex"}
      h={"380px"}
      flexDirection={"column"}
      p={"0px 50px"}
      gap={"20px"}
      alignContent={"center"}
      justifyContent={"center"}
      overflowY={"auto"}
    >
      <Text fontSize={"lg"} fontWeight={"600"}>
        Fotos
      </Text>
      <Box display={"flex"} gap={"10px"} flexWrap={"wrap"} maxW={"320px"}>
        {data.map((elem, key) => {
          return (
            <Box
              key={key + Math.random()}
              w={"100px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              h={"100px"}
              bg={"#E9ECEF"}
              margin={"0px"}
            >
              <Image objectFit={"cover"} src={elem}></Image>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
