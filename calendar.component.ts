import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  date = new Date();

  lastDay: any;
  firstDayIndex: any;
  lastDayIndex: any;
  nextDays: any;
  days: any[] = [];
  viewMonths: any[] = [];

  months: any[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(private elRef: ElementRef) {

    this.setMonths();

  }

  ngOnInit() { }



  renderCalender(month, year) {
    this.days = [];
    let isToday = false;

    this.date.setDate(1);
    this.date.setMonth(month);
    this.date.setFullYear(year);

    this.lastDay = new Date(year, month + 1,
      0
    ).getDate();


    this.firstDayIndex = this.date.getDay();

    this.lastDayIndex = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDay();

    this.nextDays = 7 - this.lastDayIndex - 1;

    for (let x = this.firstDayIndex; x > 0; x--) {
      this.days.push("");
    }

    for (let i = 1; i <= this.lastDay; i++) {

      //this.days.push(`${i}`);

      this.days.push({ value: `${i}`, isToday: this.isToday(month, year, i) });

    }

  }

  isToday(month, year, day) {

    if (
      day === new Date().getDate() &&
      month === new Date().getMonth() && year === new Date().getFullYear()
    ) {
      return true;
    }
    return false;
  }

  setMonths() {
    let monthCounter = this.date.getMonth();
    let yearCounter = this.date.getFullYear();

    for (let i = 0; i <= 12; i++) {
      if (monthCounter !== 12 && i !== 0) {
        monthCounter += 1;
      } else if (i !== 0) {
        monthCounter = 1;

      }

      if ((monthCounter) === 12) {
        yearCounter++;
      }

      let monthName = monthCounter === 12 ? this.months[0] : this.months[monthCounter];
      let monthIndex = monthCounter === 12 ? 0 : monthCounter;

      console.log("month counter", monthCounter);
      // console.log(monthIndex);
      // console.log(yearCounter);
      this.renderCalender(monthCounter, yearCounter);
      this.viewMonths.push({ index: monthIndex, name: monthName, year: yearCounter, firstDayIndex: this.firstDayIndex, days: this.days });

    }

    console.log(this.viewMonths);
  }

}
