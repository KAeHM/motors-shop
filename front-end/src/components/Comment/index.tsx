import React from "react";

import { Box, Stack, Avatar, SkeletonCircle, Text } from "@chakra-ui/react";
import { UserContext } from "../../contexts/userContext";

interface IComments {
  id: string;
  message: string;
  createdAt: string;
  user: IDataUser;
}

interface IDataUser {
  id: string;
  name: string;
  description: string;
}

interface IMainProps {
  data: IComments;
}

export default function Comment({ data }: IMainProps) {
  const { getColor } = React.useContext(UserContext);

  function RelativeDate() {
    const rtf = new Intl.RelativeTimeFormat("pt-BR", {
      localeMatcher: "best fit",
      numeric: "always",
      style: "long",
    });

    const newData = new Date(data.createdAt);
    const dateNow = new Date(Date.now());

    const sameYear = newData.getFullYear() === dateNow.getFullYear();
    const sameMonth = newData.getMonth() === dateNow.getMonth();
    const sameDay = newData.getDay() === dateNow.getDay();
    const sameHour = newData.getHours() === dateNow.getHours();

    if (sameYear && sameMonth && sameDay && sameHour) {
      return "Há alguns minutos";
    }
    if (sameYear && sameMonth && sameDay) {
      let result = newData.getHours() - dateNow.getHours();
      return rtf.format(result, "hours");
    }
    if (sameYear && sameMonth) {
      let result = newData.getDay() - dateNow.getDay();
      return rtf.format(result, "days");
    }
    if (sameYear) {
      let result = newData.getMonth() - dateNow.getMonth();
      return rtf.format(result, "months");
    }
    let result = newData.getFullYear() - dateNow.getFullYear();
    return rtf.format(result, "years");
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
      <Stack direction={"row"} alignItems={"center"}>
        <Avatar
          size={"md"}
          bg={getColor(data.user.id)}
          name={data.user.name}
        ></Avatar>
        <Text color={"#212529"} fontWeight={"500"} fontSize={"lg"}>
          {data.user.name}
        </Text>
        <SkeletonCircle
          startColor="#ADB5BD"
          endColor="#ADB5BD"
          size={"1"}
        ></SkeletonCircle>
        <Text color={"#868E96"}>{RelativeDate()}</Text>
      </Stack>
      <Text>{data.message}</Text>
    </Box>
  );
}
