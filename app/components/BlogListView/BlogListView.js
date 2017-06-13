import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, ActivityIndicator, StatusBar, View, StyleSheet, Text, Image, FlatList, TouchableNativeFeedback } from 'react-native';
import { Colors } from '../../config/constants';
import { renderDate } from '../../utils/helpers';


BlogListView.propTypes = {
    blogs: PropTypes.array.isRequired,
    refresh: PropTypes.bool.isRequired,
    onReload: PropTypes.func.isRequired,
    loadMore: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    itemNavigator: PropTypes.object.isRequired
};


export default function BlogListView(props) {
	setItemKey = (item, index) => {
		return index;
	}

    renderItemSeparator = () => {
        return <View style={{ height: 1, backgroundColor: '#dedede', marginLeft: 75, marginRight: 7 }} />
    }

    renderListFooter = () => {
        if (props.loadMore) {
            return <View><ActivityIndicator size='large' animating={ true } /></View>
        }
        else {
            return null;
        }
    }

	renderBlogItem = (blog) => {
		return (
            <TouchableNativeFeedback useForeground={ true } background={ TouchableNativeFeedback.Ripple('rgba(128, 128, 128, 0.2)') } onPress={ () => { props.itemNavigator.navigate('BlogContent', blog.item) } } >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, height: 100 }}>
                    <Image source={{ uri: blog.item.author.avatar_URL }} resizeMode='cover' resizeMethod='scale' style={{ width: 60, height: 60, borderRadius: 30 }} />

                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                        <Text style={{ color: '#000', fontSize: 15, fontWeight: '400', width: Dimensions.get('screen').width - 100 }} numberOfLines={ 2 }> { blog.item.title.trim().replace(/<\/?[^>]+(>|$)/g, '') } </Text>
                        <Text style={{ fontSize: 15, paddingVertical: 5 }}> { blog.item.author.name } </Text>
                        <Text style={{ fontSize: 14 }}> { renderDate(blog.item.date) } </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
	}

    return (
        <View style={{ flex: 1 }}>
        	<StatusBar animated={ true } backgroundColor={ Colors.statusColor } translucent={ false } />
            
            <FlatList data={ props.blogs } keyExtractor={ this.setItemKey } renderItem={ this.renderBlogItem } ItemSeparatorComponent={ this.renderItemSeparator } ListFooterComponent={ this.renderListFooter } refreshing={ props.refresh } onRefresh={ props.onReload } onEndReachedThreshold={ 0.6} onEndReached={ props.onLoadMore } />
        </View>
    );
}
