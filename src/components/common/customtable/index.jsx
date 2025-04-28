import React from "react";
import { Spin, Table } from "antd";
import "./CustomTable.scss";

const CustomTable = ({
  columns,
  data,
  pagination,
  loading,
  onChange = () => {},
  className,
  ...props
}) => {
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        className={`customTable ${className}`}
        pagination={pagination ? pagination : false}
        onChange={onChange}
        {...props}
      />
    </>
  );
};
export default CustomTable;
