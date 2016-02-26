import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/helperfunctions';
import WikiForm from '../WikiForm/WikiForm';

export default class Header extends Component {

	static propTypes = {
		isMobile: PropTypes.bool,
		show: PropTypes.bool,
		params: PropTypes.object,
		location: PropTypes.object,
		pushState: PropTypes.func
	}

	render() {
		const blueLogo = require('../../../static/logo/nightlyLogoBlue.png');
		const whiteLogo = require('../../../static/logo/nightlyLogoWhite.png');
		const { isMobile, show, params, location, pushState, scrolling } = this.props;
		const isNotHomeView = location.pathname.match(/quiz/gi);
		return (
			<div 
				style={{
					position: isNotHomeView ? 'fixed' : '',
					background: '#fff',
					width: '100%', 
					boxShadow: isNotHomeView ? '0px 1px 1px 0px rgba(203,203,203,0.50)' : '',
					zIndex: '2'
				}} 
				className={'display_flex flex_center'}>
				<div className="flex_horizontal" style={{maxWidth: '1000px', width: '100%', padding: isMobile ? '15px 10px 10px' : '15px 0 10px 0'}}>
					<img src={blueLogo} style={{height: isMobile ? '45px' : '55px'}}/>
					<ul style={{lineHeight: isMobile ? '45px' : '55px'}} className="flex_container_right link_list">
						<li className="link_list_item">
							<a className="grey link">How It Works</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
