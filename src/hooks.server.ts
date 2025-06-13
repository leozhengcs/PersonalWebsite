// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const userAgent = event.request.headers.get('user-agent') || '';

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

	// Redirect mobile users to a message page
	if (isMobile && event.url.pathname !== '/mobile-blocked') {
		return Response.redirect(`${event.url.origin}/mobile-blocked`, 302);
	}

	return resolve(event);
};
