export interface UserCred {
  username?: string,
  email: string,
  password: string
}

export interface RegisterCred {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface AuthToken {
  token: string,
  expDate: string,
  userId: string
}

export interface AuthResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}
