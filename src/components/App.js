import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { grommet, Box, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import SplashScreen from './SplashScreen';
import actionCreators from '../actions';
import timeFuncs from '../helpers/timeFuncs';

export const appConfig = {
  appName: 'SnuzeTime 💤🕙',
  customTheme: deepMerge(grommet, {
    global: {
      breakpoints: {
        small: {
          value: 576
        },
        medium: {
          value: 768
        },
        large: {
          value: 992
        },
        xlarge: {} // anything larger than large
      }
    }
  })
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.setTime();
  }

  setTime() {
    const currentHour = timeFuncs.getCurrentHour();
    const currentDate = timeFuncs.getCurrentDate();
    const { currentTimes, updateCurrentTimes, showMainApp } = this.props;
    updateCurrentTimes({
      ...currentTimes,
      hour: currentHour,
      date: currentDate
    });
    showMainApp(true);
  }

  getBackground(currentHour) {
    return currentHour >= 7 && currentHour < 19 ? 'light-1' : 'dark-1';
  }

  renderMainApp = () => {
    const background = this.getBackground(this.props.currentTimes.hour);

    return (
      <Box fill background={background}>
        <Navbar title={appConfig.appName} />
        <Sidebar background={background} />
        <Main />
      </Box>
    );
  };

  render() {
    return (
      <HashRouter>
        <Grommet full theme={appConfig.customTheme}>
          {!this.props.mainAppShown ? (
            <SplashScreen appName={appConfig.appName} />
          ) : (
            this.renderMainApp()
          )}
        </Grommet>
      </HashRouter>
    );
  }
}

App.propTypes = {
  currentTimes: PropTypes.exact({
    withSeconds: PropTypes.string,
    withoutSeconds: PropTypes.string,
    hour: PropTypes.number,
    date: PropTypes.string
  }),
  updateCurrentTimes: PropTypes.func,
  mainAppShown: PropTypes.bool,
  showMainApp: PropTypes.func
};

const mapStateToProps = ({ currentTimes, mainAppShown }) => {
  return { currentTimes, mainAppShown };
};

export default connect(
  mapStateToProps,
  {
    showMainApp: actionCreators.showMainApp,
    updateCurrentTimes: actionCreators.updateCurrentTimes
  }
)(App);
