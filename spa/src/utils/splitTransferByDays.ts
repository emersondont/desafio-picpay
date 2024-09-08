interface DayTransfers {
  day: string;
  transfers: Transfer[];
}

export default function splitTransferByDays(transfers: Transfer[]): DayTransfers[] {
  const days: DayTransfers[] = [];
  console.log(transfers)
  if (!transfers) {
    return days;
  }

  transfers.forEach(transfer => {
    const date = new Date(transfer.timestamp);

    const dayIndex = days.findIndex(day => day.day === getDayLabel(date));
    if (dayIndex === -1) {
      days.push({ day: getDayLabel(date), transfers: [transfer] });
    } else {
      days[dayIndex].transfers.push(transfer);
    }
  });

  return days;
}

function getDayLabel(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  if (date.toDateString() === today.toDateString()) {
    return "hoje";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "ontem";
  } else if (date.toDateString() === twoDaysAgo.toDateString()) {
    return "2 dias atrás";
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }
}