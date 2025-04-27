import React, { createContext, useContext, useMemo } from "react";
import { notification } from "antd";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = useMemo(() => {
    return (
      type = "info",       // success | info | warning | error
      message = "Title",   // header
      description = "",    // description/body
      placement = "topRight" // placement (topLeft, topRight, bottomLeft, bottomRight)
    ) => {
      api[type]({
        message,
        description,
        placement,
      });
    };
  }, [api]);

  return (
    <NotificationContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
