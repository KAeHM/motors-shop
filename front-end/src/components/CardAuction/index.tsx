import React from "react";
import {
  Avatar,
  Box,
  Button,
  Icon,
  Stack,
  Tag,
  TagLabel,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { SlClock } from "react-icons/sl";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { UserContext } from "../../contexts/userContext";

interface IMainProps {
  admin?: boolean;
}

export default function CardAuction({ admin }: IMainProps) {
  const [isLargerThan768] = useMediaQuery("(min-width: 769px)");
  const { getColor } = React.useContext(UserContext);

  return (
    <Box
      maxW={isLargerThan768 ? "730px" : "290px"}
      minW={isLargerThan768 ? "730px" : "290px"}
      h={"450px"}
    >
      <Box
        backgroundPosition={"50%"}
        backgroundRepeat={"no-repeat"}
        backgroundImage={`linear-gradient(180deg, rgba(0, 0, 0, 0.29) 0%, #000000 100%), url(https://garagem360.com.br/wp-content/uploads/2022/10/2.jpg)`}
        p={"20px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"16px"}
      >
        <Tag mb={"79px"} maxW={"125px"} size="lg" borderRadius="full" gap={2}>
          <Icon as={SlClock} color={"purple.900"} />
          <TagLabel>01:58:00</TagLabel>
        </Tag>

        <Text
          color={"#FDFDFD"}
          fontSize={"lg"}
          lineHeight={"25px"}
          fontWeight={"600"}
          noOfLines={1}
        >
          Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200{" "}
        </Text>
        <Text
          color={"#CED4DA"}
          fontSize={"md"}
          lineHeight={"28px"}
          fontWeight={"400"}
          noOfLines={3}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry Lorem Ipsum is simply dummy text of the printing and
          typesetting industry Lorem Ipsum is simply dummy text of the printing
          and typesetting industry
        </Text>
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar
            name="Samuel Lima"
            bg={getColor()}
            color={"white"}
            size={"sm"}
          ></Avatar>
          <Text
            color={"#FFFFFF"}
            fontSize={"sm"}
            lineHeight={"24px"}
            fontWeight={"500"}
          >
            Samuel Lima
          </Text>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"}>
            <Tag
              padding={"4px 8px"}
              width={"52px"}
              height={"32px"}
              borderRadius={"4px"}
              bg={"brand.100"}
              textColor={"brand.500"}
            >
              0 KM
            </Tag>
            <Tag
              padding={"4px 8px"}
              width={"52px"}
              height={"32px"}
              borderRadius={"4px"}
              bg={"brand.100"}
              textColor={"brand.500"}
            >
              2013
            </Tag>
          </Stack>
          <Text color={"#FFFFFF"} fontSize={"md"} fontWeight={"500"}>
            R$ 00.000,00
          </Text>
        </Stack>
      </Box>

      <Box
        height={"60px"}
        bg={"brand.500"}
        padding={"0px 25px"}
        display={"flex"}
        alignItems={"center"}
        cursor={"pointer"}
      >
        {admin ? (
          <Stack direction={"row"}>
            <Button
              color={"#FDFDFD"}
              borderColor={"#FDFDFD"}
              variant={"outline"}
            >
              Editar
            </Button>
            <Button
              color={"#FDFDFD"}
              borderColor={"#FDFDFD"}
              variant={"outline"}
            >
              Ver Como
            </Button>
          </Stack>
        ) : (
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Text color={"#FFFFFF"} fontSize={"md"} fontWeight={"600"}>
              Acessar página leilão
            </Text>
            <HiOutlineArrowNarrowRight
              size={"35px"}
              color={"white"}
            ></HiOutlineArrowNarrowRight>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
