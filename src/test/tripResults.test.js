// TripResults.test.js
import { render, screen } from '@testing-library/react';
import TripResults from "../components/tripResults";

const mockTrips = [
  {
    id: 608,
    status: 'COMPLETED',
    pickup_location: 'South C, Nairobi',
    dropoff_location: 'Eastleigh First Avenue',
    cost: 290,
    cost_unit: 'KES',
    pickup_date: '2019-08-16 10:50:32',
    driver_rating: 4,
  },
];

describe('TripResults', () => {
  it('renders trip results correctly', () => {
    render(<TripResults trips={mockTrips} />);
    
    expect(screen.getByText(/290 KES/i)).toBeInTheDocument();
    expect(screen.getByText(/South C, Nairobi/i)).toBeInTheDocument();
    expect(screen.getByText(/Eastleigh First Avenue/i)).toBeInTheDocument();
  });

  it('renders the status as completed with a tick', () => {
    render(<TripResults trips={mockTrips} />);
    
    expect(screen.getByText(/COMPLETED/i)).toBeInTheDocument();
    expect(screen.getByTestId('status-icon-completed')).toBeInTheDocument();
  });
});
