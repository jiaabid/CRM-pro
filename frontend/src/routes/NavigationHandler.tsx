import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsideRoutes from '../layout/Aside/AsideRoutes';
import Auth from './AuthRoute';


interface HomeProps {
	user: any;
}

class NavigationHandler extends Component<HomeProps> {
	state = {
		isUserToken: false,
	};

	componentDidMount() {
		const token = localStorage.getItem('token');

		console.log('tokenn =====', this.props.user);

		if (token) {
			// console.log('iffff');

			this.setState({ isUserToken: true });
		} else {
			// console.log('else');
			this.setState({ isUserToken: false });
		}
	}

	render() {
		console.log('isToken===', !this.state.isUserToken);

		return !this.props.user ? <Auth /> : <AsideRoutes />;
	}
}

const mapStateToProps = (state: any) => ({
	user: state.AuthReducer?.user
})


export default connect(mapStateToProps, null)(NavigationHandler)