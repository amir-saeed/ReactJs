import { ActionIcon, AppShell, Group, Image } from '@mantine/core';
import { client } from '@nila/client/src/client.gen.ts';
import { IconLogout } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router';
import Logo from '../public/logo.png';
import { HeaderMenu } from './components/header.menu.tsx';

client.setConfig({
	baseUrl: import.meta.env.VITE_NILA_API_URL,
});

export function App() {

	const navigate = useNavigate();

	return (
		<AppShell header={{ height: 60 }} padding="md">
			<AppShell.Header px={'xs'}>
				<Group justify={'space-between'} h={'100%'}>
					<Image src={Logo} visibleFrom={'sm'} maw={100} onClick={() => navigate('/home')} />
					<Group gap={'xs'}>
						<HeaderMenu />

						<ActionIcon size={'sm'} variant={'transparent'}>
							<IconLogout />
						</ActionIcon>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
