import { App } from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { HomePage } from './pages/home.page.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';

import { ProjectsPage } from './pages/projects.page.tsx';
import { ProjectDetailPage } from './pages/project-detail.page.tsx';

const myColor = ['#edf3ff', '#dae2f4', '#b3c2e6', '#8aa0d8', '#6783cc', '#5171c6', '#4568c4', '#3658ad', '#2e4e9c', '#21438a'];

const alt = ['#fff6eb', '#fcead5', '#fbd2a3', '#fbb96e', '#fba443', '#fb962a', '#fb901f', '#e07c14', '#c76e0d', '#ad5d00'];

const theme = createTheme({
	fontFamily: 'Geist, sans-serif',
	focusRing: 'never',
	colors: {
		main: myColor,
		alt: alt,
	},
	primaryColor: 'main',
	primaryShade: 8,
	defaultRadius: 'md',
});

type RouteConfig = RouteObject & {
	children?: RouteConfig[];
	isPublic?: boolean;
};

const routesConfig: RouteConfig[] = [
	{
		path: '/',
		element: <App />,
		errorElement: <div>Something went wrong!</div>,
		children: [
			{
				path: '',
				element: <HomePage />,
			},
			{
				path: 'home',
				element: <HomePage />,
			},
			{
				path: 'projects',
				element: <ProjectsPage />,
			},
			{
				path: 'projects/:id',
				element: <ProjectDetailPage />,
			}
		],
	},
];

const router = createBrowserRouter(routesConfig);

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 60000,retry: 1, } },
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<Notifications position={'top-right'} transitionDuration={1000} />
				<RouterProvider router={router} />
			</MantineProvider>
		</QueryClientProvider>
	</StrictMode>,
);
