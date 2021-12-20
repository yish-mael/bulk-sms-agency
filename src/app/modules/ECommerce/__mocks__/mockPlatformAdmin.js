import platformAdminTableMock from "./platformAdminTableMock";
import MockUtils from "./mock.utils";

export default function mockPlatformAdmins(mock) {
  mock.onPost("api/platform-admins").reply(({ data }) => {
    const { platformAdmin } = JSON.parse(data);
    const {
      fullName = "",
      email = "",
      role = 2000,
    } = platformAdmin;

    const id = generatePlatformAdminId();
    const newPlatformAdmin = {
      id,
      fullName,
      email,
      role,
    };
    platformAdminTableMock.push(newPlatformAdmin);
    return [200, { platformAdmin: newPlatformAdmin }];
  });

  mock.onPost("api/platform-admins/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredPlatformAdmins = mockUtils.baseFilter(platformAdminTableMock, queryParams);
    return [200, filteredPlatformAdmins];
  });

  mock.onPost("api/platform-admins/deletePlatformAdmins").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = platformAdminTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        platformAdminTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/platform-admins/updateStatusForPlatformAdmins").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    platformAdminTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/platform-admins\/\d+/).reply(config => {
    const id = config.url.match(/api\/platform-admins\/(\d+)/)[1];
    const platformAdmin = platformAdminTableMock.find(el => el.id === +id);
    if (!platformAdmin) {
      return [400];
    }

    return [200, platformAdmin];
  });

  mock.onPut(/api\/platform-admins\/\d+/).reply(config => {
    const id = config.url.match(/api\/platform-admins\/(\d+)/)[1];
    const { platformAdmin } = JSON.parse(config.data);
    const index = platformAdminTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    platformAdminTableMock[index] = { ...platformAdmin };
    return [200];
  });

  mock.onDelete(/api\/platform-admins\/\d+/).reply(config => {
    const id = config.url.match(/api\/platform-admins\/(\d+)/)[1];
    const index = platformAdminTableMock.findIndex(el => el.id === +id);
    platformAdminTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generatePlatformAdminId() {
  const ids = platformAdminTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}