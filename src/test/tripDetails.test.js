// TripDetails.test.js
import { render, screen } from '@testing-library/react';
import TripDetails from "../components/tripDetails";  // Import the component to be tested
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter for proper routing context
import { useParams } from 'react-router-dom';      // Import useParams for mocking

// Mock useParams to simulate URL parameters
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockTrip = {
  id: 608,
  status: 'COMPLETED',
  request_date: '2019-08-16 10:49:25',
  pickup_location: 'St James, Nairobi',
  dropoff_location: 'Nextgen Mall, Nairobi',
  pickup_date: '2019-08-16 10:50:32',
  dropoff_date: '2019-08-16 11:26:32',
  distance: 1.54,
  duration: 36,
  cost: 253,
  driver_name: 'Alize',
  driver_rating: 5,
  driver_pic: 'https://rapidtechinsights.github.io/hr-assignment/p13.jpg',
  car_make: 'Honda',
  car_model: 'Civic',
  car_pic: 'https://rapidtechinsights.github.io/hr-assignment/c13.jpg',
};

describe('TripDetails', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: mockTrip.id });  // Mocking route parameter 'id'
  });

  it('renders trip details correctly', () => {
    render(
      <BrowserRouter>  {/* Wrap component in BrowserRouter */}
        <TripDetails trip={mockTrip} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Trip Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Pick-up Location:/i)).toBeInTheDocument();
    expect(screen.getByText(mockTrip.pickup_location)).toBeInTheDocument();
    expect(screen.getByText(mockTrip.dropoff_location)).toBeInTheDocument();
    expect(screen.getByText(`${mockTrip.cost} KES`)).toBeInTheDocument();
    expect(screen.getByText(mockTrip.driver_name)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockTrip.driver_name}'s picture`)).toBeInTheDocument();
  });

  it('renders the map component', () => {
    render(
      <BrowserRouter>
        <TripDetails trip={mockTrip} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Map of the Trip/i)).toBeInTheDocument();
  });
});
