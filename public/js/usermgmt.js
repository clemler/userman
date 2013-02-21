// UserMgmt Module
// File: usermgmt.js
// Author: Chris Lemler
//
// This module encapsulates the functionality of the User Management POC portlet.
//



// Create the UserMgmt module. We will adopt the new EcmaScript 'strict mode'
window.UserMgmt = (function ($) {
    "use strict";
    console.log("Constructing UserMgmt");

    //=======================================
    // Private Module Variables Here
    //=======================================
    var self;

    // Models a single member of the Bedrock Bowling League
    var User = Backbone.Model.extend({
        defaults: {
            uid: -1,
            name: '',
            address: '',
            phone: '',
            email: '',
            isPBAMember: false
        },
        idAttribute: 'uid'
    });
    
    // Models the collection of people that belong to the Bedrock Bowling League
    var Bowlers = Backbone.Collection.extend({
        model: User,
        url: "/users"
    });
    
    var bowlerList = new Bowlers();
    
    var UsersView = Backbone.View.extend({
        el: $('#users-containers'),
        collection: bowlerList,
        popoverElem: null,
        popoverElemId: -1, 
        
        // Register a 'click' handler for when the user selects the 'eye' icon
        events: {
            'click .user-details-trigger': 'showUserDetails'
        },
        
        initialize: function() {
			_.bindAll(this);
			
			this.tableSource = $("#users-template").html();
            this.tableTemplate = Handlebars.compile(this.tableSource);
			this.userDetailsSource = $("#user-details-template").html();
            this.userDetailsTemplate = Handlebars.compile(this.userDetailsSource);
		},
		
        render: function() {
            var html = this.tableTemplate(this.collection.toJSON());   
            this.$el.html(html);
            
            // Register a Popover object with each user's 'eye' icon
            $('.user-details-trigger').popover({"trigger":"manual", "html": "true", "placement": "right", "title": "Bedrock Bowler Details"});
        },
        
        
        showUserDetails: function(event) {
            console.log('Entered UsersView-->showUserDetails()');
            
            // Check if another popover is open on the screen
            if (this.popoverElem !== null) {
                console.log('There is another popover on the screen');
                this.popoverElem.popover('hide');
                if ( this.popoverElemId === event.target.id) {
                    this.popoverElem = null;
                    this.popoverElemId = -1;
                    return;
                }
            }
            this.popoverElem = $(event.target);
            this.popoverElemId = event.target.id;
            var elemModel = this.collection.get(this.popoverElemId);
            var elemJSON = elemModel.toJSON();
            var elemHTML = this.userDetailsTemplate(elemJSON);
            this.popoverElem.attr('data-content', elemHTML);
            this.popoverElem.popover('show');
        }
    });
    
    var bowlersView = new UsersView();


    //=======================================
    // Private Module Functions Here
    //=======================================

    // Register callbacks for the icons that control whether the display
    // is shown as a tile-line, tile-block, or a grid. Each callback
    // recives the jQuery identifier for the ADDA in which the content
    // shoud be displayed ('#CLL-user-grid')
    function registerHandlers() {
        console.log("Entered registerHandlers()");

        // The onclick handler for Click Me button
        $("#displayProfileBtn").click( function () {
            getUserProfile("Fred");
        });
    }


    //=======================================
    // Public Module Variables and Functions
    //=======================================
    return {

        // Initialize the UserProfile module. This method must be called prior to
        // any other operations.
        //
        init: function () {
            self = this;    // Obtain reference to 'this' for private functions
            
            // Retrieve the initial set of users from the server. Once loaded,
            // render the page
            bowlerList.fetch({'success': function(collection, response, options) {
                console.log('Entered fetch success');
                console.log('collection --> ' + collection);
                console.log("bowlerList--> " + bowlerList.toJSON());
                console.log(bowlerList.get("1").get("name"));
                bowlersView.render();
            }});
        }
    };
}(jQuery));
