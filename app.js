//app initialization

window.App = Ember.Application.create();


// Adapter initialization
App.ApplicationAdapter = DS.FixtureAdapter;

// the model for a user
App.User = DS.Model.extend({
  name         : DS.attr(),
  email        : DS.attr(),
  bio          : DS.attr(),
  avatarUrl    : DS.attr(),
  creationDate : DS.attr()
});

// FIXTURE data-----------------------------------------------------------------
App.User.FIXTURES = [{
    id: 1,
    name: 'Sponge Bob',
    email: 'bob@sponge.com',
    bio: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    avatarUrl: '../assets/images/avatars/sb.jpg',
    creationDate: '2013-08-26'
}, {
    id: 2,
    name: 'John David',
    email: 'john@david.com',
    bio: 'Lorem ispum dolor sit amet in voluptate fugiat nulla pariatur.',
    avatarUrl: '../assets/images/avatars/jk.jpg',
    creationDate: '2013-08-07'
}];

// END FIXTURE data--------------------------------------------------------------


// router initialization
App.Router.map(function(){
    this.resource('users', function(){
        this.resource('user', { path:'/:user_id' }, function(){
            this.route('edit');
        });
        this.route('create');
    });

});

App.IndexRoute = Ember.Route.extend({
  redirect: function(){
    this.transitionTo('users');
  }
});

//users route
App.UsersRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('user');
	}
});



// users array controller
App.UsersController = Em.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true, // false = descending
    
    usersCount: function(){
        return this.get('model.length');
    }.property('@each')
});

//It was unneccessary to add the following two code snippets, used as examples
//User Route
App.UserRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('user', params.user_id);
	}
});

//UserController
App.UserController = Ember.ObjectController.extend({
  actions: {
    edit: function(){
      this.transitionToRoute('user.edit');
    },
    delete: function(){
      this.toggleProperty('deleteMode');

    },
    cancelDelete: function(){
      this.set('deleteMode', false);
    },
    confirmDelete: function(){
      this.get('model').deleteRecord();
      this.get('model').save();
      this.transitionToRoute('user');
      this.set('deleteMode', false);
    }
  }
});

App.UserEditController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      var user = this.get('model');
      // this will tell Ember-Data to save/persist the new record
      user.save();
      // then transition to the current user
      this.transitionToRoute('user', user);
    }
  }
});

//Assign a model to the edit route
App.UserEditRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('user');
	}
});





