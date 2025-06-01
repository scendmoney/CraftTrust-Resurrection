import { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { addMinutes, differenceInSeconds } from 'date-fns';
import { IOrderModel } from 'graphql/_server';

const ClientOrderPaymentStatusCount: FC<{
  order: IOrderModel;
  text?: string;
  onTimerEnd?: () => void;
}> = ({ order, text = 'Order will be cancelled in', onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const createdDate = new Date(order.dates.createdDate);
      const deadline = addMinutes(createdDate, 60);
      const secondsLeft = differenceInSeconds(deadline, now);

      if (secondsLeft <= 0) {
        setTimeLeft(undefined);
        onTimerEnd && onTimerEnd();
        return;
      }

      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      const formattedTimeLeft = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setTimeLeft(formattedTimeLeft);
    };

    const interval = setInterval(updateTimer, 1000);

    updateTimer();

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.dates.createdDate]);

  if (!timeLeft) {
    return null;
  }

  return (
    <Typography variant="body1">
      {text} {timeLeft}
    </Typography>
  );
};

export default ClientOrderPaymentStatusCount;
