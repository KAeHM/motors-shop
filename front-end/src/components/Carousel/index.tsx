import React from "react";
import { Box } from "@chakra-ui/react";

interface IMainProps {
  children: React.ReactNode;
}

export default function Carousel({ children }: IMainProps) {
  return (
    <Box
      display={"flex"}
      flexWrap={"nowrap"}
      overflowY={"auto"}
      sx={{
        "&::-webkit-scrollbar": {
          height: "8px",
          backgroundColor: "brand.100",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "brand.300",
        },
      }}
      gap={"36px"}
    >
      {children}
    </Box>
  );
}
