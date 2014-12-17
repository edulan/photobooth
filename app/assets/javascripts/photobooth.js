(function(root) {
    var PhotoBooth = new Marionette.Application();

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

        new PhotoBooth.Router({
            controller: new PhotoBooth.Controllers.Clips()
        });

        Backbone.history.start();
    });

    root.PhotoBooth = PhotoBooth;
})(window);