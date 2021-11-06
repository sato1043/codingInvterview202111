import "@testing-library/jest-dom/extend-expect";
import { pagesPath } from "../src/lib/$path";

describe("$path", () => {
  test("pagesPathが定義済", () => {
    expect(pagesPath.$url()).toBeDefined();
    expect(pagesPath.Home.$url()).toBeDefined();
  });
});
