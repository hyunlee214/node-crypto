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
  // reply(댓글)과 post(게시글) 매핑
  reply.associate = function(models){
    reply.belongsTo(models.post, {
      foreignKey: "postId"
    })
  };
  return reply;
}
