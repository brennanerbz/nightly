import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WorksList from '../../components/WorksList/WorksList';
import Modal from '../../components/Modals/Modal';
import FsModal from '../../components/Modals/FsModal';


// API calls
import { fetchUser } from '../../redux/modules/user';
import { logOut } from '../../redux/modules/user';
import { nameError } from '../../redux/modules/homework';
import { fetchAssignments } from '../../redux/modules/assignments';
import { openModal } from '../../redux/modules/overlays';
import { openFsModal } from '../../redux/modules/overlays';

function fetchData(getState, dispatch) {
	const promises = [];
	const token = cookie.load('token', {path: '/'})
	if(token) {
		promises.push(dispatch(fetchUser(token)))
	}
	return Promise.all(promises)
}

// @connectData(fetchData)
@connect(state => ({
	user: state.user.user,
	loaded: state.user.loaded,
	params: state.router.params,
	location: state.router.location,
	query: state.router.location.query,
	modalOpen: state.overlays.modalOpen,
	student_name: state.homework.identifier,
	homework_sequence: state.homework.sequence,
	homework_title: state.homework.title,
	selected: state.homework.selected
	}),
	dispatch => ({
		...bindActionCreators({
			pushState,
			nameError,
			fetchUser,
			logOut,
			openModal,
			openFsModal,
			fetchAssignments
		}, dispatch)
	})
)
export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		pushState: PropTypes.func.isRequired
	}

	state = {
		isMobile: false,
		howItWorksOpen: false,
		scrolling: false,
	}

	componentWillMount() {
		const token = cookie.load('token', {path: '/'})
		const { loaded } = this.props;
		if(token && !loaded) {
			this.props.fetchUser(token)
		}
	}

	componentDidMount() {
		// Check for mobile
		var check = false;
	    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	    var windowView = (window.innerWidth <= 800 && window.innerHeight <= 600)
		this.setState({
			isMobile: (windowView || check) ? true : false
		});
		window.addEventListener('scroll', ::this.handleScroll)
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.modalOpen && nextProps.modalOpen) {
			const node = document.body;
			node.scrollTop = 0
		}
		if(this.props.user && !nextProps.user) {
			this.props.pushState(null, '/')
		}
	}

	handleScroll() {
		const { scrolling, isMobile } = this.state;
		const node = document.body
		// Scroll logic
	}

	render() {
		const style = require('./App.scss');
		const { children, pushState, params, location, query } = this.props;
		const { nameError, student_name, homework_title, homework_sequence, selected } = this.props;
		const { openModal, openFsModal } = this.props;
		const { logOut } = this.props;
		const { isMobile, howItWorksOpen, scrolling } = this.state;
		const { userLoaded } = this.props;
		const user = cookie.load('token', {path: '/'}) ? true : false
		const teacher = cookie.load('teacher', {path: '/'})
		const account = cookie.load('account', {path: '/'})
		var appChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				userLoaded: userLoaded,
				isMobile: isMobile,
				location: location,
				scrolling: scrolling,
				user: user,
				teacher: teacher,
				openHowItWorks: () => this.setState({howItWorksOpen: true})
			})
		})
		return (
			<div id={style.app} style={{background: isMobile || !teacher || true ? '#fff' : '#f9fafc'}}>
				<Helmet {...config.app.head}/>
				<Header 
					openModal={openModal}
					openFsModal={openFsModal}
					logOut={logOut}
					pushState={pushState}
					nameError={nameError}
					student_name={student_name}
					homework_title={homework_title}
					homework_sequence={homework_sequence}
					selected={selected}
					params={params}
					location={location}
					query={query}
					isMobile={isMobile}
					show={howItWorksOpen}
					scrolling={scrolling}
					openHowItWorks={(value) => this.setState({howItWorksOpen: value})}
					user={user}
					teacher={teacher}
					account={account}
				/>
				{appChildrenWithProps}
				<Modal isMobile={isMobile}/>
				<FsModal isMobile={isMobile}/>
			</div>
		);
	}
}
