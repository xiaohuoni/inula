import { ir } from 'inula';

export async function query(): Promise<any> {
  return ir.post('/api/hello');
}
