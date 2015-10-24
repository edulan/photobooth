(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Views = PhotoBooth.Views || {};

    PhotoBooth.Views.Clips.List = Marionette.CompositeView.extend({
        template: "clips/index",
        className: "clips",

        childView: PhotoBooth.Views.Clips.Item,
        childViewContainer: ".row-clip",
        emptyView: PhotoBooth.Views.Clips.Empty
    });
})(window);
