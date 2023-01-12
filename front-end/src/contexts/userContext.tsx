import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IMainProps {
  children?: React.ReactNode;
}

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  isSeller?: boolean;
  cpf?: string;
  phone?: string;
  birthdate?: string;
  description?: string;
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  complement?: string;
}

interface IContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<object>>;
  viewProduct: string | undefined;
  setViewProduct: React.Dispatch<React.SetStateAction<any>>;
  viewProfile: IUser;
  setViewProfile: React.Dispatch<React.SetStateAction<any>>;
  getUser: any;
  getColor: any;
}

export const UserContext = React.createContext({} as IContext);

export const UserContextProvider = ({ children }: IMainProps) => {
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState({});
  const firstRender = React.useRef(false);

  const [viewProduct, setViewProduct] = React.useState("");
  const [viewProfile, setViewProfile] = React.useState({});

  const navigate = useNavigate();

  function getColor(id?: string) {
    const arrayColors = [
      "#E34D8C",
      "#C04277",
      "#7D2A4D",
      "#7000FF",
      "#6200E3",
      "#36007D",
      "#349974",
      "#2A7D5F",
      "#153D2E",
      "#6100FF",
      "#5700E3",
      "#30007D",
    ];

    if (id) {
      return arrayColors[parseInt(id[0])];
    }

    let numberSort = Math.floor(Math.random() * arrayColors.length);
    let colorSort = arrayColors[numberSort];
    return colorSort;
  }

  function getUser(token: string) {
    axios
      .get("http://localhost:3000/user/profile", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch((err) => {
        navigate("/login");
      });
  }

  React.useEffect(() => {
    if (!localStorage.getItem("profileColor")) {
      localStorage.setItem("profileColor", getColor());
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("viewProduct")) {
      setViewProduct(JSON.parse(localStorage.getItem("viewProduct")!));
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("viewProfile")) {
      setViewProfile(JSON.parse(localStorage.getItem("viewProfile")!));
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem("token")!));
    }
  });

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        viewProduct,
        viewProfile,
        setToken,
        setUser,
        setViewProduct,
        setViewProfile,
        getUser,
        getColor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
