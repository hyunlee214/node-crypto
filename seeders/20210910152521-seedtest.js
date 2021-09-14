'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let seeding = [];
    for (let x = 0; x < 10; x++) {
      let obj = {
        email: "seed" + x + "@seeding.com",
        name: "seeding" + x,
        password: "1234",
        createdAt : new Date().toISOString().replace(/T/,'  ').replace(/\..+/, ''),
        updatedAt : new Date().toISOString().replace(/T/,'  ').replace(/\..+/, '')
      }
      seeding.push(obj);
    }
    return queryInterface.bulkInsert('users',datas, {});

    // sequelize db:migrate
    // sequelize db:seed:all 
    // seed 파일 작성 후 db에 반영 + seeder가 up의 로직 수행
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});

    // sequelize db:seed:undo:all 
    // seed를 초기화
  }
};
