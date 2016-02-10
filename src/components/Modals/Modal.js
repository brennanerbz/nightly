import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { Modal } from 'react-bootstrap';

import * as overlayActions from '../../redux/modules/overlays';

@connect(
  state => ({
  	open: state.overlays.modalOpen,
  	type: state.overlays.modalType
  }),
  dispatch => ({
    ...bindActionCreators({
      ...overlayActions,
      pushState
    }, dispatch)
  })
)
export default class DefaultModal extends Component {
	static propTypes = {
	}

	close() {
		const { closeModal } = this.props;
		closeModal()
	}

	render() {
		const style = require('./Modals.scss');
		const chatBubbles = require('../../../static/ChatBubbles.png');
		const { open, type, isMobile } = this.props;
		return (
			<Modal
			bsClass={(isMobile ? 'mobile' : 'desktop') + ' ' + 'modal'}
			dialogClassName={(isMobile ? 'mobile' : '') + ' ' + 'modal-dialog'}
			show={open}
			onHide={::this.close}>
				<Modal.Body>
					<i 
					onClick={::this.close}
					style={{
						fontSize: '1em',
						position: 'absolute',
						top: '20px',
						right: '20px',
						color: '#A8B6C1'
					}} 
					className="fa fa-times">
					</i>
					<div
					style={{
						textAlign: 'center'
					}}
					className="display_flex flex_vertical flex_center">
						<img 
						style={{
							marginTop: '7.5px',
							height: isMobile ? '95px' : '115px'
						}} 
						src={chatBubbles}/>
						<h1
						style={{
							color: '#2C3239',
							fontWeight: '600',
							fontSize: isMobile ? '17px' : '24px',
							margin: '10px 0 5px 0!important'
						}}>
							Enter phone number to take quiz
						</h1>
						<p
						style={{
							color: '#A8B6C1',
							fontWeight: '400',
							fontSize: isMobile ? '15.5px' : '19px',
							margin: '5px 0 10px 0!important'
						}}>
							The quiz is messaging based. Don't worry, we're paying for everything.
						</p>
						<div 
						style={{
							margin: '10px 0px',
							padding: '7.5px 5px',
							borderTop: '1px solid #EEEEEE',
							borderBottom: '1px solid #EEEEEE',
							width: '100%'
						}} 
						className="input_wrapper flex_horizontal">
							<span style={{padding: '7.5px 5px'}}>
								+1
							</span>
							<input 
							style={{
								background: '#fff',
								padding: '0px 0 0 10px',
								width: '100%'
							}}
							ref="phone_number"
							placeholder="Phone Number #"
							type="number"
							autoFocus={true}/>
						</div>
						<button 
						style={{
							margin: '5px 0px'
						}} 
						className="button primary_green">
							Start
						</button>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}
