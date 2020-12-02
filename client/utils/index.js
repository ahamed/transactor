// export const serverURI = 'http://localhost:4001';
export const serverURI = 'http://192.168.1.104:4001';

// Detect OS
export const getOS = () => {
	const { platform, userAgent } = window.navigator;
	const variants = {
		mac: ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windows: ['Win32', 'Win64', 'Windows', 'WinCE'],
		ios: ['iPhone', 'iPad'],
	};

	for (const [key, value] of Object.entries(variants)) {
		if (value.indexOf(platform) > -1) return key;
	}

	let os = null;

	if (/android/i.test(userAgent)) {
		os = 'android';
	} else if (!os && /linux/i.test(userAgent)) {
		os = 'linux';
	} else {
		os = 'android';
	}

	return os;
};
