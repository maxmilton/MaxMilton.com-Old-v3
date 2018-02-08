const indexComponent = require('./index');

indexComponent.renderSync({ name: 'Marko' })
  .appendTo(document.body);
