(function(root) {
    var PhotoBooth = new Marionette.Application();

    PhotoBooth.Router = Marionette.AppRouter.extend({
        appRoutes: {
            ""          : "index",
            "clips"     : "index",
            "clips/new" : "create",
            "clips/:id" : "show"
        }
    });

    PhotoBooth.addInitializer(function() {
        PhotoBooth.addRegions({
            mainRegion: ".container"
        });

        PhotoBooth.appRouter = new PhotoBooth.Router({
            controller: new PhotoBooth.Controllers.Clips()
        });

        Backbone.history.start();
    });

    root.PhotoBooth = PhotoBooth;
})(window);