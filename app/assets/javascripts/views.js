(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Views = PhotoBooth.Views || {};

    PhotoBooth.Views.ClipItem = Marionette.ItemView.extend({
        template: "clips/item",
        className: "clip-group"
    });

    PhotoBooth.Views.Clips = Marionette.CompositeView.extend({
        template: "clips/index",
        className: "clips",

        childView: PhotoBooth.Views.ClipItem,
        childViewContainer: ".row-clip"
    });

    PhotoBooth.Views.ClipDetail = Marionette.ItemView.extend({
        template: "clips/show",

        events: {
            "click .btn-delete": "onDelete"
        },

        initialize: function(options) {
            this.listenTo(this.model, 'change', this.onChanged);
            this.listenTo(this.model, 'destroy', this.onDestroyed);
        },

        onChanged: function(model) {
            this.render();
        },

        onDestroyed: function(model) {
            PhotoBooth.appRouter.navigate("clips", { trigger: true });
        },

        onDelete: function(event) {
            this.model.destroy({ wait: true });

            event.preventDefault();
        }
    });

    PhotoBooth.Views.Booth = Marionette.CompositeView.extend({
        template: "clips/new",

        events: {
            'click .btn-start': 'onStart'
        },

        initialize: function(options) {
            this.listenTo(this.model, 'request', this.onRequest);
            this.listenTo(this.model, 'sync', this.onSynced);
            this.listenTo(this.model, 'error', this.onError);
        },

        onShow: function() {
            var $message = this.$(".row-info");

            if (!PhotoBooth.Services.FeatureDetection.isVideoSupported()) {
                $message
                    .text("Sorry, your browser does not support video stream API")
                    .show();
                return;
            }

            this.camera = new PhotoBooth.Services.Camera(this.$("#snap-preview"));
            this.camera.startVideo()
                .done(function() {
                    var $text = $("<p>")
                        .addClass("text-info")
                        .text("Take your time to make a good impression. When you're ready click start button");

                    $message.html($text);

                })
                .fail(function(error) {
                    var $text = $("<p>")
                        .addClass("text-warning")
                        .text(error.message);

                    $message.html($text);
                });
        },

        onBeforeDestroy: function() {
            if (this.camera) {
                this.camera.stopVideo();
            }
        },

        onStart: function(event) {
            var countdownSeconds = PhotoBooth.Settings.countdownSeconds,
                snapshotsCount = 4,
                remainingSnapshots = snapshotsCount,
                countdown = countdownSeconds,
                $counter = this.$(".message-countdown"),
                $flash = this.$(".cam-flash");

            var that = this;

            function takeNext () {
                if (remainingSnapshots <= 0) {
                    that.camera.stopVideo();
                    that.model.save(null, { multipart: true });
                    return;
                }

                remainingSnapshots--;

                function updateCounter () {
                    // $counter.text(--countdown);
                    countdown--;

                    if (countdown <= 0) {
                        // Reset countdown
                        countdown = countdownSeconds;
                        $flash.show().fadeOut("slow");
                        that.saveSnapshot();
                        takeNext();
                        return;
                    }

                    $counter.text(countdown);
                    setTimeout(updateCounter, 1000);
                }

                $counter.text(countdown);
                setTimeout(updateCounter, 1000);
            }

            takeNext();

            event.preventDefault();
        },

        onRequest: function(model) {
            var $message = this.$(".row-info"),
                $text = $("<p>")
                .addClass("text-info")
                .text("Sending clip contents....");

            $message.html($text);
        },

        onSynced: function(model) {
            var $message = this.$(".row-info"),
                $text = $("<p>")
                .addClass("text-success")
                .text("Clip created successfully!");

            $message.html($text);

            setTimeout(function() {
                $message.html("Redirecting...");
                PhotoBooth.appRouter.navigate("clips/" + model.id, { trigger: true });
            }, 1500);
        },

        onError: function(model) {
            var $message = this.$(".row-info"),
                $text = $("<p>")
                .addClass("text-danger")
                .text("There was an error creating your clip :O");

            $message.html($text);
        },

        saveSnapshot: function() {
            var model = this.model;

            this.camera.capture({
                width: 480,
                height: 320,
                type: "image/jpeg",
                quality: 0.8
            }).done(function(blob) {
                model.addSnapshot({
                    data: blob
                });
            });
        }
    });
})(window);