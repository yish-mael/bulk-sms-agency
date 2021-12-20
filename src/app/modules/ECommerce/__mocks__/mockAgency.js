import agencyTableMock from './agencyTableMock';
import MockUtils from './mock.utils';

//https://sms-platform-api.herokuapp.com/admin/update-department

export default function mockAgency(mock) {
  mock
    .onPost('https://sms-platform-api.herokuapp.com/admin/create-department')
    .reply(({ data }) => {
      const { agency } = JSON.parse(data);
      const { name = '', smsAmount = '' } = agency;

      const id = generateAgencyId();
      const newAgency = {
        id,
        name,
        smsAmount,
      };
      agencyTableMock.push(newAgency);
      return [200, { agency: newAgency }];
    });

  mock
    .onPost('https://sms-platform-api.herokuapp.com/admin/find')
    .reply((config) => {
      const mockUtils = new MockUtils();
      const { queryParams } = JSON.parse(config.data);
      const filterdAgencies = mockUtils.baseFilter(
        agencyTableMock,
        queryParams
      );
      return [200, filterdAgencies];
    });

  mock
    .onPost('https://sms-platform-api.herokuapp.com/admin/deleteAgencies')
    .reply((config) => {
      const { ids } = JSON.parse(config.data);
      ids.forEach((id) => {
        const index = agencyTableMock.findIndex((el) => el.id === id);
        if (index > -1) {
          agencyTableMock.splice(index, 1);
        }
      });
      return [200];
    });

  mock
    .onPost(
      'https://sms-platform-api.herokuapp.com/admin/updateStatusForAgencies'
    )
    .reply((config) => {
      const { ids, status } = JSON.parse(config.data);
      agencyTableMock.forEach((el) => {
        if (ids.findIndex((id) => id === el.id) > -1) {
          el.status = status;
        }
      });
      return [200];
    });

  mock.onGet(/api\/agencies\/\d+/).reply((config) => {
    const id = config.url.match(/api\/agencies\/(\d+)/)[1];
    const agency = agencyTableMock.find((el) => el.id === +id);
    if (!agency) {
      return [400];
    }

    return [200, agency];
  });

  mock.onPut(/api\/agencies\/\d+/).reply((config) => {
    const id = config.url.match(/api\/agencies\/(\d+)/)[1];
    const { agency } = JSON.parse(config.data);
    const index = agencyTableMock.findIndex((el) => el.id === +id);
    if (!index) {
      return [400];
    }

    agencyTableMock[index] = { ...agency };
    return [200];
  });

  mock.onDelete(/api\/agencies\/\d+/).reply((config) => {
    const id = config.url.match(/api\/agencies\/(\d+)/)[1];
    const index = agencyTableMock.findIndex((el) => el.id === +id);
    agencyTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateAgencyId() {
  const ids = agencyTableMock.map((el) => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
