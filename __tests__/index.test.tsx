/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Home from '../src/pages';
import '@testing-library/jest-dom';

describe('Home', () => {
  const initialState = { ads: { results: [] } };
  const mockStore = configureStore();
  let store, wrapper;

  it('renders a heading', () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Import')).not.toBeNull()
    expect(screen.getByText('Export')).not.toBeNull()
    expect(screen.getByText('Clear')).not.toBeNull()
  });
});
