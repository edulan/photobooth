var Clip = Backbone.Model.extend({
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

module.exports = Clip;
