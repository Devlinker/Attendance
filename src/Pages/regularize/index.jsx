

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonPopup from "../../components/common/popup";
import TextAreainput from "../../components/common/textarea";
import { Button, message } from "antd";
import {
  fetchRegularizeList,
  submitRegularize,
} from "../../shared/regularize/action";
import CustomTable from "../../components/common/customtable";

const RegularizeList = () => {
  const dispatch = useDispatch();
  const { regularizeList, pagination } = useSelector(
    (state) => state?.regularize
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  const fetchList = (page = 1, items = 10) => {
    dispatch(fetchRegularizeList({ page, items }));
  };

  useEffect(() => {
    fetchList(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleApprove = (record) => {
    const payload = {
      items: [
        {
          regularize_id: record.id,
          status: "approved",
        },
      ],
    };

    dispatch(
      submitRegularize(payload, () => {
        message.success("Request Approved");
        fetchList(currentPage, pageSize);
      })
    );
  };

  const handleReject = (record) => {
    setSelectedRecord(record);
    setActionType("reject");
    setIsModalOpen(true); // Open modal only for rejection
  };

  const handleOk = () => {
    if (actionType === "reject" && !rejectionReason.trim()) {
      message.warning("Please enter a rejection reason.");
      return;
    }

    const payload = {
      items: [
        {
          regularize_id: selectedRecord.id,
          status: "rejected",
          rejection_reason: rejectionReason,
        },
      ],
    };

    dispatch(
      submitRegularize(payload, () => {
        message.success("Request Rejected");
        setIsModalOpen(false);
        setSelectedRecord(null);
        setRejectionReason("");
        fetchList(currentPage, pageSize);
      })
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setRejectionReason("");
    setActionType(null);
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial_no",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Attendance Date",
      dataIndex: "attendance_date",
      key: "attendance_date",
    },
    {
      title: "Check-In Time",
      dataIndex: "checked_in_time",
      key: "checked_in_time",
    },
    {
      title: "Check-Out Time",
      dataIndex: "checked_out_time",
      key: "checked_out_time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const isFinalized =
          record?.approved_by ||
          record?.approved_at ||
          record?.rejected_by ||
          record?.rejected_at;

        if (isFinalized) {
          return <span style={{ color: "#888" }}>Already {record.status}</span>;
        }

        return (
          <>
            <Button
              type="primary"
              onClick={() => handleApprove(record)}
              style={{ marginRight: 8 }}
            >
              Approve
            </Button>
            <Button danger onClick={() => handleReject(record)}>
              Reject
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="users-container">
        <h2>Regularize Requests</h2>
        <CustomTable
          columns={columns}
          data={regularizeList}
          pagination={{
            current: pagination?.current || currentPage,
            pageSize: pagination?.pageSize || pageSize,
            total: pagination?.total_count || 0,
            onChange: handlePageChange,
            showSizeChanger: true,
          }}
        />
      </div>

      {/* Show popup only for rejection */}
      {actionType === "reject" && (
        <CommonPopup
          title={
            <div>Reject Regularize Request for {selectedRecord?.user_id}</div>
          }
          isModalOpen={isModalOpen}
          okText="Submit"
          handleOk={handleOk}
          handleCancel={handleCancel}
        >
          <TextAreainput
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </CommonPopup>
      )}
    </>
  );
};

export default RegularizeList;
