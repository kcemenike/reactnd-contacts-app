import React, { Component } from "react";
import CreateContact from "./CreateContact";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    contacts: [],
    // screen: "list",
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

  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact]),
      }));
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
              // onNavigate={() => {
              //   this.setState(() => ({
              //     screen: "create",
              //   }));
              // }}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
        {/* <Route path="/create" component={CreateContact} /> */}
      </div>
    );
  }
}

export default App;
