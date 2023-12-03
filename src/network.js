// network.js
import axios from "axios";

export const addContactOnServer = async (name, email, phoneNumber, username) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/contacts.json`,
      { name, email, phoneNumber, username }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllContacts = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/contacts.json`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateContactOnServer = async (name, email, phoneNumber, username, id) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER}/contacts/${id}.json`,
      { name, email, phoneNumber, username }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteContactOnServer = async (id) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}/contacts/${id}.json`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getContactById = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/contacts/${id}.json`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
