import React from "react";
import { Table } from "antd";
import "./CustomTable.scss"; 

const  CustomTable =({
  columns,
  data,
  pagination,
  loading,
  onChange,
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
        onChange={onChange ? onChange : false}
        {...props}
      />
    </>
  );
}
export default CustomTable;
