
import { render, screen } from '@testing-library/react';
import TripResults from "../components/tripResults";
import { Router } from "react-router-dom"; 


describe('TripResults', () => {
  const mockTrips = [
    {
      id: 1,
      pickup_date: "2024-10-01T10:00:00Z",
      pickup_location: "Downtown",
      dropoff_location: "Airport",
      cost: 25,
      cost_unit: "USD",
      driver_rating: 4.5,
      status: "COMPLETED",
    },
    {
      id: 2,
      pickup_date: "2024-10-02T14:00:00Z",
      pickup_location: "City Center",
      dropoff_location: "Suburbs",
      cost: 15,
      cost_unit: "USD",
      driver_rating: 3,
      status: "CANCELED",
    },
  ];

   test("renders loading state correctly", () => {
     render(
       <MemoryRouter>
         <TripResults trips={[]} loading={true} />
       </MemoryRouter>
     );

     expect(screen.getByText("Loading trips...")).toBeInTheDocument();
     expect(screen.getByText("Loading trips...").previousSibling).toHaveClass(
       "animate-spin"
     );
   });

  test('renders trips correctly when data is loaded', () => {
    render(
      <Router>
        <TripResults trips={mockTrips} loading={false} />
      </Router>
  );

  
    expect(screen.getByText('2 trip(s) found')).toBeInTheDocument();

    
    expect(screen.getByText('Trip Date: 10/1/2024, 10:00:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Trip Cost: 25 USD')).toBeInTheDocument();
    expect(screen.getByText('Pickup: Downtown')).toBeInTheDocument();
    expect(screen.getByText('Dropoff: Airport')).toBeInTheDocument();
    expect(screen.getByText('Driver Rating:')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Details' })).toHaveAttribute('href', '/trips/1');

    
    expect(screen.getByRole('img', { name: 'check circle icon' })).toBeInTheDocument();

    
    expect(screen.getByText('Trip Date: 10/2/2024, 2:00:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Trip Cost: 15 USD')).toBeInTheDocument();
    expect(screen.getByText('Pickup: City Center')).toBeInTheDocument();
    expect(screen.getByText('Dropoff: Suburbs')).toBeInTheDocument();
    expect(screen.getByText('CANCELED')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Details' })).toHaveAttribute('href', '/trips/2');

    
    expect(screen.getByRole('img', { name: 'times circle icon' })).toBeInTheDocument();
  });
});


