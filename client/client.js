Appointments = new Meteor.Collection("appointments");

Template.getApp.appointments = function () {
   return Appointments.find({},{sort:{date:-1}});
};
Template.getInfo.appointments = function () {
   return Appointments.find(Session.get("selected_app"));
};
Template.appointment.selected = function(){
	return Session.equals("selected_app",this._id)? "selected": '';
};
Template.getApp.selected_app = function () {
	var m = Appointments.findOne(Session.get("selected_app"));
	return m && m.title;
};
Template.content.events({
	'click .add_app_nav' :function(){
		Session.set("showCreateAppointment",true);
	},
	'click .home' : function(){
		Session.set("showCreateAppointment",false);
	}
});

Template.appointment.events({
	'click':function () {
		Session.set("selected_app",this._id);
	}
});

Template.content.showCreateAppointment = function () {
  return Session.get("showCreateAppointment");
};

Template.createAppointment.events({
	'click .cancel':function(){
		Session.set("showCreateAppointment",false);	
	},
	'click .save': function (event, template) {
    var t = template.find(".title_input").value;
    var i = template.find(".description_input").value;
    console.log(t);
	Appointments.insert({title:t,info:i,date: new Date(),user:Meteor.user()._id});
	Session.set("showCreateAppointment",false);	
	}

})
Template.getApp.events({
	'click .delete':function(){
		Appointments.remove(Session.get("selected_app"));
	}
})