import { ir } from 'umi';
import type { AnalysisData } from './data';

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return ir('/api/fake_analysis_chart_data');
}
