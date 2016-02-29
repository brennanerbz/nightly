import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class AssignmentList extends Component {
	static propTypes = {
	}

	render() {
		const { assignments } = this.props;
		const forwardArrow = require('../../../static/icons/forwardArrowGrey.png')
		return (
			<ul style={{padding: '3.5em 0 0'}}>
				{assignments && assignments.map((assignment, i) => {
					return (
						<li 
						onClick={() => this.props.pushState(null, `/assignment/${assignment.token}/questions`)}
						style={{padding: '1em 0 1em 0em', margin: '0 0 0 1em', borderBottom: '1px solid #e4e4e4'}}
						key={assignment.title + i} 
						className="display_flex flex_horizontal flex_nowrap">
							<span style={{
										position: 'absolute',
										display: 'block',
										height: '35px',
										width: '35px',
										lineHeight: '35px',
										borderRadius: '50%',
										fontWeight: '500',
										fontSize: '1.15em',
										textAlign: 'center',
										background: '#1FB6FF',
										color: '#fff'
									}}>
								{assignment.title.charAt(0).toUpperCase()}
							</span>
							<span style={{marginLeft: '50px', fontSize: '15px'}}>
								<p style={{fontWeight: '600', color: '#3C4858'}}>{assignment.title}</p>
								<p style={{fontWeight: '400', color: '#8492A6', lineHeight: '1.25em'}}>
								{assignment.text.slice(0, 30) + (assignment.text.length > 30 && '...')}
								</p> 
							</span>
							<span style={{position: 'absolute', right: '1em', fontSize: '14px', color: '#8492A6'}} className="display_flex flex_horizontal">
								<p style={{marginRight: '5px'}}>
								{moment.utc(assignment.created).calendar(null, {
								    sameDay: '[Today]',
							        nextDay: '[Tomorrow]',
							        nextWeek: 'dddd',
							        lastDay: '[Yesterday]',
							        lastWeek: '[Last] dddd',
							        sameElse: 'DD/MM/YYYY'
								})}
								</p>
								<img src={forwardArrow} style={{height: '10px', position: 'absolute', top: '3px'}}/>
							</span>
						</li>
					)
				})}
			</ul>
		);
	}
}