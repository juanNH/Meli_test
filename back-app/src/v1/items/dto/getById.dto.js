const AuthorDto = require("../../../commons/dto/Author.dto");
class GetByIdDto extends AuthorDto {
  constructor(idItem, name, lastname) {
    super(name, lastname);
    this.idItem = idItem;
  }
}

module.exports = GetByIdDto;
