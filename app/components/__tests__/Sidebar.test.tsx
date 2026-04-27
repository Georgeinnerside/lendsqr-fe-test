import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../common/Sidebar/Sidebar";

const mockPathname = jest.fn();
const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockLogout = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock("@/context/UserContext", () => ({
  useUserContext: () => ({
    logout: mockLogout,
  }),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logout button on user details page", () => {
    mockPathname.mockReturnValue("/users/123");

    render(<Sidebar />);

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("does not render logout on users list page", () => {
    mockPathname.mockReturnValue("/users");

    render(<Sidebar />);

    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  it("logs out and redirects to login", () => {
    mockPathname.mockReturnValue("/users/123");

    render(<Sidebar />);

    fireEvent.click(screen.getByLabelText("logout"));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/login");
    expect(mockRefresh).toHaveBeenCalled();
  });
});
