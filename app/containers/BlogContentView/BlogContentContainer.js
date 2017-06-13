import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';
import { BlogContentView } from '../../components';
import { renderDate } from '../../utils/helpers';


export default class BlogContentContainer extends PureComponent {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (navigation.state.params) ? (
			<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
				<Image source={{ uri: navigation.state.params.author.avatar_URL }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }} />
				
				<View>
					<Text style={{ color: '#FFF', fontSize: 15, fontWeight: '400' }}>{ navigation.state.params.author.name }</Text>
					<Text style={{ color: '#FFF', fontSize: 13 }}>{ renderDate(navigation.state.params.date) }</Text>
				</View>
			</View>
		) : null
	})

	render() {
    	return (
    		<BlogContentView content={ this.props.navigation.state.params.URL } />
    	);
    }
}
