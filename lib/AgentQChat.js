import React from 'react'
import PropTypes from 'prop-types'
import { WebView } from 'react-native'

const CHAT_URL = "https://s3.amazonaws.com/aq-assets/app/in-app.html"

class AgentQChat extends React.Component {
  componentWillReceiveProps (nextProps) {
    const newJs = this.jsToInject(nextProps)
    if (newJs) {
      this.theWebView.injectJavaScript(newJs)
    }
  }
  agentQData (sourceProps = this.props) {
    const { firstName, lastName, email, data} = sourceProps
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
  jsToInject (sourceProps = this.props) {
    const { styleOverrides } = sourceProps
    const agentQDataToInject = this.agentQData(sourceProps)
    let js = ''
    if (agentQDataToInject !== {}) {
      js += `window.agentQData = ${JSON.stringify(agentQDataToInject)};`
    }
    if (styleOverrides) {
      js += `window.agentQStyleOverrides = ${JSON.stringify(styleOverrides)};`
    }
    if (js === '') {
      return ''
    }
    return `(function () {${js}}());`
  }
  onShouldStartLoadWithRequest (navigator) {
    if (navigator.url.indexOf(CHAT_URL) > -1) {
      return true
    } else {
      if (this.props.handleOpenURL) {
        this.props.handleOpenURL(navigator.url)
      }
      return false
    }
  }
  render () {
    const { organizationId, style } = this.props
    return (
      <WebView
        ref={(webview) => {this.theWebView = webview}}
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
  style: {},
  handleOpenURL: null
}

export default AgentQChat
