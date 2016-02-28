import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';


// Actions
import * as assignmentActions from '../../redux/modules/assignments';
import * as overlayActions from '../../redux/modules/overlays';

// Components 
import QuizHeader from '../../components/QuizHeader/QuizHeader';
import QuizContent from '../../components/QuizContent/QuizContent';

@connect(state => ({
		assignment: state.assignments.assignment,
		token: state.assignments.assignment.token,
		title: state.assignments.assignment.title,
		items: state.assignments.items,
		items_count: state.assignments.items_count,
		sequences: state.assignments.sequences,
		error: state.assignments.error
	}),
	dispatch => ({
		...bindActionCreators({
			...assignmentActions,
			...overlayActions,
			pushState
		}, dispatch)
	})
)
export default class Assignment extends Component {
	static propTypes = {
	}

	componentDidMount() {
		const { params } = this.props;
		this.setState({
			activeTab: params.tab ? params.tab.charAt(0).toUpperCase() + params.tab.slice(1) : 'Questions'
		});
	}

	state = {
		tabs: ['Reading', 'Questions', 'Scores'],
		activeTab: ''
	}

	render() {
		const sadFace = require('./SadFace.png');
		const { isMobile } = this.props;
		const { token, assignment, title, items, items_count } = this.props;
		const { error } = this.props;
		const { tabs, activeTab } = this.state;
		const { sequences } = this.props;
		return (
			<div style={{maxWidth: '1050px', height: error ? window.innerHeight - 55 : ''}} className="display_flex flex_container_center">
				<div style={{width: '100%'}} className="flex_vertical">
					{
						(error && error === 404)
						?
						<div className="display_flex flex_vertical flex_center">
							<img style={{height: isMobile ? '95px' : '130px'}} src={sadFace}/>
							<h1 
							style={{marginTop: '0.95em!important', fontSize: isMobile ? '30px' : '34px', fontWeight: '600', color: '#2C3239', textAlign: 'center'}}>
							Oh no, we couldn't find that article!
							</h1>
						</div>
						:
						<div>
							<QuizHeader 
								openModal={this.props.openModal}
								title={title} 
								count={items_count} 
								isMobile={isMobile}
								/>
							<div className={'display_flex ' + (isMobile ? 'flex_center' : '')}>
								<ul 
								style={{
									padding: isMobile ? '' : '0 25px',
									listStyleType: 'none',
									marginTop: '30px'
								}} 
								id="tabs" 
								className="display_flex flex_horizontal flex_nowrap">
									{
										tabs.map((tab, i)=> {
											const first = i === 0;
											const last = i === tabs.length - 1;
											const active = tab === activeTab
											return (
												<li 
													style={{
													}}
													onClick={() => {
														this.setState({activeTab: tab})
														this.props.pushState(null, `/assignment/${token}/${tab.toLowerCase()}`)
													}} 
													key={tab + i}>
													<a 
													style={{
														padding: '10px 20px',
														background: active ? '#1FB6FF' : '#fff',
														borderRadius: first || last ? '4px' : '',
														border: '1px solid #1FB6FF',
														borderLeft: !first && !last ? 'none' : '',
														borderRight: !first && !last ? 'none' : '',
														borderTopRightRadius: first ? '0px' :  '',
														borderBottomRightRadius: first ? '0px' : '',
														borderTopLeftRadius: last ? '0px' :  '',
														borderBottomLeftRadius: last ? '0px' : '',
														color: active ? '#fff' : '',
														cursor: active ? 'default' : 'pointer',
														textDecoration: 'none'
													}}>
														{tab}
													</a>
												</li>
											)
										})
									}
								</ul>
							</div>
							{activeTab === 'Reading' &&
							<div id="reading" style={{padding: isMobile ? '' : '0 25px', margin: '30px 0'}}>
								<div style={{borderRadius: '4px', border: '1px solid #DAE0E7', padding: '1em'}}>
								{assignment.text}
								</div>
							</div>
							}
							{activeTab === 'Questions' &&
							<div style={{padding: isMobile ? '' : '0 25px'}}>
								<div 
								style={{color: '#A8B6C1', fontSize: isMobile ? '14px' : '16px', marginTop: '2em', marginBottom: '1em'}} 
								className="flex_horizontal">
									<p style={{width: '50%', marginLeft: isMobile ? '1.5em' : '0'}}> 
										Concepts
									</p>
									<p style={{width: '50%'}} className="flex_item_align_right">
										Questions
									</p>
								</div>
								<QuizContent isMobile={isMobile} pushState={pushState}/>
							</div>}
							{activeTab === 'Scores' &&
							<div id="scores" style={{padding: isMobile ? '' : '0 25px', margin: '30px 0'}}>
								<div style={{borderRadius: '4px', border: '1px solid #DAE0E7', padding: '0 1em 1em'}}>
								<ul id="score_list">
									{
										sequences.map((sequence, i) => {
											const score = (sequence.correct_count / items_count) * 100
											const first = i === 0;
											const completed = sequence.questions_remaining === 0;
											return (
												<li 
												style={{
													borderTop: !first ? '1px solid #DAE0E7' : '',
													padding: '0.75em 0',
													fontSize: isMobile ? '14px' : '16px'
												}}
												key={sequence.id + i} 
												className="display_flex flex_horizontal">
													<span style={{width: '50%', lineHeight: '40px'}}>
														<b>{sequence.identifier}</b>
													</span>
													<span 
													className="display_flex" 
													style={{width: '50%', lineHeight: !completed ? '40px' : ''}}>
														{
															completed
															?
															<span 
															style={{
																borderRadius: '50%',
																border: '1px solid #1FB6FF',
																padding: '11px',
																color: '#1FB6FF',
																fontWeight: '500'
															}}
															className="flex_item_align_right">
															{score}
															</span>
															:
															<span className="flex_item_align_right">
																In progress...
															</span>
														}
													</span>
												</li>
											)
										})
									}
								</ul>
								</div>
							</div>}
						</div>
					}
				</div>
			</div>
		);
	}
}  