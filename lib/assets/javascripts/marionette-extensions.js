Marionette.Renderer.render = function(template, data){
  var templatePrefix = 'templates/';

  if (_.isFunction(template)) {
    return template;
  }

  if (_.isString(template)) {
    var templateName = templatePrefix + template;

    if (!_.has(JST, templateName)) {
      console.error('Template not found: ', template);
      return;
    }

    return JST[templateName](data);
  }

  return null;
};
