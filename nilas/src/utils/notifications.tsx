import {notifications} from '@mantine/notifications';

export const successNotification = (message: string) =>
	notifications.show({
		title: 'Success',
		color: 'green',
		message,
	});

export const errorNotification = (message: string) =>
	notifications.show({
		title: 'Error',
		color: 'red',
		message,
	});
