'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let datas = [];
    for (let i = 0; i < 3; i++) {
      let testing = {
        name : "testUser" + i,
        email : "test" + i + "@testing.com",
        password: "0000",
        createdAt : new Date().toISOString().replace(/T/,'  ').replace(/\..+/, ''),
        updatedAt : new Date().toISOString().replace(/T/,'  ').replace(/\..+/, '')
      }
      datas.push(testing);
    }
    
    return queryInterface.bulkInsert('users', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
