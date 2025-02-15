'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'nhunhu@gmail.com',
      password: '123456', //plain text
        firstName: 'John',
        lastName: 'Doe',
       address: 'USA',
      phoneNumber: '0123456789',
       gender: 1,
       image: '',
       roleId: 'ROLE',
      positionId: 'R1',
      
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
