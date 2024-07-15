const AuthorDto = require("../../../commons/dto/Author.dto");

class SearchParamDto extends AuthorDto {
  constructor(q, name, lastname) {
    super(name, lastname);
    this.q = q;
  }
}

module.exports = SearchParamDto;
