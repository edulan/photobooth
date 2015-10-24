(function(root) {
    var oldSync = root.Backbone.oldSync = root.Backbone.sync;

    Backbone.sync = function(method, model, options) {
        var data;

        if (!options.noCSRF) {
          var beforeSend = options.beforeSend;

          // Set X-CSRF-Token HTTP header
          options.beforeSend = function(xhr) {
            var token = $("meta[name='csrf-token']").attr("content");

            if (token) {
              xhr.setRequestHeader('X-CSRF-Token', token);
            }
            if (beforeSend) {
              return beforeSend.apply(this, arguments);
            }
          };
        }

        // Prepare data for multipart upload
        if (options.multipart) {
            data = model.toFormData() || new FormData();

            options.data = data;
            // Increase request timeout for file uploads
            options.timeout = 30000;
            options.contentType = false;
            options.processData = false;
            // Once prepared remove references.
            // Maybe this should be done after success callback
            model.resetFormData();
        }

        return oldSync.call(this, method, model, options);
    };
})(this);
