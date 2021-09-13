import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

    Events: any = [];
    
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth'
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    onDateSelect(arg: any) {
      alert('Date clicked: ' + arg.dateStr)
    }

    ngOnInit(){
        setTimeout(() => {
            return this.httpClient.get('http://localhost:8888/dynamic-events.php')
            .subscribe((res: any) => {
                this.Events.push(res);
                console.log(this.Events);
            });
        }, 2500);

        setTimeout(() => {
            this.calendarOptions = {
            initialView: 'dayGridMonth',
            dateClick: this.onDateSelect.bind(this),
            events: this.Events
            };
        }, 2500);
    }  

}