// App.js
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Heading, Flex, Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContactCard from "./components/ContactCard";
import ContactForm from "./components/ContactForm";
import Kmodal from "./components/Kmodal";

import {
  addContactOnServer,
  getAllContacts,
  updateContactOnServer,
  deleteContactOnServer,
} from "./network";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [searchData, setSearchData] = useState("");
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState();

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getAllContacts();
      const tempArray = [];

      if (data !== null) {
        Object.entries(data).forEach(([key, value]) => {
          tempArray.push({
            id: key,
            name: value.name,
            email: value.email,
            phoneNumber: value.phoneNumber || "",
            username: value.username || "",
          });
        });
      }

      setContacts(tempArray);
    };
    fetchContacts();
  }, []);

  const addNewContact = async (name, email, phoneNumber, username) => {
    if (
      contacts.findIndex((contact) => contact.email === email) === -1 &&
      email !== ""
    ) {
      const data = await addContactOnServer(name, email, phoneNumber, username);
      setContacts([...contacts, { name, email, phoneNumber, username, id: data.name }]);
    }
  };

  let searchContacts = contacts.filter((contact) =>
    contact.name.includes(searchData)
  );

  const getContactId = (id) => {
    setContactId(id);
  };

  const updateContact = async (name, email, phoneNumber, username, id) => {
    const data = await updateContactOnServer(name, email, phoneNumber, username, id);

    setContacts((prev) => [
      ...contacts.filter((contact) => contact.id !== id),
      { name: data.name, email: data.email, phoneNumber: data.phoneNumber, username: data.username, id },
    ]);
  };

  const deleteContact = async (id) => {
    const data = await deleteContactOnServer(id);
    if (data === null) {
      setContacts((prev) => [
        ...contacts.filter((contact) => contact.id !== id),
      ]);
    }
  };
  let selectContact = contacts.find((contact) => contact.id === contactId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: "#212529", minHeight: "100vh" }}
    >
      <Kmodal
        isOpen={isOpen}
        title={"Add New Contact"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <ContactForm addNewContact={addNewContact} onClose={onClose} />
      </Kmodal>
      <Kmodal
        isOpen={isOpenEdit}
        title={"Update New Contact"}
        onOpen={onOpenEdit}
        onClose={onCloseEdit}
      >
        <ContactForm
          updateContact={updateContact}
          contact={selectContact}
          onClose={onCloseEdit}
        />
      </Kmodal>
      <Box >
        <Flex p="4" justify="center" align="center" >
          <Image src="/banner.png" w="100px" h="100px" p="2" />
          <Heading as="h1" textTransform="uppercase" p="2" color="white" >
            Contact LIST
          </Heading>
        </Flex>
        <Box p="4">
          <Button
            bg="#14248A"  // F45B69
            color="white"
            w="full"
            fontSize="xl"
            fontWeight="bold"
            colorScheme="#14248A"  // F45B69
            onClick={onOpen}
          >
            <AddIcon h="20px" w="20px" mr="4" /> Add Contact
          </Button>
        </Box>
        <Box p="4">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="#5A0001" />}  // 5A0001
            />
            <Input
              focusBorderColor="#F13030"  // F13030
              type="tel"
              placeholder="Search Contact..."
              onChange={(e) => setSearchData(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box p="4">
          {searchContacts.map((contact) => (
            <ContactCard
              getContactId={getContactId}
              onOpen={onOpenEdit}
              contact={contact}
              key={contact.id}
              deleteContact={deleteContact}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default App;
