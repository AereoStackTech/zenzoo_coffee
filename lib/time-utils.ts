export interface CafeOpenStatus {
  isOpen: boolean;
  statusLabelFr: string;
  statusLabelAr: string;
  subtextFr: string;
  subtextAr: string;
  currentTimeCasablanca: string;
  currentDayNameFr: string;
  hoursToday: string;
}

/**
 * Calculates whether ZenZoo Café is open based on Africa/Casablanca time.
 * Operating schedule: 05:00 to 01:00 daily (20 consecutive hours).
 * Closed period: 01:00 to 05:00.
 */
export function getCafeOpenStatus(date: Date = new Date()): CafeOpenStatus {
  try {
    const timeZone = 'Africa/Casablanca';

    // Format parts to get exact hour, minute, second, day in Casablanca
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'long',
    });

    const parts = formatter.formatToParts(date);
    let hour = 0;
    let minute = 0;
    let weekday = '';

    for (const part of parts) {
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'minute') minute = parseInt(part.value, 10);
      if (part.type === 'weekday') weekday = part.value;
    }

    // Convert hour to 24h normalized representation
    // Cafe is open from 05:00 to 23:59 and 00:00 to 00:59.
    // Closed between 01:00 and 04:59.
    const isOpen = (hour >= 5 && hour <= 23) || hour === 0;

    const pad = (n: number) => n.toString().padStart(2, '0');
    const currentTimeCasablanca = `${pad(hour)}:${pad(minute)}`;

    const daysFr: Record<string, string> = {
      Monday: 'Lundi',
      Tuesday: 'Mardi',
      Wednesday: 'Mercredi',
      Thursday: 'Jeudi',
      Friday: 'Vendredi',
      Saturday: 'Samedi',
      Sunday: 'Dimanche',
    };
    const currentDayNameFr = daysFr[weekday] || 'Aujourd’hui';

    if (isOpen) {
      // Calculate closing remark
      const closingRemark = hour === 0 
        ? `Ferme bientôt à 01:00` 
        : `Ferme ce soir à 01:00`;

      return {
        isOpen: true,
        statusLabelFr: 'Ouvert Actuellement',
        statusLabelAr: 'مفتوح الآن',
        subtextFr: `${closingRemark} · Heure de Safi (${currentTimeCasablanca})`,
        subtextAr: 'يغلق عند الساعة 01:00 ليلاً',
        currentTimeCasablanca,
        currentDayNameFr,
        hoursToday: '05:00 — 01:00',
      };
    } else {
      // Closed: hours 01:00 to 04:59
      const hoursLeft = 4 - hour;
      const minutesLeft = 60 - minute;
      const opensIn = hoursLeft > 0 
        ? `dans env. ${hoursLeft}h${minutesLeft > 0 && minutesLeft < 60 ? pad(minutesLeft) : ''}`
        : `dans ${minutesLeft} min`;

      return {
        isOpen: false,
        statusLabelFr: 'Fermé — Ouvre à 05:00',
        statusLabelAr: 'مغلق حالياً — يفتح 05:00',
        subtextFr: `Réouverture ${opensIn} à 05:00 · Heure de Safi (${currentTimeCasablanca})`,
        subtextAr: 'يفتح أبوابه على الساعة 05:00 صباحاً',
        currentTimeCasablanca,
        currentDayNameFr,
        hoursToday: '05:00 — 01:00',
      };
    }
  } catch {
    // Fallback if Intl timeZone fails
    return {
      isOpen: true,
      statusLabelFr: 'Ouvert Actuellement',
      statusLabelAr: 'مفتوح الآن',
      subtextFr: 'Service continu 05:00 — 01:00 · 7j/7',
      subtextAr: 'خدمة مستمرة طيلة أيام الأسبوع',
      currentTimeCasablanca: '--:--',
      currentDayNameFr: 'Aujourd’hui',
      hoursToday: '05:00 — 01:00',
    };
  }
}
