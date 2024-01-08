import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { ApiService } from './api.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChild('supersetContainer1', { static: true })
  supersetContainer1!: ElementRef;
  @ViewChild('supersetContainer2', { static: true })
  supersetContainer2!: ElementRef;
  @ViewChild('supersetContainer3', { static: true })
  supersetContainer3!: ElementRef;

  apiData: any = [];

  constructor(private http: HttpClient, private renderer: Renderer2, private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchDataAndDisplay();
    this.apiService.getDashboardToken().subscribe((data: any) => {
      this.embed(data.result.token)
    })
  }

  formatMetricName(metricName: string): string {
    return metricName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  fetchDataAndDisplay(): void {
    this.apiService.fetchData().subscribe(
      (data: any) => {
        this.apiData = Object.entries(data.result).map(([metricName, value]) => ({
          formattedMetricName: this.formatMetricName(metricName),
          value,
        }));
      },
      error => console.error('Error fetching data:', error)
    );
  }

  embed(token: any) {
    const commonConfig = {
      supersetDomain: environment.superSetDomain,
      fetchGuestToken: () => Promise.resolve(token),
      dashboardUiConfig: {
        hideTitle: true,
        hideChartControls: true,
        hideTab: true,
      },
      width: '100%',
    };

    embedDashboard({
      id: environment.dashboardIds[0], 
      mountPoint: this.supersetContainer1.nativeElement, 
      ...commonConfig
    });

    embedDashboard({
      id: environment.dashboardIds[1], 
      mountPoint: this.supersetContainer2.nativeElement, 
      ...commonConfig
    });

    embedDashboard({
      id: environment.dashboardIds[2], 
      mountPoint: this.supersetContainer3.nativeElement, 
      ...commonConfig

    });
  }

  getDashboardColor(index: number): string {
    const dashboardColors = ['#e2f5f5', '#e1effb', '#f3e1f3', '#ffe8d1', '#dcfdf5','#ceedd2'];
    return dashboardColors[index % dashboardColors.length];
  }

  getDashboardIcon(index: number): string {
    const dashboardIcons = ['bi bi-laptop', 'bi bi-file-earmark-play-fill', 'bi bi-chat-left-quote', 'bi bi-chat-right-dots-fill', 'bi bi-chat-right-text','bi bi-telephone-fill'];
    return dashboardIcons[index % dashboardIcons.length];
  }
}
