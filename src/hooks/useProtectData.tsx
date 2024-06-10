"use client";
import { LOCALSTORAGE_CONSTANTS } from "@/constants/WebsiteConstants";
import { PATH_MAIN } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useProtectData = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (typeof window !== "undefined" &&
          localStorage.getItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE) &&
          localStorage.getItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE) ==
            PATH_MAIN.users &&
          (e.code == "44" ||
            e.key == "PrintScreen" ||
            (e.metaKey && e.shiftKey) ||
            (e.shiftKey && e.metaKey) ||
            (e.metaKey && e.key == "G"))) ||
        e.key == "F12" || // F12 key
        (e.ctrlKey && e.shiftKey && e.key == "I") || // DevTools
        (e.ctrlKey && e.shiftKey && e.key == "C") || // DevTools
        (e.ctrlKey && e.shiftKey && e.key == "J") || // DevTools
        (e.ctrlKey && e.key == "U") // View Source
      ) {
        e.preventDefault();
        document.body.hidden = true;
        document.body.classList.add("screenshot-overlay");
        navigator.clipboard.writeText("");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.code == "44" ||
        e.key == "PrintScreen" || // Print Screen key
        e.key == "F12" || // F12 key
        (e.ctrlKey && e.shiftKey && e.key == "I") || // DevTools
        (e.ctrlKey && e.shiftKey && e.key == "C") || // DevTools
        (e.ctrlKey && e.shiftKey && e.key == "J") || // DevTools
        (e.metaKey && e.shiftKey) ||
        (e.shiftKey && e.metaKey) ||
        (e.ctrlKey && e.key == "U")
      ) {
        document.body.hidden = false;
        document.body.classList.remove("screenshot-overlay");
      }
      if (
        typeof window !== "undefined" &&
        localStorage.getItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE) &&
        localStorage.getItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE) ==
          PATH_MAIN.users &&
        (e.code == "44" ||
          e.key == "PrintScreen" ||
          (e.metaKey && e.shiftKey) ||
          (e.shiftKey && e.metaKey) ||
          (e.metaKey && e.key == "G"))
      ) {
        e.preventDefault();
        document.body.hidden = true;
        document.body.classList.add("screenshot-overlay");
        navigator.clipboard.writeText("");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keypress", handleKeyDown);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keypress", handleKeyDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
};

export default useProtectData;
