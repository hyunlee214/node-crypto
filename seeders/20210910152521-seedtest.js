'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let seeding = [];
    for (let x = 0; x < 10; x++) {
      let obj = {
        email: "seed" + x + "@seeding.com",
        name: "seeding" + x,
        password: "0000",
        createdAt : new Date().toISOString().replace(/T/,'  ').replace(/\..+/, ''),
        updatedAt : new Date().toISOString().replace(/T/,'  ').replace(/\..+/, '')
      }
      seeding.push(obj);
    }
    return queryInterface.bulkInsert('users',datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
