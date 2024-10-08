// SearchForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from "../components/searchForm"

const mockOnSearch = jest.fn();

describe('SearchForm', () => {
  it('renders the search form', () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    expect(screen.getByLabelText(/Keyword/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('calls onSearch when the search button is clicked', () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    fireEvent.change(screen.getByLabelText(/Keyword/i), { target: { value: 'Basic' } });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    
    expect(mockOnSearch).toHaveBeenCalled();
    expect(mockOnSearch).toHaveBeenCalledWith({ keyword: 'Basic', includeCanceled: false });
  });
});
