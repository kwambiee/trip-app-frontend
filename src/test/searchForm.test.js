
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import SearchForm from "../components/searchForm";


jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(), 
}));

describe("SearchForm Component", () => {
  const mockOnSearch = jest.fn(); 

  beforeEach(() => {
    mockOnSearch.mockClear(); 
  });

  test("renders form with initial values", () => {
    render(
      <MemoryRouter>
        <SearchForm onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    
    expect(screen.getByLabelText(/Keyword/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Include Canceled Trips/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Distance \(km\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Before Time/i)).toBeInTheDocument();

    
    expect(screen.getByLabelText(/Keyword/i).value).toBe("");
    expect(screen.getByLabelText(/Include Canceled Trips/i).checked).toBe(
      false
    );
    expect(screen.getByLabelText(/Max Distance \(km\)/i).value).toBe("");
    expect(screen.getByLabelText(/Before Time/i).value).toBe("");
  });

  test("allows user to input and submit form data", () => {
    render(
      <MemoryRouter>
        <SearchForm onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    
    fireEvent.change(screen.getByLabelText(/Keyword/i), {
      target: { value: "Beach" },
    });
    fireEvent.click(screen.getByLabelText(/Include Canceled Trips/i));
    fireEvent.change(screen.getByLabelText(/Max Distance \(km\)/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/Before Time/i), {
      target: { value: "2024-10-15T10:00" },
    });

    
    fireEvent.submit(screen.getByRole("button", { name: /Search/i }));

    
    expect(mockOnSearch).toHaveBeenCalledWith({
      keyword: "Beach",
      includeCanceled: true,
      distance: "50",
      time: "2024-10-15T10:00",
    });
  });

  test("navigates to the results page on form submit", () => {
    const mockNavigate = jest.fn(); 
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <SearchForm onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    
    fireEvent.submit(screen.getByRole("button", { name: /Search/i }));

    
    expect(mockNavigate).toHaveBeenCalledWith("/results");
  });
});
