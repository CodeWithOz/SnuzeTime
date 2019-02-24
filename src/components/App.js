import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timer';
import { grommet, Box, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import SplashScreen from './SplashScreen';
import actionCreators from '../actions';
import constants from '../constants';

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
  setHour() {}

  setCurrentTimeAndDate() {
    const { withSeconds, withoutSeconds, hour, date } = this.props.currentTimes;
    const newDate = this.getCurrentDate();
    const isNewDay = newDate !== date;

    const newTimes = {
      withSeconds: this.getCurrentTime(),
      withoutSeconds: this.getCurrentTime(false),
      hour: this.getCurrentHour(),
      date: newDate
    };
    this.props.updateCurrentTimes(newTimes);

    if (isNewDay) {
      // trigger a refresh of TodayView for the new date
      this.props.showTodayView(false);
    }

    if (!this.props.mainAppShown) {
      // show the main app if all currentTimes have been set
      const { currentTimes: initialTimes } = constants.INITIAL_STATE;
      if (
        withSeconds !== initialTimes.withSeconds &&
        withoutSeconds !== initialTimes.withoutSeconds &&
        hour !== initialTimes.hour &&
        date !== initialTimes.date
      ) {
        this.props.showMainApp(true);
      }
    }
  }

  getCurrentDate() {
    return moment().format('YYYY M D');
  }

  getCurrentTime(withSeconds = true) {
    return moment().format(`hh:mm${withSeconds ? ':ss' : ''} A`);
  }

  getCurrentHour() {
    return Number(moment().format('HH'));
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
        <Box flex>
          <Clock />
          <Box flex align="center" justify="center">
            <ButtonDisplay />
            <TodayView />
          </Box>
        </Box>
      </Box>
    );
  };

  render() {
    return (
      <Grommet full theme={appConfig.customTheme}>
        {!this.props.mainAppShown ? (
          <SplashScreen appName={appConfig.appName} />
        ) : (
          this.renderMainApp()
        )}
      </Grommet>
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
  showTodayView: PropTypes.func,
  mainAppShown: PropTypes.bool,
  showMainApp: PropTypes.func
};

const mapStateToProps = ({ currentTimes, mainAppShown }) => {
  return { currentTimes, mainAppShown };
};

export default connect(
  mapStateToProps,
  {
    showTodayView: actionCreators.showTodayView,
    showMainApp: actionCreators.showMainApp,
    updateCurrentTimes: actionCreators.updateCurrentTimes
  }
)(App);
