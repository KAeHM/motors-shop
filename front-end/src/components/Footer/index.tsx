import React from "react";

import { Box, IconButton, Image, Text, useMediaQuery } from "@chakra-ui/react";
import logo from "../../assets/logo2.svg";
import { RiArrowUpSLine } from "react-icons/ri";
import * as Scroll from "react-scroll";

export default function Footer() {
  const [isLargerThan768] = useMediaQuery("(min-width: 769px)");

  const scroller = Scroll.animateScroll;

  return (
    <Box
      bg={"black"}
      h={isLargerThan768 ? "80px" : "310px"}
      display={"flex"}
      flexDirection={isLargerThan768 ? "row" : "column"}
      justifyContent={isLargerThan768 ? "space-between" : "space-evenly"}
      alignItems={"center"}
      padding={"0px 50px"}
    >
      <Image src={logo} />
      <Text fontSize={"sm"} color={"white"}>
        © 2022 - Todos os direitos reservados.
      </Text>
      <IconButton
        bg={"#212529"}
        color={"white"}
        aria-label="Return Start"
        icon={<RiArrowUpSLine size={"30px"} />}
        variant={"solid"}
        cursor={"pointer"}
        onClick={() => {
          scroller.scrollToTop({
            duration: 500,
            delay: 100,
            smooth: true,
            offset: 50,
          });
        }}
      ></IconButton>
    </Box>
  );
}
