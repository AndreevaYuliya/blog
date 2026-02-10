import { FC, useEffect, useState, createContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";

import io from "socket.io-client";

import {
  NotificationProviderProps,
  NotificationT,
} from "../types/Notification";

import { useAlertContext } from "./AlertContext";

const baseUrl = process.env.REACT_APP_BASE_URL;
const SOCKET_SERVER_URL = baseUrl
  ? `${baseUrl}/notifications`
  : "http://localhost:3000/notifications";

const NotificationContext = createContext<NotificationT>({
  message: "",
  user: "",
});

const Notification: FC<NotificationProviderProps> = (props) => {
  const { children } = props;

  const { showAlert } = useAlertContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationT>({
    message: "",
    user: "",
  });

  const page = parseInt(searchParams.get("page") || "1");
  const pageRef = useRef(page);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      //   auth: {
      //     token: localStorage.getItem("token"),
      //   },
    });

    socket.on("newPost", (data: NotificationT) => {
      setNotifications(data);

      if (pageRef.current === 1) {
        navigate(0);
      }

      showAlert(`${data.user} created a new post: ${data.message}`, "info");
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate, showAlert]);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};

export default Notification;

