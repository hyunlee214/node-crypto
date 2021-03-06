'use strict';

module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  //게시글 아래 댓글 구현
  post.associate = function(models) {
    post.hasMany(models.reply);
  };

  return post;
}