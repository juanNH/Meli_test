import { priceFormat } from "./../priceFormat";

describe("priceFormat function test", () => {
  it("should return formatNumber with decimal", async () => {
    const result = priceFormat(1000,23)
    expect(result).toEqual("1.000,23");
  });
  it("should return formatNumber less 4 digit, without decimal because is 0", async () => {
    const result = priceFormat(100,0)
    expect(result).toEqual("100");
  });
  it("should return formatNumber less 4 digit with out decimal because is 0", async () => {
    const result = priceFormat(40,0)
    expect(result).toEqual("40");
  });
  it("should return formatNumber less 4 digit with decimal", async () => {
    const result = priceFormat(40,4)
    expect(result).toEqual("40,4");
  });
});
