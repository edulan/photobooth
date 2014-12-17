(function(root) {
    var oldSync = root.Backbone.sync;

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
            var form = new FormData();
            data = model.toJSON();

            // _.each(data, function(fieldValue, fieldName) {
            //     if (_.isObject(fieldValue)) {
            //         _.each(fieldValue, function(propValue, propName) {
            //         form.append(fieldName + '[' +  propName + ']', propValue);
            //     });
            //     } else {
            //         form.append(fieldName, fieldValue);
            //     }
            // });

            this.getSnapshots().each(function(snapshot, index) {
                form.append('clip[snapshot' + (index + 1).toString() + ']', snapshot.get('data'));
            }, this);

            options.data = form;
            // Increase request timeout for file uploads
            options.timeout = 30000;
            options.contentType = false;
            options.processData = false;
        }

        return oldSync.call(this, method, model, options);
    };
})(window);