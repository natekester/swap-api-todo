const { HELLO_WORLD_API } = require("./URLs");
const { callHelloWorld } = require("./hello-world.api");

describe("Testing the Assets Service", () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = jest.spyOn("./fetch.js", "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Fetch has been called", async () => {
    fetchMock.mockReturnedValue(
      Promise.resolve({
        json: () => Promise.resolve({ test: 100 }),
      })
    );

    await callHelloWorld();

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(HELLO_WORLD_API);
  });
});
