/**
 * @ignore the |null should be deprecated when the null returned by drizzle function becomes undefined
 * https://github.com/drizzle-team/drizzle-orm/issues/2745
 */
export interface Proxy {
  ip: string;
  port: number;
  protocol: string | null;
  name: string;
  status: boolean;
  userName?: string | null;
  password?: string | null;
}
