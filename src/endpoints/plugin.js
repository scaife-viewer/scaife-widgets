const defaultEndpoints = {
  tocEndpoint: 'https://sv-mini-atlas.scaife-viewer.org/graphql/',
};

const install = (Vue, options) => {
  if (install.installed) return;
  install.installed = true;

  const overriddenEndpoints = options.widgetEndpoints || {};
  const configuredEndpoints = {
    ...defaultEndpoints,
    ...overriddenEndpoints,
  };
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$scaife = Vue.prototype.$scaife || {};

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$scaife = {
    ...Vue.prototype.$scaife,
    endpoints: configuredEndpoints,
  };
};

const EndpointsPlugin = {
  install,
};
export default EndpointsPlugin;
