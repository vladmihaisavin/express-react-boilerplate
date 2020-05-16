module.exports = {
  tableName: 'users',
  fields: {
    required: [
      'name',
      'email'
    ],
    optional: [
      'type',
      'password',
      'createdAt',
      'updatedAt'
    ],
    projection: [
      'id',
      'name',
      'email',
      'type',
      'password',
      'createdAt',
      'updatedAt'
    ]
  }
}