(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Views = PhotoBooth.Views || {};

    PhotoBooth.Views.Clips.Booth = Marionette.CompositeView.extend({
        template: "clips/new",

        events: {
            'click .btn-start': 'onStart',
            'click .btn-retry': 'onRetry'
        },

        initialize: function(options) {
            this.listenTo(this.model, 'request', this.onRequest);
            this.listenTo(this.model, 'sync', this.onSynced);
            this.listenTo(this.model, 'error', this.onError);
        },

        onShow: function() {
            var $message = this.$(".row-info"),
                $start = this.$(".btn-start");

            if (!PhotoBooth.Services.FeatureDetection.isVideoSupported()) {
                $message
                    .text("Sorry, your browser does not support video stream API")
                    .show();
                return;
            }

            $message.empty();

            this.camera = new PhotoBooth.Services.Camera(this.$("#snap-preview"));
            this.camera.startVideo()
                .done(function() {
                    var $text = $("<p>")
                        .addClass("text-info")
                        .text("Take your time to make a good impression. When you're ready click start button");

                    $message.html($text);
                    $start.attr('disabled', false);

                })
                .fail(function(error) {
                    var $text = $("<p>")
                        .addClass("text-warning")
                        .text(error.message);

                    $message.html($text);
                    $start.attr('disabled', true);
                });
        },

        onBeforeDestroy: function() {
            if (this.camera) {
                this.camera.stopVideo();
            }
        },

        onStart: function(event) {
            var countdownSeconds = PhotoBooth.Settings.countdownSeconds,
                maxSnapshots = 4,
                snapshotsCount = 0,
                countdown = countdownSeconds,
                $counter = this.$(".message-countdown"),
                $flash = this.$(".cam-flash"),
                $start = this.$(".btn-start");

            var that = this;

            function takeNext () {
                snapshotsCount++;

                if (snapshotsCount > maxSnapshots) {
                    that.model.save(null, { multipart: true });
                    return;
                }


                function updateCounter () {
                    countdown--;

                    if (countdown <= 0) {
                        // Reset countdown
                        countdown = countdownSeconds;
                        $flash.show().fadeOut("slow");
                        that.saveSnapshot('snapshot' + snapshotsCount).done(function() {
                            takeNext();
                        });
                        return;
                    }

                    $counter.text(countdown);
                    setTimeout(updateCounter, 1000);
                }

                $counter.text(countdown);
                setTimeout(updateCounter, 1000);
            }

            $start.attr('disabled', true);
            $counter.show();
            takeNext();

            event.preventDefault();
        },

        onRetry: function(event) {
            this.onShow();

            event.preventDefault();
        },

        onRequest: function(model) {
            var $message = this.$(".row-info"),
                $counter = this.$(".message-countdown"),
                $text = $("<p>")
                .addClass("text-info")
                .html('Sending clip contents <i class="fa fa-cog fa-spin"></i>');

            $message.html($text);
            $counter.hide();
        },

        onSynced: function(model) {
            var $message = this.$(".row-info"),
                $text = $("<p>")
                .addClass("text-success")
                .text("Clip created successfully!");

            $message.html($text);
            this.camera.stopVideo();

            _.delay(function() {
                $message.html("Redirecting...");
                PhotoBooth.appRouter.navigate("clips/" + model.id, { trigger: true });
            }, 1000);
        },

        onError: function(model) {
            var $message = this.$(".row-info"),
                $text = $("<p>")
                .addClass("text-danger")
                .html('There was an error creating your clip, would you like to <a href="#" class="btn-retry">retry?</a>');

            $message.html($text);
            this.camera.stopVideo();
        },

        saveSnapshot: function(name) {
            var model = this.model;

            return this.camera.capture({
                width: 480,
                height: 320,
                type: "image/jpeg",
                quality: 0.8
            }).done(function(blob) {
                var data = {};

                data[name] = blob;
                model.addFormData(data);
            });
        }
    });
})(window);
