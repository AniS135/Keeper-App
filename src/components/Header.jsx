import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";

function Header() {
  return (
    <Flex as={"nav"} alignItems={"center"} justifyContent={"flex-start"} gap={"1rem"}>
      <HighlightIcon/>
      <h1>
        Keeper
      </h1>
      <Spacer />
      <Text>{localStorage.getItem('username') || "Guest"}</Text>
      <Button varient = "ghost"> Logout </Button>
    </Flex>
  );
}

export default Header;
