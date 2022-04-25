import request from '@/utils/request';
import Resource from '@/api/resource';

class UserChangePassword extends Resource {
  constructor() {
    super('user');
  }

  changePassword(data) {
    return request({
      url: '/' + this.uri + '/change-password',
      method: 'put',
      data: data,
    });
  }
}

export { UserChangePassword as default };
