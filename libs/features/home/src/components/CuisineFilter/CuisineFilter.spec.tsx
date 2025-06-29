import { render, screen, waitFor } from '@testing-library/react';
import { CuisineFilter } from './cuisineFilter';
import { CuisineProvider } from '../../providers/CuisineProvider';

global.fetch = jest.fn();

jest.mock('@dreckly/data-access', () => ({
  getCuisines: jest.fn().mockResolvedValue([
    {
      name: 'Italian',
      icon: 'Pizza',
    },
    {
      name: 'Chinese',
      icon: 'Utensils',
    },
    {
      name: 'Japanese',
      icon: 'Fish',
    },
  ]),
}));

jest.mock('@dreckly/ui-kit', () => ({
  CuisineCard: jest
    .fn()
    .mockImplementation(({ name }) => (
      <button data-testid={`cuisine-${name}`}>{name}</button>
    )),
}));

jest.mock('lucide-react', () => ({
  PieChart: () => <div data-testid="icon-piechart">PieChart</div>,
  Fish: () => <div data-testid="icon-fish">Fish</div>,
  Utensils: () => <div data-testid="icon-utensils">Utensils</div>,
  Soup: () => <div data-testid="icon-soup">Soup</div>,
  Pizza: () => <div data-testid="icon-pizza">Pizza</div>,
  Hamburger: () => <div data-testid="icon-hamburger">Hamburger</div>,
  Cake: () => <div data-testid="icon-cake">Cake</div>,
  Salad: () => <div data-testid="icon-salad">Salad</div>,
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<CuisineProvider>{component}</CuisineProvider>);
};

describe('CuisineFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [
        {
          name: 'Italian',
          icon: 'Pizza',
        },
        {
          name: 'Chinese',
          icon: 'Utensils',
        },
        {
          name: 'Japanese',
          icon: 'Fish',
        },
      ],
    });
  });

  it('should render the cuisine filter section', async () => {
    renderWithProvider(<CuisineFilter />);

    expect(screen.getByText('What are you craving?')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Italian')).toBeInTheDocument();
      expect(screen.getByText('Chinese')).toBeInTheDocument();
      expect(screen.getByText('Japanese')).toBeInTheDocument();
    });
  });

  it('should load cuisines from API', async () => {
    renderWithProvider(<CuisineFilter />);

    await waitFor(() => {
      expect(screen.getByText('Italian')).toBeInTheDocument();
      expect(screen.getByText('Chinese')).toBeInTheDocument();
      expect(screen.getByText('Japanese')).toBeInTheDocument();
    });
  });

  it('should render cuisine cards', async () => {
    renderWithProvider(<CuisineFilter />);

    await waitFor(() => {
      expect(screen.getByTestId('cuisine-Italian')).toBeInTheDocument();
      expect(screen.getByTestId('cuisine-Chinese')).toBeInTheDocument();
      expect(screen.getByTestId('cuisine-Japanese')).toBeInTheDocument();
    });
  });
});

describe('CuisineProvider', () => {
  it('should render children without crashing', () => {
    renderWithProvider(<div data-testid="test-child">Test Child</div>);
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
