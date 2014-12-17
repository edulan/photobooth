(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Controllers = PhotoBooth.Controllers || {};

    PhotoBooth.Controllers.Clips = Marionette.Controller.extend({
        initialize: function(options) {
            this.collection = new PhotoBooth.Collections.Clips();
        },

        index: function() {
            var view = new PhotoBooth.Views.Clips({
                collection: this.collection
            });

            this.collection.fetch();

            PhotoBooth.mainRegion.show(view);
        },

        create: function() {
            var model = new PhotoBooth.Models.Clip();
            var view = new PhotoBooth.Views.Booth({
                model: model
            });

            PhotoBooth.mainRegion.show(view);
        },

        show: function(id) {
            var model;

            if (!(model = this.collection.get(id))) {
                model = new PhotoBooth.Models.Clip({
                    id: id,
                    snapshots: []
                });
                model.fetch();
            }

            var view = new PhotoBooth.Views.ClipDetail({
                model: model
            });

            PhotoBooth.mainRegion.show(view);
        }
    });
})(window);