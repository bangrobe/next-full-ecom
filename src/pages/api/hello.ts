// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/db';
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.connectDB();
  db.disconnectDB();
  res.status(200).json({ name: 'John Doe' })
}
