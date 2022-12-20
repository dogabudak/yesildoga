import axios from 'axios';

type GetGoalQuery = {
  page: number;
  pageSize: number;
  type?: string;
  startDate?: string;
  endDate?: string;
};

export async function getGoalProgress({
  page,
  pageSize,
  startDate,
  type,
  endDate
}: GetGoalQuery): Promise<any[]> {
  const response = await axios.get('http://localhost:7001/goalProgress',{ params: { page, pageSize,type,startDate,endDate } });

  return response.data;
}
