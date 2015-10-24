Marionette.Renderer.render = function(template, data){
  if (_.isFunction(template)) {
    return template;
  }
  if (_.isString(template)) {
    var $template;

    if (_.has(JST, template)) {
      return JST[template](data);
    }
  }

  return null;
};
