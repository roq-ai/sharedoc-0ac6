const mapping: Record<string, string> = {
  documents: 'document',
  folders: 'folder',
  interactions: 'interaction',
  organizations: 'organization',
  tags: 'tag',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
