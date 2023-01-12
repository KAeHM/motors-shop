import React from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import InputComponent from "../../components/InputComponent";
import Footer from "../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditPassword({}) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [samePassword, setSamePassword] = React.useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  function verifyPassword() {
    setSamePassword(password === confirmPassword);
  }

  function makeRequest() {
    axios
      .patch("http://localhost:3000/user/edit-password", { password, id })
      .then((res) => {
        toast.success("Senha alterada com sucesso! Faça o login");
        navigate("/login");
      });
  }

  React.useEffect(verifyPassword, [confirmPassword, password]);

  return (
    <Box overflowX={"hidden"} w={"100vw"} h={"100vh"}>
      <Header></Header>
      <Box
        bg={"#F1F3F5"}
        display={"flex"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Card bg={"#FDFDFD"} w={"510px"}>
          <CardHeader>
            <Heading size="md">Mudar Senha</Heading>
          </CardHeader>

          <CardBody>
            <InputComponent
              formLabel="Senha"
              inputType={"password"}
              value={password}
              setValue={setPassword}
            ></InputComponent>
            <InputComponent
              formLabel="Confirmar Senha"
              inputType={"password"}
              value={confirmPassword}
              isError={!samePassword}
              formErrorMessage={"As senhas devem ser iguais"}
              setValue={setConfirmPassword}
            ></InputComponent>
          </CardBody>

          <CardFooter alignSelf={"flex-end"}>
            <Button
              onClick={() => {
                if (samePassword) {
                  makeRequest();
                }
              }}
              bg={"brand.500"}
              textColor={"white"}
              mr={3}
            >
              Mudar Senha
            </Button>
          </CardFooter>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}
