import userTableMock from "./userTableMock";
import MockUtils from "./mock.utils";

export default function mockUser(mock) {
  mock.onPost("api/users").reply(({ data }) => {
    const { user } = JSON.parse(data);
    const {
      fullName = "",
      email = "",
      role = "",
      address = "",
      agency = "",
      password = ""
    } = user;

    const id = generateUserId();
    const newUser = {
      id,
      fullName,
      email,
      role,
      agency,
      address,
      password
    };
    userTableMock.push(newUser);
    return [200, { user: newUser }];
  });

  mock.onPost("api/users/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdUsers = mockUtils.baseFilter(
      userTableMock,
      queryParams
    );
    return [200, filterdUsers];
  });

  mock.onPost("api/users/deleteUsers").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = userTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        userTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/users/updateStatusForUsers").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    userTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/users\/\d+/).reply(config => {
    const id = config.url.match(/api\/users\/(\d+)/)[1];
    const user = userTableMock.find(el => el.id === +id);
    if (!user) {
      return [400];
    }

    return [200, user];
  });

  mock.onPut(/api\/users\/\d+/).reply(config => {
    const id = config.url.match(/api\/users\/(\d+)/)[1];
    const { user } = JSON.parse(config.data);
    const index = userTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    userTableMock[index] = { ...user };
    return [200];
  });

  mock.onDelete(/api\/users\/\d+/).reply(config => {
    const id = config.url.match(/api\/users\/(\d+)/)[1];
    const index = userTableMock.findIndex(el => el.id === +id);
    userTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = userTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
