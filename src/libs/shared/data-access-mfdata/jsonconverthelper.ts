export class JsonConvertHelper {
      //toIsoString converts the Date to UTC Time. ForDate without Time (hour=0) does this mean day-1 what is not the intention. So add the TimeZoneOffset before
  public static dateToIsoString(date: Date): string {
    const utcDate = date;
    utcDate.setMinutes(0-date.getTimezoneOffset());
    return utcDate.toISOString().split('T')[0];
  }
}

