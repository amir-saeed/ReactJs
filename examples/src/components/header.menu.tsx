import {Tabs, Text} from '@mantine/core';
import {useLocation, useNavigate} from 'react-router';

export const HeaderMenu = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<Tabs variant={'pills'} defaultValue={pathname.slice(1)} value={pathname.slice(1)}>
			<Tabs.List m={5}>
				<Tabs.Tab value="add-expense" onClick={() => navigate('/')} style={{ borderRadius: '10px' }}>
					<Text fz={14}> Home </Text>
				</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	);
};
