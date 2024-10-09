
import { render, screen, waitFor } from '@testing-library/react';
import TripDetails from "../components/tripDetails";
import { MemoryRouter } from 'react-router-dom';   
import { fetchTripById } from "../services/tripService";  



jest.mock("../services/tripService", () => ({
  fetchTripById: jest.fn(),
}));

describe("TripDetails Component", () => {
  const tripData = {
    pickup_location: "Downtown",
    dropoff_location: "Airport",
    request_date: "2024-10-08T10:00:00Z",
    pickup_date: "2024-10-08T11:00:00Z",
    dropoff_date: "2024-10-08T11:30:00Z",
    distance: 15,
    duration: 30,
    duration_unit: "minutes",
    cost: 25,
    cost_unit: "USD",
    driver_name: "John Doe",
    driver_rating: 4,
    driver_pic: "driver-pic-url",
    car_make: "Toyota",
    car_model: "Corolla",
    car_pic: "car-pic-url",
    pickup_lat: 40.712776,
    pickup_lng: -74.005974,
    dropoff_lat: 40.641311,
    dropoff_lng: -73.778139,
  };

  beforeEach(() => {
    
    fetchTripById.mockResolvedValueOnce({ data: tripData });
  });

  test("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <TripDetails />
      </MemoryRouter>
    );

    
    expect(screen.getByText(/Loading trip details/i)).toBeInTheDocument();
  });

  test("renders trip details correctly after loading", async () => {
    render(
      <MemoryRouter>
        <TripDetails />
      </MemoryRouter>
    );

   
    await waitFor(() => {
      expect(screen.getByText(/Trip Details/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Request Date\/Time:/i)).toHaveTextContent(
      "Request Date/Time: 10/8/2024, 10:00:00 AM"
    );
    expect(screen.getByText(/Trip Final Price:/i)).toHaveTextContent(
      "Trip Final Price: 25 USD"
    );

    
    expect(screen.getByText(/Driver Information/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    
    expect(screen.getByText(/Car Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Toyota Corolla/i)).toBeInTheDocument();

    
   
  });

});
