(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Collections = PhotoBooth.Collections || {};

    PhotoBooth.Collections.Clips = Backbone.Collection.extend({
        url: "api/clips",

        model: PhotoBooth.Models.Clip,

        comparator: function(model1, model2) {
            var v1 = model1.get('votes'),
                v2 = model2.get('votes');

            return v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
        }
    });
})(window);
