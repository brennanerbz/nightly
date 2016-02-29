import React, { Component, PropTypes } from 'react';

export default class Homework extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile, location, selected } = this.props;
		var homeworkChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, ...this.props)
		})
		// Header
		const forwardArrow = require('../../../static/icons/forwardArrow.png')
		const forwardArrowGrey = require('../../../static/icons/forwardArrowGrey.png')
		const homeworkView = location.pathname.match(/homework/gi);
		const readingView = location.pathname.match(/read/gi);
		const questionsView = location.pathname.match(/questions/gi);
		return (
			<div style={{maxWidth: '1050px', height: '100%'}} 
				 className="display_flex flex_container_center">
				<div style={{width: '100%', height: '100%'}} className="flex_vertical">
					{homeworkView && questionsView && isMobile &&
					<span 
					onClick={() => {
						if(selected) this.props.submitAnswer()
					}}
					style={{position: 'absolute', right: '10px', top: '18px', zIndex: '1000'}}>
						<a style={{marginRight: '27px'}} 
							className={(!selected ? 'grey' : '') + ' ' + 'link'}>Next</a>
						<img src={selected ? forwardArrow : forwardArrowGrey} style={{height: '18.5px', position: 'absolute', right: '10px', top: '0'}}/>
					</span>}
					<div style={{padding: isMobile ? '3.5em 0 0' : '5em 25px', height: '100%'}}>
					{homeworkChildrenWithProps}
					</div>
				</div>
			</div>
		);
	}
}
