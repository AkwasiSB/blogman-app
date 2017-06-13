import { StackNavigator } from 'react-navigation';
import { BlogListContainer, BlogContentContainer } from '../containers';
import { Colors } from '../config/constants';


export default AppScreens = StackNavigator({
	BlogList: {
		screen: BlogListContainer,
		navigationOptions: {
			title: 'BlogMan',
	        headerTintColor: Colors.textColor,
			headerStyle: {
				backgroundColor: Colors.appColor,
				elevation: 0
			}
		}
	},
	BlogContent: {
		screen: BlogContentContainer,
		navigationOptions: {
	        headerTintColor: Colors.textColor,
			headerStyle: {
				backgroundColor: Colors.appColor,
				elevation: 0
			}
		}
	}
}, {
	initialRouteName: 'BlogList'
});
