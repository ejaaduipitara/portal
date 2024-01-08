(function (window) {
    window['env'] = window['env'] || {};
  
    // Environment variables
    window['env']['host'] = '${HOST}';
    window['env']['authToken'] = '${AUTH_TOKEN}';
    window['env']['superSetDomain'] = '${SUPERSET_DOMAIN}';
    window['env']['dashboardIds'] = '${DASHBOARD_IDS}';
  })(this);