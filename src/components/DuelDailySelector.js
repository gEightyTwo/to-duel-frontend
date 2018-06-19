import React from 'react';
// import PropTypes from 'prop-types';
import Select from 'react-select';
// import { connect } from 'react-redux';
import 'react-select/dist/react-select.css'

class DuelDailySelector extends React.Component{

	constructor(props){
		super(props)
		this.state ={
		}
	}

	render () {
		const options = this.props.dailies.dailies.map(daily=> ({label: daily.name, value: daily.id}));
		return (
			<div className="section">
				<h5 className="section-heading">Select Three Dailies With Which To Duel</h5>
				<Select
					closeOnSelect={this.props.removeSelected}
					multi
					onChange={this.props.handleSelectChange}
					options={options}
					placeholder="Select your dailies"
					simpleValue
					value={this.props.value}
				/>
			</div>
		);
	}
};

export default DuelDailySelector;
