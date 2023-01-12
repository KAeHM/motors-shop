import React from "react";

import * as yup from "yup";
import axios from "axios";

import toast from "react-hot-toast";

import { Box, Stack, Textarea, Text, Button } from "@chakra-ui/react";
import Header from "../../components/Header";
import InputComponent from "../../components/InputComponent";
import RadioButtons from "../../components/RadioButton";
import Footer from "../../components/Footer";
import SucessAccountCreate from "../../components/Modals/SucessAccountCreate";

interface IArrayErrors {
  field: string;
  message: string;
}

interface IObjectErrors {
  [key: string]: { should: boolean; message: string };
}

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required({ field: "name", message: "O campo nome é requirido" }),
  email: yup
    .string()
    .email({ field: "email", message: "Insira um email valido" })
    .required({ field: "email", message: "O campo email é requirido" }),
  password: yup
    .string()
    .required({ field: "password", message: "O campo senha é requirido" }),
  confirmPassword: yup
    .string()
    .equals([yup.ref("password")], {
      field: "confirmPassword",
      message: "As duas senhas devem ser iguais",
    })
    .required({
      field: "confirmPassword",
      message: "O campo confirmar senha é requirido",
    }),
  cpf: yup
    .string()
    .max(11, {
      field: "cpf",
      message: "Insira um cpf válido",
    })
    .min(11, {
      field: "cpf",
      message: "Insira um cpf válido",
    })
    .required({
      field: "cpf",
      message: "O campo cpf é requirido",
    }),
  phone: yup
    .string()
    .max(11, {
      field: "phone",
      message: "Insira um celular válido",
    })
    .min(11, {
      field: "phone",
      message: "Insira um celular válido",
    })
    .required({
      field: "phone",
      message: "O campo celular é requirido",
    }),
  birthdate: yup.date().required({
    field: "birthdate",
    message: "O campo data de nascimento é requirido",
  }),
  description: yup.string().required({
    field: "description",
    message: "O campo descrição é requirido",
  }),
  cep: yup
    .string()
    .max(8, {
      field: "cep",
      message: "Insira um cep válido",
    })
    .min(8, {
      field: "cep",
      message: "Insira um cep válido",
    })
    .required({
      field: "cep",
      message: "O campo cep é requirido",
    }),
  city: yup.string().required({
    field: "city",
    message: "O campo cidade é requirido",
  }),
  street: yup.string().required({
    field: "street",
    message: "O campo rua é requirido",
  }),
  state: yup.string().required({
    field: "state",
    message: "O campo estado é requirido",
  }),
  number: yup.string().required({
    field: "number",
    message: "O campo numero é requirido",
  }),
});

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isSeller, setIsSeller] = React.useState(false);
  const [cpf, setCpf] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthdate, setBirthDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [city, setCity] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [state, setState] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [reference, setReference] = React.useState("");

  const [sucessLogin, setSucessLogin] = React.useState(false);

  const [allErrors, setAllError] = React.useState([] as IArrayErrors[]);
  const [objErrors, setObjErrors] = React.useState({
    name: { should: false, message: "" },
    email: { should: false, message: "" },
    password: { should: false, message: "" },
    confirmPassword: { should: false, message: "" },
    isSeller: { should: false, message: "" },
    cpf: { should: false, message: "" },
    phone: { should: false, message: "" },
    birthdate: { should: false, message: "" },
    description: { should: false, message: "" },
    cep: { should: false, message: "" },
    city: { should: false, message: "" },
    street: { should: false, message: "" },
    state: { should: false, message: "" },
    number: { should: false, message: "" },
  } as IObjectErrors);

  function getError() {
    const newObject = { ...objErrors };
    allErrors.map((elem) => {
      newObject[elem.field] = { should: true, message: elem.message };
    });
    console.log(newObject);
    setObjErrors(newObject);
  }

  function handleIsSeller(type: any) {
    if (type === "Comprador") {
      setIsSeller(false);
    }
    setIsSeller(true);
  }

  function makeRequest(data: object) {
    axios
      .post("http://localhost:3000/user/register/", data)
      .then((res) => {
        setSucessLogin(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo deu errado!");
      });
  }

  function makeObject() {
    const obj = {
      name,
      email,
      password,
      confirmPassword,
      isSeller,
      cpf,
      phone,
      birthdate,
      description,
      cep,
      city,
      street,
      state,
      number,
      reference,
    };

    return obj;
  }

  React.useEffect(() => {
    getError();
  }, [allErrors]);

  return (
    <Box>
      <Header></Header>
      <Box
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
          <Text mb={"12px"} fontSize={"xl"} fontWeight={500}>
            Cadastro
          </Text>

          <Stack mt={"3"} spacing={"3"}>
            <Text mb={"5px"} fontWeight={500}>
              Informações Pessoais
            </Text>

            <InputComponent
              placeholder="Ex: Samuel Leão"
              formLabel="Nome"
              inputType="text"
              value={name}
              setValue={setName}
              isError={objErrors.name.should}
              formErrorMessage={objErrors.name.message}
            />
            <InputComponent
              placeholder="Ex: samuel@kenzie.com.br"
              formLabel="Email"
              inputType="email"
              value={email}
              setValue={setEmail}
              isError={objErrors.email.should}
              formErrorMessage={objErrors.email.message}
            />
            <InputComponent
              placeholder="000.000.000-00"
              formLabel="CPF"
              inputType="text"
              value={cpf}
              setValue={setCpf}
              isError={objErrors.cpf.should}
              formErrorMessage={objErrors.name.message}
            />
            <InputComponent
              placeholder="(DDD) 90000-0000"
              formLabel="Celular"
              inputType="text"
              value={phone}
              setValue={setPhone}
              isError={objErrors.phone.should}
              formErrorMessage={objErrors.phone.message}
            />
            <InputComponent
              placeholder="00/00/00"
              formLabel="Data de nascimento"
              inputType="date"
              value={birthdate}
              setValue={setBirthDate}
              isError={objErrors.birthdate.should}
              formErrorMessage={objErrors.birthdate.message}
            />
            <Box>
              <Text mb={"5px"} fontWeight={500}>
                Descrição
              </Text>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Escreva algo sobre você!"
              ></Textarea>
            </Box>
          </Stack>

          <Stack mt={"3"} spacing={"3"}>
            <Text mb={"5px"} fontWeight={500}>
              Infomações de endereço
            </Text>

            <InputComponent
              formLabel="CEP"
              inputType="text"
              placeholder="89888.888"
              value={cep}
              setValue={setCep}
              isError={objErrors.cep.should}
              formErrorMessage={objErrors.cep.message}
            />
            <Stack direction={"row"}>
              <InputComponent
                formLabel="Estado"
                inputType="text"
                placeholder="Paraná"
                value={state}
                setValue={setState}
                isError={objErrors.state.should}
                formErrorMessage={objErrors.state.message}
              />
              <InputComponent
                formLabel="Cidade"
                inputType="text"
                placeholder="Curitiba"
                value={city}
                setValue={setCity}
                isError={objErrors.city.should}
                formErrorMessage={objErrors.city.message}
              />
            </Stack>
            <InputComponent
              formLabel="Rua"
              inputType="text"
              placeholder="Rua do paraná"
              value={street}
              setValue={setStreet}
              isError={objErrors.street.should}
              formErrorMessage={objErrors.street.message}
            />
            <Stack direction={"row"}>
              <InputComponent
                formLabel="Número"
                inputType="text"
                placeholder="1029"
                value={number}
                setValue={setNumber}
                isError={objErrors.number.should}
                formErrorMessage={objErrors.number.message}
              />
              <InputComponent
                formLabel="Complemento"
                inputType="text"
                placeholder="Apart 12"
                value={reference}
                setValue={setReference}
              />
            </Stack>
          </Stack>

          <Stack mt={"3"} spacing={"3"}>
            <Text mb={"5px"} fontWeight={500}>
              Tipo de conta
            </Text>

            <Box w={"100%"}>
              <RadioButtons
                name={"typeacount"}
                defaultValue={"Comprador"}
                options={["Comprador", "Anunciante"]}
                onChange={handleIsSeller}
              />
            </Box>

            <InputComponent
              formLabel="Senha"
              inputType="password"
              placeholder="Digitar Senha"
              value={password}
              setValue={setPassword}
              isError={objErrors.password.should}
              formErrorMessage={objErrors.password.message}
            />
            <InputComponent
              formLabel="Confirmar Senha"
              inputType="password"
              placeholder="Digitar Senha"
              value={confirmPassword}
              setValue={setConfirmPassword}
              isError={objErrors.confirmPassword.should}
              formErrorMessage={objErrors.confirmPassword.message}
            />
          </Stack>

          <Button
            h={"48px"}
            w={"100%"}
            bg={"brand.500"}
            textColor={"white"}
            mt={"30px"}
            onClick={() => {
              registerSchema
                .validate(makeObject(), { abortEarly: false })
                .then((responseData) => {
                  makeRequest(responseData);
                })
                .catch((err) => {
                  setAllError(err.errors);
                });
            }}
          >
            Finalizar Cadastro
          </Button>
        </Box>
      </Box>
      <SucessAccountCreate
        isOpen={sucessLogin}
        onClose={console.log}
      ></SucessAccountCreate>
      ;<Footer></Footer>
    </Box>
  );
}
