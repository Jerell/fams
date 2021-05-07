import { mtpaToM3ps } from "../unitConversion"

describe("mtpaToM3ps", () => {
  it("should convert units correctly", () => {
    
    const result = mtpaToM3ps(1)

    expect(result).toBeCloseTo(16.733)
  })
})