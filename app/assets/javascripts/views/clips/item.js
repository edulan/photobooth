(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Views = PhotoBooth.Views || {};

    PhotoBooth.Views.Clips.Item = Marionette.ItemView.extend({
        template: "clips/item",
        className: "clip-group clip-thumb"
    });
})(window);
