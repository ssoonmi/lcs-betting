import React from 'react';
import { withRouter } from 'react-router-dom';

class ShowHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: this.props.week,
      day: this.props.day,
      changeDay: false,
      changeWeek: false
    };
  }

  updateDay(field) {
    return e => {
      this.setState({ 
        [field]: e.target.value,
        changeDay: false,
        changeWeek: false
      }, () => {
        const { week, day } = this.state;
        this.props.history.push(`/matches/week/${week}/day/${day}`);
      });
    };
  }

  render() {
    const { week, day, changeDay, changeWeek } = this.state;
    return (
      <h2>
        {(changeDay || changeWeek) ? (
          <div
            className="select-modal"
            onClick={() => this.setState({ changeWeek: false, changeDay: false })}>
          </div>
        ) : (null)}
        <div 
          className="show-header-day"
          style={changeWeek ? { opacity: "1" } : {}}
          onClick={() => this.setState({ changeWeek: true })}>
          <span>Week</span>
          {changeWeek ?
            (
              <select
                value={week}
                onBlur={() => this.setState({ changeWeek: false })}
                onChange={this.updateDay("week")}>
                {[...Array(9).keys()].map((i) => {
                  const value = i + 1;
                  return (
                    <option key={i} value={value}>{value}</option>
                  );
                })}
              </select>
            ) : (
              <span>
                {week}
              </span>
            )}
        </div>

        <div 
          className="show-header-day"
          style={changeDay ? { opacity: "1" } : {}}
          onClick={() => this.setState({ changeDay: true })}>
          <span>Day</span>
          {changeDay ? 
          (
            <select
              value={day}
              onBlur={() => this.setState({ changeDay: false })}
              onChange={this.updateDay("day")}>
              <option value={1}>{1}</option>
              <option value={2}>{2}</option>
            </select>
          ) : (
            <span>
              { day }
            </span >
          )}
        </div>
      </h2>
    );
  }
}

export default withRouter(ShowHeader);