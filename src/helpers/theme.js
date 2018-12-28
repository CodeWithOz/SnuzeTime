function getBkgrnd(currentHour) {
  return currentHour >= 7 && currentHour < 19 ? '#fff' : '#323334';
}

export default {
  get: settings => {
    return {
      global: {
        colors: {
          bkgrnd: getBkgrnd(settings.currentHour)
        }
      }
    };
  }
};
