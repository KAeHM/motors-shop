import React from "react";

import { Box, Stack, Text, Button } from "@chakra-ui/react";

import axios from "axios";
import Header from "../../components/Header";
import InputComponent from "../../components/InputComponent";

import { UserContext } from "../../contexts/userContext";

import toast from "react-hot-toast";

import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import RecoveryPassword from "../../components/Modals/RecoveryPassword";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setToken, getUser } = React.useContext(UserContext);

  const [recoveryPassword, setRecoveryPassword] = React.useState(false);

  function handleRecoveryPassword() {
    setRecoveryPassword(!recoveryPassword);
  }

  function makeLogin() {
    axios
      .post("http://localhost:3000/login/", { email, password })
      .then((e) => {
        localStorage.setItem("token", JSON.stringify(e.data.token));
        setToken(e.data.token);
        getUser(e.data.token);
      })
      .catch((error) => toast.error("Email ou senha inválidos"));
  }

  return (
    <Box h={"100vh"}>
      <Header></Header>
      <Box
        h={"100%"}
        bg={"#F1F3F5"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          borderRadius={"4px"}
          p={"44px"}
          bg={"white"}
          maxW={"420px"}
          m={"46px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          <Text mb={"12px"} fontSize={"2xl"} fontWeight={"bold"}>
            Login
          </Text>

          <Stack mt={"3"} spacing={"3"}>
            <InputComponent
              placeholder="Digitar Usuário"
              formLabel="Usuário"
              inputType="text"
              value={email}
              setValue={setEmail}
            />
            <InputComponent
              placeholder="Digitar Senha"
              formLabel="Senha"
              inputType="password"
              value={password}
              setValue={setPassword}
            />
            <Text
              onClick={handleRecoveryPassword}
              cursor={"pointer"}
              alignSelf={"flex-end"}
            >
              Esqueci minha senha
            </Text>
          </Stack>

          <Button
            h={"48px"}
            w={"100%"}
            bg={"brand.500"}
            textColor={"white"}
            onClick={makeLogin}
          >
            Entrar
          </Button>

          <Text textAlign={"center"}>Ainda não possui uma conta?</Text>

          <NavLink to={"/register"}>
            <Button
              h={"48px"}
              w={"100%"}
              variant={"outline"}
              borderColor={"#DEE2E6"}
              textColor={"#495057"}
            >
              Cadastrar
            </Button>
          </NavLink>
        </Box>
      </Box>
      <Footer></Footer>
      <RecoveryPassword
        isOpen={recoveryPassword}
        onClose={handleRecoveryPassword}
      ></RecoveryPassword>
    </Box>
  );
}
