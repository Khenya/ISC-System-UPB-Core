interface RolePermissionsResponse {
  [name: string]: { id: number; disabled: boolean; permissions: string[] };
}

export default RolePermissionsResponse;
