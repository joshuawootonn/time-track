export interface Crew {
  id: number
  name: string
}

export type Shift = {
  clockInDate: string
  clockOutDate: string
  id: number
  length: number
}

export type Employee = {
  id: number
  firstName: string
  lastName: string
  pin: number
  isEmployed: boolean
  isWorking: boolean
  crewId: number
  authorityId: number
}
