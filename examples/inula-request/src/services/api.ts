import { ir } from 'inula';

export async function sayHi(): Promise<any> {
  return ir.get('/hello1');
}
