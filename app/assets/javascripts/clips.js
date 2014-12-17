(function(root) {
    var PhotoBooth = new Marionette.Application();

    PhotoBooth.Clip = Backbone.Model.extend({
        urlRoot: "/clips",

        addSnapshot: function(params) {
            var snapshots = this.getSnapshots();

            return snapshots.add(params);
        },

        getSnapshots: function() {
            if (!this.has('snapshots')) {
                this.set('snapshots', new Backbone.Collection());
            }

            return this.get('snapshots');
        }
    });

    PhotoBooth.Clips = Backbone.Collection.extend({
        url: "/clips",
        model: PhotoBooth.Clip
    });

    PhotoBooth.ClipItemView = Marionette.ItemView.extend({
        template: "clips/item",
        className: "clip-group"

    });

    PhotoBooth.ClipsView = Marionette.CompositeView.extend({
        template: "clips/index",
        className: "clips",

        childView: PhotoBooth.ClipItemView,

        appendHtml: function(collectionView, itemView) {
            collectionView.$('.row-clip').append(itemView.el);
        }
    });

    PhotoBooth.BoothView = Marionette.CompositeView.extend({
        template: "clips/new",

        events: {
            'click .btn-start': 'onStart'
        },

        initialize: function(options) {
            this.listenTo(this.model, 'request', this.onRequest);
            this.listenTo(this.model, 'sync', this.onSync);
            this.listenTo(this.model, 'error', this.onError);
        },

        onShow: function() {
            var $message = this.$(".row-info");

            if (!PhotoBooth.FeatureService.isVideoSupported()) {
                $message
                    .text("Sorry, your browser does not support video stream API")
                    .show();
                return;
            }

            this.camera = new PhotoBooth.Camera(this.$("#snap-preview"));
            this.camera.startVideo()
                .done(function() {
                    var $text = $("<p>")
                        .addClass("text-info")
                        .text("Take your time to make a good impression. When you were ready click start button");

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
            var countdownSeconds = 1,
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

        onSync: function(model) {
            var $message = this.$(".row-info"),
                $text = $("<p>")
                .addClass("text-success")
                .text("Clip created successfully!");

            $message.html($text);
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

    PhotoBooth.ClipsController = Marionette.Controller.extend({
        index: function() {
            var collection = new PhotoBooth.Clips();
            var view = new PhotoBooth.ClipsView({
                collection: collection
            });

            collection.fetch();

            PhotoBooth.mainRegion.show(view);
        },

        create: function() {
            var model = new PhotoBooth.Clip();
            var view = new PhotoBooth.BoothView({
                model: model
            });

            PhotoBooth.mainRegion.show(view);
        }
    });

    PhotoBooth.Router = Marionette.AppRouter.extend({
        appRoutes: {
            ""     : "index",
            "hall" : "index",
            "new"  : "create"
        }
    });

    PhotoBooth.addInitializer(function() {
        PhotoBooth.addRegions({
            mainRegion: ".container"
        });

        var controller = new PhotoBooth.ClipsController();

        new PhotoBooth.Router({
            controller: controller
        });

        Backbone.history.start();
    });

    root.PhotoBooth = PhotoBooth;
})(window);