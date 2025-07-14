// Example React component to test
// Button.jsx
import React from 'react';

export const Button = ({ onClick, disabled = false, children, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      data-testid="custom-button"
    >
      {children}
    </button>
  );
};

// Counter component with state
// Counter.jsx
import React, { useState } from 'react';

export const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <h2 data-testid="counter-value">Count: {count}</h2>
      <button 
        data-testid="increment-btn" 
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <button 
        data-testid="decrement-btn" 
        onClick={() => setCount(count - 1)}
      >
        Decrement
      </button>
    </div>
  );
};

// UserProfile component with async data
// UserProfile.jsx
import React, { useState, useEffect } from 'react';

export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;
  if (!user) return <div data-testid="no-user">No user found</div>;

  return (
    <div data-testid="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

// ===== UNIT TESTS =====

// Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByTestId('custom-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    
    fireEvent.click(screen.getByTestId('custom-button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies correct CSS class for variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByTestId('custom-button')).toHaveClass('btn-secondary');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByTestId('custom-button')).toBeDisabled();
  });
});

// Counter.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Counter } from './Counter';

describe('Counter Component', () => {
  test('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: 5');
  });

  test('increments count when increment button is clicked', () => {
    render(<Counter />);
    
    fireEvent.click(screen.getByTestId('increment-btn'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: 1');
  });

  test('decrements count when decrement button is clicked', () => {
    render(<Counter initialValue={3} />);
    
    fireEvent.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: 2');
  });

  test('handles multiple clicks correctly', () => {
    render(<Counter />);
    
    fireEvent.click(screen.getByTestId('increment-btn'));
    fireEvent.click(screen.getByTestId('increment-btn'));
    fireEvent.click(screen.getByTestId('decrement-btn'));
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: 1');
  });
});

// UserProfile.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserProfile } from './UserProfile';

// Mock fetch globally
global.fetch = jest.fn();

describe('UserProfile Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('shows loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<UserProfile userId="123" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('displays user data when fetch succeeds', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('displays error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Network error')).toBeInTheDocument();
  });

  test('displays error when response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<UserProfile userId="123" />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Failed to fetch user')).toBeInTheDocument();
  });

  test('does not fetch when userId is not provided', () => {
    render(<UserProfile />);
    expect(fetch).not.toHaveBeenCalled();
    expect(screen.getByTestId('no-user')).toBeInTheDocument();
  });
});

// ===== ADVANCED TESTING PATTERNS =====

// Custom hook testing
// useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

// useLocalStorage.test.js
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });

    expect(localStorage.getItem('test-key')).toBe('"updated"');
    expect(result.current[0]).toBe('updated');
  });

  test('retrieves value from localStorage on mount', () => {
    localStorage.setItem('test-key', '"stored-value"');
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });
});

// Testing with Context
// ThemeContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Component using context
export const ThemedButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={`btn-${theme}`}
      data-testid="themed-button"
    >
      Current theme: {theme}
    </button>
  );
};

// ThemeContext.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, ThemedButton, useTheme } from './ThemeContext';

const TestComponent = () => {
  const { theme } = useTheme();
  return <div data-testid="theme-display">{theme}</div>;
};

describe('Theme Context', () => {
  test('provides default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
  });

  test('toggles theme when button is clicked', () => {
    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('themed-button')).toHaveTextContent('Current theme: light');
    
    fireEvent.click(screen.getByTestId('themed-button'));
    expect(screen.getByTestId('themed-button')).toHaveTextContent('Current theme: dark');
  });

  test('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within ThemeProvider');
    
    consoleSpy.mockRestore();
  });
});

// ===== JEST CONFIGURATION =====

// package.json scripts
/*
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0"
  }
}
*/

// jest.config.js
/*
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
*/

// setupTests.js
/*
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
*/

/*


This comprehensive example covers the essential patterns for React unit testing with Jest:
Key Testing Concepts:
Basic Component Testing:

Rendering components with render()
Finding elements with screen queries
Testing user interactions with fireEvent
Asserting with Jest matchers and @testing-library/jest-dom

State and Event Testing:

Testing state changes
Mocking function props with jest.fn()
Verifying function calls

Async Testing:

Using waitFor() for async operations
Mocking fetch API
Testing loading/error states

Advanced Patterns:

Custom hook testing with renderHook()
Context provider testing
Error boundary testing

Best Practices:

Use data-testid attributes for reliable element selection
Test behavior, not implementation - focus on what users see and do
Mock external dependencies like APIs, localStorage, etc.
Use descriptive test names that explain the expected behavior
Group related tests with describe blocks
Clean up between tests with beforeEach/afterEach

Common Jest Matchers:

expect().toBe() - exact equality
expect().toEqual() - deep equality
expect().toBeInTheDocument() - element exists
expect().toHaveTextContent() - text content check
expect().toHaveBeenCalled() - function was called
expect().toBeDisabled() - element is disabled

Run tests with npm test or yarn test, and use --coverage flag to see test coverage reports.

*/