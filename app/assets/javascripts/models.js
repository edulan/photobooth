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

        model: PhotoBooth.Models.Clip,

        comparator: function(model1, model2) {
            var v1 = model1.get('votes'),
                v2 = model2.get('votes');

            return v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
        }
    });
})(window);