export const formatAuthUserPayloadObj = (payload) => {
  let _payload = { ...payload };
  _payload.id = _payload._id;
  _payload._roleId = _payload.roleId ? _payload.roleId._id : '';
  _payload.roleName = _payload.roleId ? _payload.roleId.name : '';
  _payload._groupId = _payload.groupId ? _payload.groupId._id : '';
  _payload.groupName = _payload.groupId ? _payload.groupId.name : '';
  _payload.active
    ? (_payload.status = 'Activated')
    : (_payload.status = 'Deactivated');
  delete _payload._id;
  return _payload;
};
