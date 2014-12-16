$(function() {
    var PhotoBooth = new Marionette.Application();

    PhotoBooth.Clip = Backbone.Model.extend();

    PhotoBooth.Clips = Backbone.Collection.extend({
        url: "/clips",
        model: PhotoBooth.Clip
    });

    PhotoBooth.ClipItemView = Marionette.ItemView.extend({
        template: _.template([
            '<div class="row">',
            '<div class="clip-image-wrapper"><img class="clip-image" src="<%= frame.thumb_url %>" alt=""></div>',
            '<div class="clip-image-wrapper"><img class="clip-image" src="<%= frame.thumb_url %>" alt=""></div>',
            '<div class="clip-image-wrapper"><img class="clip-image" src="<%= frame.thumb_url %>" alt=""></div>',
            '<div class="clip-image-wrapper"><img class="clip-image" src="<%= frame.thumb_url %>" alt=""></div>',
            '</div>'
        ].join("\n")),
        className: "clip-group"
    });

    PhotoBooth.ClipsView = Marionette.CollectionView.extend({
        className: "clip-list",
        childView: PhotoBooth.ClipItemView
    });

    PhotoBooth.addRegions({
        mainRegion: ".container",
        clipsRegion: ".row-clip"
    });

    PhotoBooth.addInitializer(function() {
        var collection = new PhotoBooth.Clips();
        var view = new PhotoBooth.ClipsView({
            collection: collection
        });

        PhotoBooth.clipsRegion.show(view);

        collection.fetch();
    });

    PhotoBooth.start();
});