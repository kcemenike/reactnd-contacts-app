import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: [],
  };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts,
      }));
    });
  }

  // updating state (in this case, removeContact) using filter
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      }),
    }));
    ContactsAPI.remove(contact);
  };

  render() {
    return (
      <ListContacts
        contacts={this.state.contacts}
        onDeleteContact={this.removeContact}
      />
    );
  }
}

export default App;
