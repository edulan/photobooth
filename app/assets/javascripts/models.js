(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Models = PhotoBooth.Models || {};
    PhotoBooth.Collections = PhotoBooth.Collections || {};

    PhotoBooth.Models.Clip = Backbone.Model.extend({
        urlRoot: "/clips",

        addSnapshot: function(params) {
            var snapshots = this.getSnapshots();

            return snapshots.add(params);
        },

        getSnapshots: function() {
            if (!this.has('snapshots')) {
                this.set('snapshots', new Backbone.Collection());
            }

            return this.get('snapshots');
        }
    });

    PhotoBooth.Collections.Clips = Backbone.Collection.extend({
        url: "/clips",
        model: PhotoBooth.Models.Clip
    });
})(window);