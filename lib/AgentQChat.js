import React from 'react'
import PropTypes from 'prop-types'
import { WebView } from 'react-native'

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
    let js = ''
    const agentQDataToInject = this.agentQData()
    if (agentQDataToInject !== {}) {
      js += `window.agentQData = ${JSON.stringify(agentQDataToInject)};`
    }
    if (styleOverrides) {
      js += `window.agentQStyleOverrides = ${JSON.stringify(styleOverrides)};`
    }
    return `(function () {${js}}());`
  }
  render () {
    return (
      <WebView
        source={{uri: `https://s3.amazonaws.com/aq-assets/app/in-app.html?org_id=${this.props.organizationId}`}}
        style={{marginTop: this.props.marginTop}}
        scrollEnabled={false}
        startInLoadingState={true}
        thirdPartyCookiesEnabled={true}
        injectedJavaScript={this.jsToInject()}
        javaScriptEnabledAndroid={true}
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
  styleOverrides: PropTypes.shape({})
  marginTop: PropTypes.number
}

AgentQChat.defaultProps = {
  email: null,
  firstName: null,
  lastName: null,
  data: null,
  styleOverrides: null,
  marginTop: 20
}


export default AgentQChat