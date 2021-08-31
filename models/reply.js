'use strict';

module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define('reply',{
    postId: {
      type: DataTypes.INTEGER,
      allowNull : false,
    },
    writer : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content : {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
  return reply;
}
