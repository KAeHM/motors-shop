import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-scroll";

import { UserContext } from "../../../contexts/userContext";

import { NavLink } from "react-router-dom";
import AccountEdit from "../../Modals/AccountEdit";
import AddressEdit from "../../Modals/AddressEdit";

export default function HeaderMobile() {
  const options = ["Carros", "Motos", "Leilão"];

  const [accountEdit, setAccountEdit] = React.useState(false);
  const [addressEdit, setAddressEdit] = React.useState(false);

  function hadleAddressEdit() {
    setAddressEdit(!addressEdit);
  }

  function handleAccountEdit() {
    setAccountEdit(!accountEdit);
  }

  const { user, setUser, setViewProfile, getColor } =
    React.useContext(UserContext);

  function verifyIfIsLogged() {
    return Object.keys(user).length;
  }

  return (
    <Box
      bg={"gray.100"}
      h={"80px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"0px 20px"}
      borderBottom={"2px solid #DEE2E6 "}
    >
      <NavLink to={"/home"}>
        <Image src={logo} w={"150px"} h={"100%"} />
      </NavLink>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<GiHamburgerMenu />}
          variant="outline"
        />
        <MenuList>
          <Stack p={"15px 0px"} alignItems={"center"} gap={"5px"}>
            {options.map((elem, key) => {
              return (
                <Text
                  color={"#495057"}
                  fontWeight={"28px"}
                  cursor={"pointer"}
                  key={key + Math.random()}
                >
                  <Link smooth={true} offset={50} duration={500} to={elem}>
                    {elem}
                  </Link>
                </Text>
              );
            })}
          </Stack>

          <Divider bg={"#DEE2E6"} w={"100%"} height={"2px"}></Divider>

          <Stack p={"15px 10px"} justifyContent={"center"} direction={"row"}>
            {verifyIfIsLogged() ? (
              <Box>
                <Menu isLazy>
                  <MenuButton>
                    <Stack direction={"row"} gap={"2px"} alignItems={"center"}>
                      <Avatar
                        color={"white"}
                        bg={getColor(user.id)}
                        size={"sm"}
                        name={user.name}
                      />
                      <Text>{user.name}</Text>
                    </Stack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={handleAccountEdit}>
                      Editar Perfil
                    </MenuItem>
                    <MenuItem onClick={hadleAddressEdit}>
                      Editar Endereço
                    </MenuItem>
                    {user.isSeller && (
                      <NavLink
                        onClick={() => {
                          setViewProfile(user);
                        }}
                        to={"/profile"}
                      >
                        <MenuItem>Meus Anuncios</MenuItem>
                      </NavLink>
                    )}
                    <MenuItem
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setUser({});
                      }}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              <Box display={"flex"} gap={"20px"}>
                <NavLink to={"/login"}>
                  <Button color={"brand.500"} variant={"ghots"}>
                    Fazer Login
                  </Button>
                </NavLink>
                <NavLink to={"/register"}>
                  <Button color={"#495057"} variant={"outline"}>
                    Cadastrar
                  </Button>
                </NavLink>
              </Box>
            )}
          </Stack>
        </MenuList>
      </Menu>
      <AccountEdit
        isOpen={accountEdit}
        onClose={handleAccountEdit}
      ></AccountEdit>
      <AddressEdit
        isOpen={addressEdit}
        onClose={hadleAddressEdit}
      ></AddressEdit>
    </Box>
  );
}
