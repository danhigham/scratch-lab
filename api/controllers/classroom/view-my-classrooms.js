module.exports = {


  friendlyName: 'View my classrooms',


  description: 'Display "My classrooms" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/classroom/my-classrooms'
    }

  },


  fn: async function () {

    var user = await User.findOne({id: this.req.me.id}).populate('classRooms');

    // Respond with view.
    return {
      classRooms: user.classRooms
     };

  }


};
