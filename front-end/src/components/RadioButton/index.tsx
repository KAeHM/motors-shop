import { useRadio, useRadioGroup, HStack, Box } from "@chakra-ui/react";

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box w={"100%"} as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="4px"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        fontWeight={"600"}
        _checked={{
          bg: "brand.700",
          color: "white",
          borderColor: "brand.500",
        }}
        px={"12px"}
        py={"12px"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

interface IMainProps {
  name: string;
  defaultValue: string;
  options: string[];
  onChange: (eventOrValue: Function | void | string) => void;
}

export default function RadioButtons({
  name,
  defaultValue,
  options,
  onChange,
}: IMainProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: defaultValue,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
