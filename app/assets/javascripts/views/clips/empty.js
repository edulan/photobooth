(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Views = PhotoBooth.Views || {};

    PhotoBooth.Views.Clips.Empty = Marionette.ItemView.extend({
        tagName: "p",
        className: "text-info text-center message-no-clips",
        template: "clips/empty"
    });
})(window);
