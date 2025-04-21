import React, { useEffect } from "react";
import "./commonstep.scss";
import { useDispatch, useSelector } from "react-redux";
import { worklogs } from "../../../shared/worklogs/actions";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import moment from "moment";

const LogStep = () => {
  const dispatch = useDispatch();
  const { logwork } = useSelector((state) => state.worklogs);
  const { checkin } = useSelector((state) => state.checkin);

  console.log("worklogs", logwork?.data);

  const FilteredLogwork = logwork?.data?.map((item) => {
    return {
      ...item,
      subTitle: item?.logged_at,
    };
  });

  useEffect(() => {
    dispatch(worklogs());
  }, [checkin]);

  return (
    <>
      <div className="p-4 w-full max-w-6xl mx-auto">
        <VerticalTimeline lineColor="#e5e7eb">
          {FilteredLogwork?.map((stepData, index) => {
            const convertedTime = moment
              .tz(stepData?.subTitle, "GMT")
              .tz("Asia/Kolkata")
              .format("DD MMM, YYYY hh:mm A");
            return (
              <VerticalTimelineElement
                key={index}
                position="left"
                visible={true}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "transparent",
                  border: "none",
                }}
                contentArrowStyle={{ display: "none" }}
                iconStyle={{
                  background: stepData.completed ? "#4ade80" : "#facc15",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3 className="vertical-timeline-element-title font-bold">
                  {stepData.title}
                </h3>
                <p>{convertedTime}</p>
                <p>{stepData.description}</p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default LogStep;
