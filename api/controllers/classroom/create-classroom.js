const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
// const Classroom = require('../../models/Classroom');

module.exports = {


  friendlyName: 'Create classroom',


  description: '',


  inputs: {
    className: {
      description: 'The class name.',
      example: 'My New Classroom',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    var className = inputs.className;
    var uniqueName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey
    
    var classRoom = await Classroom.create({
      name: className,
      identifier: uniqueName,
      pinCode: Math.floor(Math.random()*90000) + 10000,
      teacher: this.req.me.id
    }).fetch();

    console.log(classRoom);

    // All done.
    return;

  }


};
