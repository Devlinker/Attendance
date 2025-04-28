import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonPopup from "../../components/common/popup";
import TextAreainput from "../../components/common/textarea";
import { Button, message, Spin } from "antd";
import {
  fetchRegularizeList,
  submitRegularize,
} from "../../shared/regularize/action";
import "./regularizelist.scss";
import CustomTable from "../../components/common/customtable";

const RegularizeList = () => {
  const dispatch = useDispatch();
  const { regularizeList, pagination, loading } = useSelector(
    (state) => state?.regularize
  );
  const { userProfile } = useSelector((state) => state.profile);
  const updatedProfile = userProfile?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  const fetchList = (page = 1, items = 10) => {
    dispatch(fetchRegularizeList(page, items));
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
    setIsModalOpen(true);
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

  const toCamelCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // const columns = [
  //   {
  //     title: "Serial No.",
  //     key: "serial_no",
  //     render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
  //   },
  //   {
  //     title: "Attendance Date",
  //     dataIndex: "attendance_date",
  //     key: "attendance_date",
  //   },
  //   {
  //     title: "Check-In Time",
  //     dataIndex: "checked_in_time",
  //     key: "checked_in_time",
  //   },
  //   {
  //     title: "Check-Out Time",
  //     dataIndex: "checked_out_time",
  //     key: "checked_out_time",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status) => toCamelCase(status),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => {
  //       const isFinalized =
  //         record?.approved_by ||
  //         record?.approved_at ||
  //         record?.rejected_by ||
  //         record?.rejected_at;

  //       if (isFinalized) {
  //         return (
  //           <span style={{ color: "#888" }}>{toCamelCase(record.status)}</span>
  //         );
  //       }

  //       // Only show action buttons if user_type is admin
  //       if (updatedProfile?.user_type === "admin") {
  //         return (
  //           <>
  //             <Button
  //               type="primary"
  //               onClick={() => handleApprove(record)}
  //               style={{ marginRight: 8 }}
  //             >
  //               Approve
  //             </Button>
  //             <Button danger onClick={() => handleReject(record)}>
  //               Reject
  //             </Button>
  //           </>
  //         );
  //       } else {
  //         return (
  //           <span style={{ color: "#888" }}>{toCamelCase(record.status)}</span>
  //         );
  //       }
  //     },
  //   },
  // ];

  const MAX_NAME_LENGTH = 15;
  const MAX_REASON_LENGTH = 30; // you can adjust if you want

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial_no",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Employee Name & Code",
      key: "name_code",
      render: (_, record) => {
        const name = record?.name || "-";
        const code = record?.employee_code || "-";
        const shortName = truncateText(name, MAX_NAME_LENGTH);
        return (
          <div>
            <div>{shortName}</div>
            <div>({code})</div>
          </div>
        );
      },
    },
    {
      title: "Attendance Date",
      dataIndex: "attendance_date",
      key: "attendance_date",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        return <span>{toCamelCase(record.status)}</span>; // Always show the status
      },
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
      title: "Action",
      key: "action",
      render: (_, record) => {
        const isRejected = record?.status?.toLowerCase() === "rejected";
        const isFinalized =
          record?.approved_by ||
          record?.approved_at ||
          record?.rejected_by ||
          record?.rejected_at;

        // If rejected, show rejection reason in action instead of status
        if (isRejected) {
          const reason = truncateText(
            record?.rejection_reason,
            MAX_REASON_LENGTH
          );
          return (
            <span style={{ color: "#ff4d4f" }}>{reason || "Rejected"}</span>
          );
        }

        // If finalized (approved/rejected), just show the status (no action buttons)
        if (isFinalized) {
          return <span>{toCamelCase(record.status)}</span>;
        }

        // Show action buttons for admin
        if (updatedProfile?.user_type === "admin") {
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
        } else {
          return <span>{toCamelCase(record.status)}</span>; // Display status for non-admin
        }
      },
    },
  ];

  return (
    <>
      <div className="users-container">
        <h2 className="regularize-list-header">Regularize Requests</h2>

        {/* Spin wraps the table */}
        <Spin spinning={loading}>
          <CustomTable
            columns={columns}
            data={regularizeList}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: pagination?.total || 0,
              onChange: handlePageChange,
              showSizeChanger: true,
            }}
          />
        </Spin>
      </div>

      {/* Popup for rejection */}
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
