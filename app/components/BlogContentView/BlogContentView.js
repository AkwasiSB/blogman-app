import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar, View, WebView } from 'react-native';
import { Colors } from '../../config/constants';


BlogContentView.propTypes = {
    content: PropTypes.string.isRequired
};


export default function BlogContentView(props) {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' backgroundColor={ Colors.statusColor } />

            <WebView source={{ uri: props.content }} javaScriptEnabled={ true } domStorageEnabled={ true } decelerationRate='normal' startInLoadingState={ true } scalesPageToFit={ true } />
        </View>
    );
}
