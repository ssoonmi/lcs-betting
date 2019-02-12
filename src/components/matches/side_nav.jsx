import React from 'react';

const NAV_BAR_HEIGHT = 36;
const MATCH_LIST_PADDING = 5;

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: null
    };
    this.unmounting = false;
    this.scrollEventListeners = [];
  }

  componentDidMount() {
    this.scrollEventListeners = Object.keys(this.props.weekRefs).map((week) => {
      const weekRef = this.props.weekRefs[week];
      const eventListener = this.handleScrollListener(weekRef, week);
      window.addEventListener('scroll', eventListener);
      return eventListener;
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.weekRefs != this.props.weekRefs) {
      this.scrollEventListeners.forEach((eventListener) => {
        window.removeEventListener('scroll', eventListener);
      });

      const mapOverWeekRefs = (week) => {
        const weekRef = this.props.weekRefs[week];
        const eventListener = this.handleScrollListener(weekRef, week);

        window.addEventListener('scroll', eventListener);
        return eventListener;
      };

      this.scrollEventListeners = Object.keys(this.props.weekRefs).map(mapOverWeekRefs);
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
    this.scrollEventListeners.forEach((eventListener) => {
      window.removeEventListener('scroll', eventListener);
    });
  }

  handleScrollListener(weekRef, week) {
    const that = this;
    return e => {
      if (!this.unmounting) {
        if (weekRef.offsetTop > window.scrollY - 900 && weekRef.offsetTop < window.scrollY + 200) {
          that.setState({ currentWeek: week });
        }
      }
    }
  }

  // handleScroll() {
  //   if (!this.unmounting) {
  //     Object.keys(this.props.weekRefs).forEach((week) => {
  //       const weekRef = this.props.weekRefs[week];
  //       if (weekRef.offsetTop > window.scrollY - 900 && weekRef.offsetTop < window.scrollY + 200) {
  //         this.setState({ currentWeek: week });
  //       }
  //     });
  //   }
  // }

  render() {
    const { weekRefs } = this.props;
    const sideBarLis = Object.keys(weekRefs).map((week, idx) => {
      const weekRef = weekRefs[week];
      return (
        <li
          key={idx}
          onClick={() => window.scrollTo(0, weekRef.offsetTop - NAV_BAR_HEIGHT - MATCH_LIST_PADDING)}
          className={this.state.currentWeek == week ? "active" : ""}>
          <span>
            Week {week}
          </span>
        </li>
      );
    });
    const ballDiff = this.state.currentWeek > 4 ? 1 : 0;
    return (
      <div className="match-index-side-nav">
        <ul>
          {sideBarLis}
          <div className="side-nav-line"></div>
          <div style={{ top: `calc(${((this.state.currentWeek - 1) * 11)}% + 14px + ${ballDiff}px)`}} className="side-nav-ball"></div>
        </ul>
      </div>
    )
  }
}

export default SideNav;