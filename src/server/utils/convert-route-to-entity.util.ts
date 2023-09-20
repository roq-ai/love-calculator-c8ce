const mapping: Record<string, string> = {
  compatibilities: 'compatibility',
  'device-infos': 'device_info',
  'error-logs': 'error_logs',
  instructions: 'instruction',
  'love-calculations': 'love_calculations',
  resets: 'reset',
  shares: 'share',
  'shared-results': 'shared_results',
  teams: 'team',
  users: 'user',
  'user-preferences': 'user_preferences',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
