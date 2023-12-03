// ContactForm.js
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = ({ addNewContact, onClose, contact, updateContact }) => {
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phoneNumber, setPhoneNumber] = useState(contact ? contact.phoneNumber : "");
  const [username, setUsername] = useState(contact ? contact.username : "");

  const onSubmit = () => {
    if (contact) {
      updateContact(name, email, phoneNumber, username, contact.id);
      onClose();
    } else {
      addNewContact(name, email, phoneNumber, username);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <Stack>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <Input
            value={phoneNumber}
            type="tel"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        {contact ? (
          <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
            Update Contact
          </Button>
        ) : (
          <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
            Add Contact
          </Button>
        )}
      </Stack>
    </motion.div>
  );
};
export default ContactForm;
