import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


@connect(state => ({
		items: state.quiz.items,
		loaded: state.quiz.loaded
	})
)
export default class QuizContent extends Component {
	static propTypes = {
		items: PropTypes.array,
		loaded: PropTypes.bool
	}

	render() {
		const style = require('./QuizContent.scss');
		const { items, loaded } = this.props;
		return (
			<ul style={{marginTop: '2em', marginBottom: '2em', padding: '0.25em 1em', border: '1px solid #DAE0E7', borderRadius: '0.25em', width: '100%'}}>
				{
					items.map((item, i) => {
						return (
							<li key={i} style={{padding: '1em', borderTop: i !== 0 ? '1px solid #DAE0E7' : ''}} className="display_flex flex_horizontal">
								<p style={{width: '50%'}} className="flex_item_align_left">
								{item.slice(-1)[0]}
								</p>
								<p style={{width: '50%'}} className="flex_item_align_right">
								{item[1]}
								</p>
							</li>
						)
					})
				}
			</ul>
		);
	}
}
