import Permission from './permissionInterface';

interface PermissionCategoryResponse {
    [categoryName: string]: Permission[];
  }

export default PermissionCategoryResponse;