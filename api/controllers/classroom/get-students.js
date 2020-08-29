const Classroom = require("../../models/Classroom");

module.exports = {


  friendlyName: 'Get students',


  description: '',


  inputs: {
    id: {
      description: 'The class id.',
      example: '1',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    var user = await User.findOne({id: this.req.me.id}).populate('classRooms');
    var classRoom = await Classroom.findOne({id: inputs.id}).populate('students');

    
    // All done.
    return;

  }


};
