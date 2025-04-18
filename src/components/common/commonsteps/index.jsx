import React, { useEffect } from "react";
import { Divider, Steps } from "antd";
import "./commonstep.scss";
import { useDispatch, useSelector } from "react-redux";
import { worklogs } from "../../../shared/worklogs/actions";

const LogStep = () => {
  const dispatch = useDispatch();
  const { logwork } = useSelector((state) => state.worklogs);
  console.log("worklogs", logwork?.data);

  const FilteredLogwork = logwork?.data?.map((item) => {
    return {
      ...item,
      subTitle: item?.logged_at,
    };
  });

  useEffect(() => {
    dispatch(worklogs());
  }, []);
  return (
    <>
      <div className="reversed-steps">
        <Steps
          progressDot
          current={logwork?.data?.length}s
          direction="vertical"
          items={FilteredLogwork}
        />
      </div>
    </>
  );
};

export default LogStep;
