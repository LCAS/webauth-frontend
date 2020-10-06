export interface IdentityProviderEndpoint
{
  name: string;
  login: string;
  logout: string;
  register: string;
};

export interface ApiEndpoints
{
  websocket: string;
  logout: string;
  identity_provider: IdentityProviderEndpoint[];
};