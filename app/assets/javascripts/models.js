(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Models = PhotoBooth.Models || {};
    PhotoBooth.Collections = PhotoBooth.Collections || {};

    PhotoBooth.Models.Clip = Backbone.Model.extend({
        urlRoot: "api/clips",

        defaults: {
            votes: 0,
            snapshots: []
        },

        upvote: function() {
            var currentVotes = this.get('votes');

            return this.save({ votes: currentVotes + 1 }, {
                attrs: { id: this.id },
                url: this.url() + '/upvote',
                wait: true
            });
        },

        isProcessing: function() {
            var snapshots = this.get('snapshots');

            return (snapshots.length !== 4) || snapshots.some(function(snapshot) {
                return snapshot.is_processing;
            });
        },

        markAsMissing: function() {
            var snapshots = this.get('snapshots');

            _.each(snapshots, function(snapshot) {
                if (snapshot.is_processing) {
                    snapshot.is_missing = true;
                }
            });

            this.trigger('change', this);
        },

        getFormData: function() {
            return this.formData;
        },

        addFormData: function(data) {
            this.formData = this.formData || {};

            _.extend(this.formData, data);
        },

        resetFormData: function() {
            this.formData = {};
        },

        toFormData: function() {
            var form = new FormData();

            _.each(this.formData, function(fieldValue, fieldName) {
                form.append('clip[' + fieldName + ']', fieldValue);
            }, this);

            return form;
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