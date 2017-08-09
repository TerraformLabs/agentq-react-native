![AgentQ-React-Native](https://s3.amazonaws.com/aq-assets/images/agent_Q_small_email.png)

Incorporate Agent Q—the A.I. powered chat platform for sales and customer service—into React Native apps.

## Installation

### Yarn

```bash
yarn add agentq-react-native
```

### NPM

```bash
npm i --save agentq-react-native
```

## Usage

Agent Q React Native allows you to embed the Agent Q chat experience into your apps. It is implemented as a WebView that loads the Agent Q chat widget. It supports passing user data—such as e-mail, name, or id—to the Agent Q platform as well as in-app linking.

Here is an example:

```javascript
import React from 'react'
import AgentQChat from 'agentq-react-native'
export default class App extends React.Component {
  handleOpenURL(url) {
    alert(url)
  }
  render() {
    return (
        <AgentQChat
          organizationId={XXXX}
          email="jsmith@example.com"
          firstName="Jane"
          lastName="Smith"
          data={{ Customer: 'Yes', LTV: '$5,800', 'Time in App':'28 min' }}
          styleOverrides={{ 'header-style':'narrow', 'header-background-color':'rgb(75,75,75)' }}
          handleOpenURL={this.handleOpenURL}
        />
    )
  }
}
```

## Props

#### organizationId (required)

 To find your organization ID, log into an Agent Q account with Admin credentials and go to the [Installation Tab](https://agentq.ai/account?tab=Installation). In the embed code, look for the attribute data-widget-id in the first line. The number that follows is your organization ID.

#### email, firstName, lastName, data (optional)

E-mail, firstName, lastName, and data all pass data through to the agent chatting with the app user.

#### style (optional)

Style the component. To display the chat full screen, it is recommended that you set this prop to `{ marginTop: 20 }` in order to leave space for the status bar.

#### styleOverrides (optional)

The styleOverrides prop alllows advanced customization of the Agent Q widget itself (e.g., header style, chat bubble color). See the full list of keys in [the documentation](https://s3.amazonaws.com/aq-assets/docs/Agent+Q+Widget+Style+Override+DOM+API.pdf).

#### handleOpenURL (optional)

Finally, handleOpenURL accepts a function that allows you to handle URLs any way you see fit.

## Contribution

We welcome all issues and pull requests.