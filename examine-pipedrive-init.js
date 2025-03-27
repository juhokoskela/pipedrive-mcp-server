import * as pipedrive from 'pipedrive';

// Try to initialize ApiClient
const apiClient = new pipedrive.ApiClient();
console.log('ApiClient instance:', apiClient);

// Check how to set API token
console.log('Has defaultHeaders?', 'defaultHeaders' in apiClient);
console.log('Has authentications?', 'authentications' in apiClient);

// Examine what properties are available
console.log('ApiClient instance properties:', Object.keys(apiClient));

// Try to set API token
apiClient.authentications = apiClient.authentications || {};
apiClient.authentications['api_key'] = { type: 'apiKey', 'in': 'query', name: 'api_token' };
apiClient.defaultHeaders = apiClient.defaultHeaders || {};
apiClient.defaultHeaders['Authorization'] = `Bearer ${process.env.PIPEDRIVE_API_TOKEN}`;

// Try to initialize DealsApi
const dealsApi = new pipedrive.DealsApi(apiClient);
console.log('DealsApi instance:', dealsApi); 