import { Request, Response, NextFunction } from 'express';


export const ActivityLogs = async (req: Request, res: Response, next: NextFunction) => {
  const startHrTime = process.hrtime();

  res.on("finish", async () => {
    const curDate = new Date().toISOString().replace('T', ' ').substr(0, 19);
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    // en-US to get (dot) for decimal points
    const elapsedTimeText = elapsedTimeInMs.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

    console.log(`[${curDate} UTC] ${req.method} ${req.path} -> ${res.statusCode} ${elapsedTimeText}ms`);
    // TODO: Log activity to db
  });

  next();
};
