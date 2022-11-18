export const ADMIN_ID = 0
export const VOTER_ID = 1

export interface Role {
  id: number
  name: string
}

interface Roles {
  [role: string]: Role
}

const ROLES: Roles = {
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
