(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Controllers = PhotoBooth.Controllers || {};

    PhotoBooth.Controllers.Clips = Marionette.Controller.extend({
        index: function() {
            var collection = new PhotoBooth.Collections.Clips();
            var view = new PhotoBooth.Views.Clips({
                collection: collection
            });

            collection.fetch();

            PhotoBooth.mainRegion.show(view);
        },

        create: function() {
            var model = new PhotoBooth.Models.Clip();
            var view = new PhotoBooth.Views.Booth({
                model: model
            });

            PhotoBooth.mainRegion.show(view);
        }
    });
})(window);