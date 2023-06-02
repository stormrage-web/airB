export interface DateRange {
  left: string;
  right: string;
}

export interface TabParams {
  date?: string;
  class?: string;
  dateRange?: DateRange;
  type?: 0 | 1;
  profiles?: boolean[];
  deep?: number;
}

export interface Coordinates {
  x: string;
  y: number;
}

export interface TabThreeItem {
  title: string;
  data: Coordinates[];
}

export interface Seasons {
  name: string;
  left: string;
  right: string;
}

export interface TabOneData {
  data: Coordinates[];
  seasons: Seasons[];
}

export interface FlightState {
  flight: string;
  tabParams: TabParams;
  tabInfo: Coordinates[] | TabOneData | TabThreeItem[];
  isLoading: boolean;
}