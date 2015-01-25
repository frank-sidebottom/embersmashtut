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


// Test data--------------------------------------------------------------
App.Caca = DS.Model.extend({
	name      : DS.attr(),
	turdiness : DS.attr()
});

App.Caca.FIXTURES = [{
	id: 1,
	name: 'Billy',
	turdiness: 'Maximum'
}, {
	id: 2,
	name: 'Bob',
	turdiness: 'Maximalism'
}];


// End Test data--------------------------------------------------------------

// router initialization
App.Router.map(function(){
	    this.resource('cacas', function(){
    	this.resource('caca', { path: '/:caca_id'});
    });
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

App.CacasRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('caca');
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

//User Route
App.UserRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('user', params.user_id);
	}
});

//UserController
App.UserController =Ember.ObjectController.extend();



