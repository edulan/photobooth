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
        },

        sync: function(method, model, options) {
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

            return Backbone.sync.call(this, method, model, options);
        }
    });

    PhotoBooth.Clips = Backbone.Collection.extend({
        url: "/clips",
        model: PhotoBooth.Clip
    });

    PhotoBooth.ClipItemView = Marionette.ItemView.extend({
        template: _.template([
            '<div class="row">',
                '<% _.each(snapshots, function(snapshot) { %>',
                    '<div class="clip-image-wrapper">',
                        '<img class="clip-image" src="<%= snapshot.thumb_url %>" alt="">',
                    '</div>',
                '<% }) %>',
            '</div>'
        ].join("\n")),

        className: "clip-group"
    });

    PhotoBooth.ClipsView = Marionette.CompositeView.extend({
        template: _.template([
            '<div class="row">',
                '<h1>PhotoBooth Hall</h1>',
            '</div>',
            '<div class="row">',
                '<a class="btn btn-primary pull-right" href="#new">New Clip</a>',
            '</div>',
            '<div class="row row-clip"></div>'
        ].join("\n")),

        className: "clips",

        childView: PhotoBooth.ClipItemView,

        appendHtml: function(collectionView, itemView) {
            collectionView.$('.row-clip').append(itemView.el);
        }
    });

    PhotoBooth.BoothView = Marionette.CompositeView.extend({
        template: _.template([
            '<div class="row">',
            '    <h1>New clip</h1>',
            '</div>',
            '<div class="row">',
            '    <p class="text-info">Take your time to make a good impression.</p>',
            '    <p class="text-info">When you\'re ready click start</p>',
            '</div>',
            '<div class="row text-center">',
            '    <div class="booth-flash"></div>',
            '    <video id="snap-preview" class="center-block" width="480" height="320" autoplay></video>',
            '    <p id="message" class="text-primary"></p>',
            '</div>',
            '<div class="row text-right">',
            '    <a href="#hall" class="btn btn-default btn-back">Back</a>',
            '    <a href="#" class="btn btn-primary btn-start">Start!</a>',
            '</div>',
            '<div class="row row-snapshots"></div>',
        ].join("\n")),

        events: {
            'click .btn-start': 'onStart'
        },

        onShow: function() {
            PhotoBooth.Camera.startVideo(this.$("#snap-preview"));
        },

        onBeforeDestroy: function() {
            PhotoBooth.Camera.stopVideo(this.$("#snap-preview"));
        },

        onStart: function(event) {
            var countdownSeconds = 2,
                snapshotsCount = 4,
                remainingSnapshots = snapshotsCount,
                countdown = countdownSeconds,
                $counter = this.$("#message"),
                $flash = this.$(".booth-flash");

            var that = this;

            function takeNext () {
                if (remainingSnapshots <= 0) {
                    PhotoBooth.Camera.stopVideo(this.$("#snap-preview"));
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

        saveSnapshot: function() {
            var canvas = PhotoBooth.Camera.capture(this.$("#snap-preview"), {
                width: 480,
                height: 320
            });
            var model = this.model;

            // Convert canvas to blob data
            canvas.toBlob(function(blob) {
                model.addSnapshot({
                    data: blob
                });
            }, "image/png");
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