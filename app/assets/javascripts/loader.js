(function(root) {
    var PhotoBooth = new Marionette.Application();

    PhotoBooth.addInitializer(function() {
        PhotoBooth.addRegions({
            mainRegion: "section"
        });

        PhotoBooth.appRouter = new PhotoBooth.Router({
            controller: new PhotoBooth.Controllers.Clips()
        });

        Backbone.history.start();
    });

    root.PhotoBooth = PhotoBooth;
})(window);


