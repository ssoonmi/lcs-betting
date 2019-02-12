import React from 'react';
import { connect } from 'react-redux';
import { makeStake } from '../../actions/bet_actions';

class StakeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stake: this.props.stake
    };
  }

  handleSubmit() {
    return e => {
      e.preventDefault();
      this.props.makeStake(this.state.stake);
      this.props.hideStakeForm();
    };
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    }
  }

  render() {
    return (
      <>
        {this.props.showModal ? 
        (<div
          className="select-modal"
          onClick={this.props.hideStakeForm}>
        </div>) : (null)
        }
        <form onSubmit={this.handleSubmit()}>
          <input 
          type="text" 
          onBlur={this.props.hideStakeForm} 
          value={this.state.stake} 
          onChange={this.updateField("stake")}/>
          <input type="submit" hidden={true} />
        </form>
      </>
    );
  }
}

const msp = (state, ownProps) => {
  const week = ownProps.week;
  const day = ownProps.day;
  return {
    stake: state.matches.weeks[week].days[day].stake || ""
  };
};

const mdp = (dispatch, ownProps) => {
  const week = ownProps.week;
  const day = ownProps.day;
  return {
    makeStake: (stake) => dispatch(makeStake(week, day, stake))
  };
};

export default connect(msp, mdp)(StakeForm);
