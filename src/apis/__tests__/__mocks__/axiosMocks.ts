import { vi } from "vitest";
const mocks = vi.hoisted(() => ({
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
}));
//mock axios setup
vi.mock("axios", async (importActual) => {
    const actual = await importActual<typeof import("axios")>();
    const mockAxios = {
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                ...actual.default.create(),
                get: mocks.get,
                post: mocks.post,
                put: mocks.put,
                delete: mocks.delete,
            })),
        },
    };
    return mockAxios;
});
beforeEach(() => {
    mocks.post.mockReset();
    mocks.get.mockReset();
    mocks.put.mockReset();
    mocks.delete.mockReset();
});
export default mocks;
