const generateUniqueID = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => { //isso deve gerar um ID único
    const id = generateUniqueID();

    expect(id) //espera que o id
    .toHaveLength(8) //tenha 8 caracteres
  });
});