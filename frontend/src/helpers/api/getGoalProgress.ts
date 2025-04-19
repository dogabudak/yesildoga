import axios from 'axios';

type GetGoalQuery = {
  page: number;
  pageSize: number;
  type?: string;
};

export async function getGoalProgress({ page, pageSize, type }: GetGoalQuery): Promise<any[]> {
  const response = await axios.get('http://localhost:8081/goalProgress', {
    params: { page, pageSize, type },
  });

  return response.data;
}
