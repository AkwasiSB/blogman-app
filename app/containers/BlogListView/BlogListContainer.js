import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { NetInfo, Alert, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BlogListView } from '../../components';


export default class BlogListContainer extends PureComponent {
	state = {
        loading: true,
        paging: '',
        blogs: [],
        moreBlog: false,
    	refresh: false
    }

    async getBlogsList(params) {
    	const postUrl = 'https://public-api.wordpress.com/rest/v1/freshly-pressed/';
    	
    	try {
    		let resp = await axios(postUrl, { params });
    		let blogs;

    		if (this.state.blogs) {
    			blogs = this.state.blogs.concat(resp.data.posts);
    		}
    		else {
    			blogs = resp.data.posts;
    		}

    		this.setState({
    			loading: false,
    			paging: resp.data.date_range.oldest,
    			blogs: blogs,
    			moreBlog: false,
    			refresh: false
    		});
    	}
    	catch(error) {
    		console.error(error);
    	};
    }

    componentDidMount() {
        NetInfo.isConnected.fetch()
            .then((connected) => {
                if (!connected) {
                    this.setState({ loading: false });

                    Alert.alert('', 'Please connect to the internet before you use this app. After connection, pull to refresh, thanks!');
                }
                else {
                    this.getBlogsList();
                }
            });
    }

    reloadBlogs = () => {
    	this.setState({
    		refresh: true,
    		blogs: []
    	});

    	this.getBlogsList();
    }

    loadMoreBlog = () => {
    	const params = { before: this.state.paging };

    	this.setState({ moreBlog: true });

    	this.getBlogsList(params);
    }

    render() {
    	if (this.state.loading === true) {
    		return <ActivityIndicator size='large' animating={ true } />;
    	}

    	return (
    		<BlogListView itemNavigator={ this.props.navigation } blogs={ this.state.blogs } refresh={ this.state.refresh } onReload={ this.reloadBlogs } loadMore={ this.state.moreBlog } onLoadMore={ this.loadMoreBlog } />
    	);
    }
}
