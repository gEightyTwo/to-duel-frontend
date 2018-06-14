import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css'

class DuelDailySelector extends React.Component{

	// displayName: 'Select Three Dailies',
	constructor(props){
		super(props)
		this.state ={
			removeSelected: false,
			value: [],
		}
	}

	handleSelectChange = (value) => {
		const newValue = value.split(',');
		this.setState(this.state.value.length === 3 ? {value: [this.state.value[0],this.state.value[1],newValue[3]]}: { value: newValue});
	}

	toggleCheckbox = (e) => {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	}

	render () {
		const { value } = this.state;
		const options = this.props.dailies.dailies.map(daily=> ({label: daily.name, value: daily.name}));
		console.log('HERE BE DRAGONS: ', value)
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					closeOnSelect={this.state.removeSelected}

					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your dailies"
					simpleValue
					value={value}
				/>
			</div>
		);
	}
};
const mapStateToProps = ({ dailies }) => {
  return {dailies}
}
export default connect(mapStateToProps)(DuelDailySelector);
