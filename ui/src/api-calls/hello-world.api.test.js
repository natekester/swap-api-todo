import { HELLO_WORLD_API } from "./URLs";
import callHelloWorld from "./hello-world.api";
import { get } from "./fetch";

jest.mock("./fetch", () => ({ get: jest.fn() }));

describe("Testing the Assets Service", () => {
  let mockURLCall;

  beforeEach(() => {
    mockURLCall = get;
    console.log({ mockURLCall });
    mockURLCall.mockResolvedValue({ test: "test" });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Fetch has been called", async () => {
    // fetchMock.mockReturnedValue(
    //   Promise.resolve({
    //     json: () => Promise.resolve({ test: 100 }),
    //   })
    // );

    const value = await callHelloWorld();

    expect(mockURLCall).toHaveBeenCalled();
    expect(mockURLCall).toHaveBeenCalledWith(HELLO_WORLD_API);
  });
});
