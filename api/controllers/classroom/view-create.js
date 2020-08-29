module.exports = {


  friendlyName: 'View new',


  description: 'Display "New" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/classroom/new-classroom'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
