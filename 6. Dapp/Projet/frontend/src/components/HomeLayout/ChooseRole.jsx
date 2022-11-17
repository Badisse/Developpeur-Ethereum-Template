import React from 'react';
import RoleButton from './RoleButton';
import ROLES from '../../constants/roles';

function ChooseRole() {
  return (
    <div className="flex flex-col items-center justify-around w-2/3 h-1/4">
      <div>Please choose a role</div>
      <div className="flex justify-around items-center w-2/3">
        <div>
          <RoleButton userRole={ROLES.admin} />
        </div>

        <div>
          <RoleButton userRole={ROLES.voter} />
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
