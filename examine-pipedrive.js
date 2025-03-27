import * as pipedrive from 'pipedrive';
console.log('Pipedrive module structure:', Object.keys(pipedrive));

// Check for Configuration
console.log('Has Configuration?', 'Configuration' in pipedrive);

// Check for ApiClient
console.log('Has ApiClient?', 'ApiClient' in pipedrive);

// Try to get APIs
console.log('Available APIs:', Object.keys(pipedrive).filter(key => key.endsWith('Api')));

console.log('ApiClient structure:', Object.getOwnPropertyNames(pipedrive.ApiClient));
console.log('ApiClient prototype:', Object.getOwnPropertyNames(pipedrive.ApiClient.prototype));

// Check how to instantiate DealsApi
console.log('DealsApi constructor:', pipedrive.DealsApi.toString().substring(0, 150)); 