import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

export default function Header() {
  const [isLargerThan768] = useMediaQuery("(min-width: 769px)");

  return <Box>{isLargerThan768 ? <HeaderDesktop /> : <HeaderMobile />}</Box>;
}
