import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  CardFooter,
  Image,
  Text,
  Avatar,
  Box,
  Tag,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import AdCreate from "../Modals/AdCreate";

interface IMainProps {
  admin?: boolean;
  data: IDataVehicle;
  resetData?: any;
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
  user?: IDataUser;
}

interface IDataUser {
  id: string;
  name: string;
}

export default function CardAd({ admin, data, resetData }: IMainProps) {
  const { setViewProduct, getColor } = React.useContext(UserContext);
  const navigate = useNavigate();

  const [editAd, setEditAd] = React.useState(false);

  function handleEditAd() {
    setEditAd(!editAd);
  }

  return (
    <Card
      variant={"unstyled"}
      display={"flex"}
      direction={"column"}
      gap={"20px"}
      mb={"10px"}
      minW={{ sm: "320px" }}
      maxW={{ sm: "320px" }}
    >
      <CardBody>
        <Box
          _hover={{ border: "2px solid #5126EA" }}
          border={"2px solid transparent"}
          bg={"#E9ECEF"}
          display={"flex"}
          justifyContent={"center"}
          cursor={"pointer"}
          borderRadius="lg"
          onClick={() => {
            setViewProduct(data.id);
            navigate("/product");
          }}
        >
          <Image src={data.coverImage} alt="Car Image" borderRadius="lg" />
        </Box>
        <Stack mt="6" spacing="3">
          <Heading noOfLines={1} size="sm">
            {data.name}
          </Heading>
          <Text color="textColor.200" size="sm" noOfLines={2}>
            {data.description}
          </Text>
          <Stack alignItems={"center"} direction={"row"}>
            <Avatar
              bg={getColor(data.user?.id)}
              color={"white"}
              size={"sm"}
              name={data.user?.name}
            />
            <Text fontSize="sm">{data.user?.name}</Text>
          </Stack>
        </Stack>
      </CardBody>

      <CardFooter
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={"10px"}>
          <Tag
            padding={"4px 8px"}
            height={"32px"}
            borderRadius={"4px"}
            bg={"brand.100"}
            textColor={"brand.500"}
          >
            {data.km} KM
          </Tag>
          <Tag
            padding={"4px 8px"}
            height={"32px"}
            borderRadius={"4px"}
            bg={"brand.100"}
            textColor={"brand.500"}
          >
            {data.year}
          </Tag>
        </Stack>
        <Text fontWeight={"500"} fontSize="lg">
          R$ {data.price}
        </Text>
      </CardFooter>
      {admin && (
        <Stack direction={"row"}>
          <Button
            onClick={handleEditAd}
            color={"#212529"}
            borderColor={"#212529"}
            variant={"outline"}
          >
            Editar
          </Button>
          <Button color={"#212529"} borderColor={"#212529"} variant={"outline"}>
            Ver Como
          </Button>
        </Stack>
      )}
      <AdCreate
        data={data}
        resetData={resetData}
        isOpen={editAd}
        onClose={handleEditAd}
      ></AdCreate>
    </Card>
  );
}
