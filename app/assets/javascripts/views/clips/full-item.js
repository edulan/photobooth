(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Views = PhotoBooth.Views || {};

    PhotoBooth.Views.Clips.FullItem = Marionette.ItemView.extend({
        template: "clips/show",

        events: {
            "click .btn-like": "onLike",
            "click .btn-delete": "onDelete"
        },

        initialize: function(options) {
            this.listenTo(this.model, 'change', this.onChanged);
            this.listenTo(this.model, 'destroy', this.onDestroyed);
            this.listenTo(this.model, 'error', this.onError);
        },

        onShow: function() {
            this.checkDelay = 0;
            this.checkCount = 0;
            this.checkProcessing(this.model);
        },

        checkProcessing: function(model) {
            if (!model.isProcessing()) {
                return;
            }

            if (this.checkCount > 4) {
                this.checkDelay = 0;
                this.checkCount = 0;
                this.model.markAsMissing();
                return;
            }

            this.checkDelay = 1000 * (Math.pow(2, this.checkCount) + Math.random());
            this.checkCount += 1;

            model.fetch({
                success: _.bind(function(model) {
                    _.delay(
                        _.bind(this.checkProcessing, this),
                        this.checkDelay,
                        model);
                }, this)
            });
        },

        onChanged: function(model) {
            this.render();
        },

        onError: function(model) {
            var $message = this.$(".row-info"),
                $text = $("<p>")
                .addClass("text-danger")
                .html('Upss! Seems like this clip has been deleted');

            $message.html($text);
        },

        onDestroyed: function(model) {
            PhotoBooth.appRouter.navigate("clips", { trigger: true });
        },

        onLike: function(event) {
            this.model.upvote();

            event.preventDefault();
        },

        onDelete: function(event) {
            if (confirm('Are you sure?')) {
                this.model.destroy({ wait: true });
            }

            event.preventDefault();
        }
    });
})(window);
