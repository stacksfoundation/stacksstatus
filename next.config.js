module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/about',
        permanent: true,
      },
    ]
  },
}

module.exports = {
  webpack: true,
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,
      path: false
    };
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});
    return config;
  },
};