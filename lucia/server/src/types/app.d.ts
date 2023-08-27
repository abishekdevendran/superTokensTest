/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import('@/lib/lucia').Auth;
	type DatabaseUserAttributes = {
		github_username: string;
	};
	type DatabaseSessionAttributes = {};
}
