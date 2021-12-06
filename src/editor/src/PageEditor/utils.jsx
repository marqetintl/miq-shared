import { StaffService } from '@miq/utils';

class IndexSettingStaffService extends StaffService {
  constructor(path) {
    super(path);
  }
}
export const indexStaffServices = new IndexSettingStaffService('index/');

class PageStaffService extends StaffService {
  constructor(path) {
    super(path);
  }
}

export const pageStaffServices = new PageStaffService('pages/');
