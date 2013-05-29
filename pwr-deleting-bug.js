Posts = new Meteor.Collection('posts');
Authors = new Meteor.Collection('authors');

if (Meteor.isClient) {
  Meteor.subscribe('posts-with-authors');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Posts.find().count() === 0) {
      var authorId = Authors.insert({});
      var firstPostId = Posts.insert({authorId: authorId});
      var secondPostId = Posts.insert({authorId: authorId});
    }
  });
  
  Meteor.publish('posts-with-authors', function() {
    Meteor.publishWithRelations({
      handle: this,
      collection: Posts,
      filter: {},
      mappings: [{
        key: 'authorId',
        collection: Authors
      }]
    });
  });
}
