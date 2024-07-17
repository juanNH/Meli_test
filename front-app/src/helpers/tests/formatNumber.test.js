import { formatNumber } from "./../formatNumber";

describe("formatNumber function test", () => {
  it("should return string number with . where have 4 digits space", async () => {
    const result = formatNumber(1000000)
    expect(result).toEqual("1.000.000");
  });
  it("should return string number without . because his length is less than 4 digit", async () => {
    const result = formatNumber(100)
    expect(result).toEqual("100");
  });
});
