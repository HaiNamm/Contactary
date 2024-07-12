export interface LoginData {
  AuthenticationResult: AuthenticationResult | null;
  ChallengeName:
    | "NEW_PASSWORD_REQUIRED"
    | "SMS_MFA"
    | "SOFTWARE_TOKEN_MFA"
    | "MFA_SETUP"
    | "";
  ChallengeParameters: ChallengeParameters;
  Session: any;
  ResultMetadata: ResultMetadata;
}

export interface AuthenticationResult {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  NewDeviceMetadata: any;
  RefreshToken: string;
  TokenType: string;
}

export interface ChallengeParameters {}

export interface ResultMetadata {}
