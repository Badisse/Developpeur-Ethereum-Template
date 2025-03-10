/*[object Object]*/
import { IRole } from "../types/role.types"

export const ADMIN_ID = 0
export const VOTER_ID = 1

const ROLES: {[role: string]: IRole} = {
  admin: {
    id: ADMIN_ID,
    name: 'Administrator'
  },
  voter: {
    id: VOTER_ID,
    name: 'Voter'
  }
}

export default ROLES
