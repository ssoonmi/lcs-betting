import React from 'react';

const NAV_BAR_HEIGHT = 36;
const MATCH_LIST_PADDING = 5;

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: props.startingWeek
    };
    this.unmounting = false;
    this.scrollEventListeners = [];
    this.handleDrag = this.handleDrag.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sideNavRef = React.createRef();
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

  handleClick(e) {
    e.preventDefault();
    const currentWeek = this.state.currentWeek;
    const posY = e.clientY - this.sideNavRef.current.offsetHeight + 200;
    if ((currentWeek > 0 && posY < ((currentWeek - 1) * 44)) || (currentWeek < 10 && posY > (currentWeek * 44))) {
      let nextCurrentWeek = Math.floor(posY / 44) + 1;
      nextCurrentWeek = nextCurrentWeek > 9 ? 9 : nextCurrentWeek;
      nextCurrentWeek = nextCurrentWeek < 1 ? 1 : nextCurrentWeek;
      this.setState({ currentWeek: nextCurrentWeek });
      window.scrollTo(0, this.props.weekRefs[nextCurrentWeek].offsetTop - NAV_BAR_HEIGHT - MATCH_LIST_PADDING);
    }
  }

  handleDrag(e) {
    const that = this;
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    document.onmousemove = (e) => {
      e.preventDefault();
      const currentWeek = that.state.currentWeek;
      const posY = e.clientY - that.sideNavRef.current.offsetHeight + 200;
      if (currentWeek > 1 && posY < ((currentWeek - 1) * 42)) {
        const nextCurrentWeek = parseInt(currentWeek) - 1;
        that.setState({ currentWeek: nextCurrentWeek });
        window.scrollTo(0, that.props.weekRefs[nextCurrentWeek].offsetTop - NAV_BAR_HEIGHT - MATCH_LIST_PADDING);
      } else if (currentWeek < 9 && posY > (currentWeek * 42)) {
        const nextCurrentWeek = parseInt(currentWeek) + 1;
        that.setState({ currentWeek: nextCurrentWeek });
        window.scrollTo(0, that.props.weekRefs[nextCurrentWeek].offsetTop - NAV_BAR_HEIGHT - MATCH_LIST_PADDING);
      }
    };
    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

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
        <ul ref={this.sideNavRef}>
          {sideBarLis}
          <div 
          className="side-nav-line"
          onClick={this.handleClick}></div>
          <div 
          draggable="true"
          onDragStart={this.handleDrag}
          style={{ top: `calc(${((this.state.currentWeek - 1) * 11)}% + 14px + ${ballDiff}px)`}} className="side-nav-ball"></div>
        </ul>
      </div>
    )
  }
}

export default SideNav;