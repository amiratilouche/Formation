import { JwtModuleOptions } from '@nestjs/jwt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const config: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRED },
};
