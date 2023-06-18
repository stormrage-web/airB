import { AppDispatch } from "../store";
import { flightSlice } from "./FlightSlice";
import {
  FlightState,
  TabParams
} from "../../models/flights.interface";
import { taskOneData } from "../../shared/mocks/taskOne.data";
import { taskTwoData } from "../../shared/mocks/taskTwo.data";
import { taskThreeData } from "../../shared/mocks/taskThree.data";
import { taskFourData } from "../../shared/mocks/TaskFour.data";

// export const mainEndPoint = "http://51.250.91.130:5000/";

export const fetchFlight =
  ({ tab, data }: { tab: number; data: Partial<FlightState> }) =>
    async (dispatch: AppDispatch) => {
      dispatch(flightSlice.actions.flightFetching);
      if (tab === 1) {
        dispatch(
          flightSlice.actions.flightFetchingSuccess({
            flight: data.flight,
            tabInfo: taskOneData,
            tabParams: data.tabParams
          })
        );
      } else if (tab === 2) {
        const responseSeasons: any = taskTwoData.seasons;
        const iteratedSeasons = [];
        for (const key of Object.keys(responseSeasons)) {
          iteratedSeasons.push({
            name: key,
            left: responseSeasons[key]?.left,
            right: responseSeasons[key]?.right
          });
        }
        dispatch(
          flightSlice.actions.flightFetchingSuccess({
            flight: data.flight,
            tabInfo: { data: taskTwoData.data, seasons: iteratedSeasons },
            tabParams: data.tabParams
          })
        );
      } else if (tab === 3) {
        dispatch(
          flightSlice.actions.flightFetchingSuccess({
            flight: data.flight,
            tabInfo: taskThreeData,
            tabParams: data.tabParams
          })
        );
      } else if (tab === 4) {
        dispatch(
          flightSlice.actions.flightFetchingSuccess({
            flight: data.flight,
            tabInfo: taskFourData,
            tabParams: data.tabParams
          })
        );
      }
    };

export const setParams =
  ({ flight, params }: { flight?: string; params?: TabParams }) =>
    async (dispatch: AppDispatch) => {
      dispatch(
        flightSlice.actions.flightFetchingSuccess({
          flight: flight,
          tabParams: { ...params }
        })
      );
    };
