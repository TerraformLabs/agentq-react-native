import React from 'react'
import PropTypes from 'prop-types'
import { WebView } from 'react-native'

const CHAT_URL = "https://s3.amazonaws.com/aq-assets/app/in-app.html"

class AgentQChat extends React.Component {
  agentQData () {
    const { firstName, lastName, email, data} = this.props
    let baseData = {}
    if (firstName) {
      baseData.first_name = firstName
    }
    if (lastName) { 
      baseData.last_name = lastName
    }
    if (email) {
      baseData.email = email
    }
    if (data) {
      baseData = Object.assign(baseData, data)
    }
    return baseData
  }
  jsToInject() {
    const { styleOverrides } = this.props
    const agentQDataToInject = this.agentQData()
    let js = ''
    if (agentQDataToInject !== {}) {
      js += `window.agentQData = ${JSON.stringify(agentQDataToInject)};`
    }
    if (styleOverrides) {
      js += `window.agentQStyleOverrides = ${JSON.stringify(styleOverrides)};`
    }
    return `(function () {${js}}());`
  }
  onShouldStartLoadWithRequest(navigator) {
    if (navigator.url.indexOf(CHAT_URL) > -1) {
      return true
    } else {
      this.props.handleOpenURL(navigator.url)
      return false
    }    
  }
  render () {
    const { organizationId, style } = this.props
    return (
      <WebView
        source={{uri: `${CHAT_URL}?org_id=${organizationId}`}}
        style={style}
        scrollEnabled={false}
        startInLoadingState={true}
        thirdPartyCookiesEnabled={true}
        injectedJavaScript={this.jsToInject()}
        javaScriptEnabledAndroid={true}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
        onNavigationStateChange={this.onShouldStartLoadWithRequest.bind(this)}
      />
    );
  }
}

AgentQChat.propTypes = {
  organizationId: PropTypes.number.isRequired,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  data: PropTypes.shape({}),
  styleOverrides: PropTypes.shape({}),
  style: PropTypes.shape({}),
  handleOpenURL: PropTypes.func,
}

AgentQChat.defaultProps = {
  email: null,
  firstName: null,
  lastName: null,
  data: null,
  styleOverrides: null,
  style: {{ marginTop: 20}},
  handleOpenURL: null
}

export default AgentQChat
