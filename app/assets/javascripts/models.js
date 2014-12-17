(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Models = PhotoBooth.Models || {};
    PhotoBooth.Collections = PhotoBooth.Collections || {};

    PhotoBooth.Models.Clip = Backbone.Model.extend({
        urlRoot: "api/clips",

        defaults: {
            votes: 0
        },

        addSnapshot: function(params) {
            var snapshots = this.getSnapshots();

            return snapshots.add(params);
        },

        getSnapshots: function() {
            if (!this.has('snapshots')) {
                this.set('snapshots', new Backbone.Collection());
            }

            return this.get('snapshots');
        },

        upvote: function() {
            var currentVotes = this.get('votes');

            return this.save({ votes: currentVotes + 1 }, {
                attrs: { id: this.id },
                url: this.url() + '/upvote',
                wait: true
            });
        }
    });

    PhotoBooth.Collections.Clips = Backbone.Collection.extend({
        url: "api/clips",
        model: PhotoBooth.Models.Clip
    });
})(window);