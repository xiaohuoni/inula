import { ir } from 'inula';

export async function sayHi(params: Record<string, any>): Promise<any> {
  return ir.get('/hello', {
    params,
  });
}
