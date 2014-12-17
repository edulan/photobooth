(function() {
    Marionette.Renderer.render = function(template, data){
        if (_.isFunction(template)) {
            return template;
        }
        if (_.isString(template)) {
            var $template;

            if (_.has(JST, 'templates/' + template)) {
                return JST['templates/' + template](data);
            }
        }

        return null;
    };
})();