"use client";

import { useEffect, useState } from "react";
import { database, onValue, ref } from "@/config/firebaseConfig";
import "./NotificationAlert.scss";
import { FirebaseConstants } from "@/constants/FirebaseConstants";
import { NotificationDTO, NotificationSeenDTO } from "@/models/NotificationDTO";
import sweetAlert from "@/utils/sweetAlert";
import { getUserInfoId } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { LOCALSTORAGE_CONSTANTS } from "@/constants/WebsiteConstants";
import { PATH_MAIN } from "@/routes/paths";

const NotificationAlert = () => {
  const [newNotification, setNewNotification] = useState(false);
  const router = useRouter();

  const navigateTo = (route: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE, route);
    }
    router.push(route);
  };

  useEffect(() => {
    onValue(
      ref(database, `${FirebaseConstants.MANAGEMENT_NOTIFICATIONS}`),
      (snapshot) => {
        const data = snapshot.val();
        const notificationsList = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];

        onValue(
          ref(database, `${FirebaseConstants.SEEN_NOTIFICATIONS}`),
          (snapshot) => {
            const data = snapshot.val();
            const seenList = data
              ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
              : [];

            const userSeen: NotificationSeenDTO = seenList.find(
              (x: NotificationSeenDTO) => x.userLoginId == getUserInfoId()
            );

            if (
              notificationsList.find(
                (x: NotificationDTO) =>
                  new Date(x.createdAt ?? "").getTime() >
                  new Date(
                    userSeen && userSeen.latestTime
                      ? userSeen.latestTime
                      : x.createdAt ?? ""
                  ).getTime()
              )
            ) {
              if (
                localStorage.getItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE) &&
                localStorage.getItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE) !=
                  PATH_MAIN.notification
              ) {
                sweetAlert.alertInfo("Bạn có thông báo mới", "", 3000, "22");
              }
              setNewNotification(true);
            } else {
              setNewNotification(false);
            }
          }
        );
      }
    );
  }, []);

  console.log(newNotification);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer h-6 w-6 ${newNotification ? "newNotification_active" : ""}`}
      //   fill={`${newNotification ? "red" : "none"}`}
      viewBox="0 0 24 24"
      stroke={`${newNotification ? "" : "currentColor"}`}
      onClick={() => {
        navigateTo(PATH_MAIN.notification);
      }}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
};

export default NotificationAlert;
