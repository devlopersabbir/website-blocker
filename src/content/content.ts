// console.clear();
// import { formatTime } from "../utils/format";
// import { createModal } from "../utils/modal";
// import {
//   getPasswordFromStorage,
//   getWebsiteListFromStorage,
// } from "../utils/service";
// import {
//   getTimestampFromStorage,
//   setTimestampInStorage,
// } from "../utils/storage";

// // init state
// let currentDomain: string | any;
// console.log(currentDomain);

// chrome.runtime.sendMessage(
//   { action: "domainName" },
//   ({ domainName }) => (currentDomain = domainName)
// );

// const showPasswordPopup = async () => {
//   const websiteList: any = await getWebsiteListFromStorage();
//   const masterPassword: any = await getPasswordFromStorage();

//   const isWebsiteBlocked = websiteList.some(
//     (item: any) => item === currentDomain
//   );

//   if (isWebsiteBlocked) {
//     createModal();
//     const rootModal: HTMLElement = document.querySelector(
//       "#myExtensionModal"
//     ) as HTMLElement;
//     const closeBtn = document.querySelector("#closeBtn");
//     const passwordInput = document.querySelector(
//       "#passwordInput"
//     ) as HTMLInputElement;
//     const submitButton = document.querySelector("#submitButton");

//     if (rootModal) {
//       rootModal.style.display = "block";
//     }
//     closeBtn?.addEventListener("click", () => {
//       // alert("Press okay to reload page");
//       rootModal.style.display = "none";
//       // disbale window reload function
//       // window.location.reload();
//     });

//     submitButton?.addEventListener("click", async () => {
//       if (!passwordInput || !passwordInput.value)
//         return alert("Please enter password!");
//       if (passwordInput && passwordInput.value === masterPassword) {
//         // Store the timestamp when the password was entered
//         await setTimestampInStorage(currentDomain, Date.now());
//         rootModal.style.display = "none";
//       } else {
//         alert("PIN wrong!");
//         // disbale window reload function
//         // window.location.reload();
//       }
//     });
//   }
// };

// // Check if the password is still valid based on the timestamp
// const checkPasswordValidity = async () => {
//   const websiteList: any = await getWebsiteListFromStorage();
//   console.log("website list", websiteList);
//   const isWebsiteBlocked = websiteList.some(
//     (item: any) => item === currentDomain
//   );

//   if (isWebsiteBlocked) {
//     console.log("true......");
//     const timestamp = (await getTimestampFromStorage(currentDomain)) as number;
//     console.log("timestamp", timestamp);

//     // if timestamp not found then make return
//     if (!timestamp) return showPasswordPopup();

//     const currentTime = Date.now();
//     console.log("current time: ", currentTime);
//     const timeDiff = currentTime - timestamp;
//     const validDuration = 15 * 60 * 1000; // 2 hours in milliseconds

//     if (timeDiff > validDuration) {
//       // Password has expired, show the modal again
//       showPasswordPopup();
//     } else {
//       // calclute remaing time
//       let remainingTime = validDuration - timeDiff;
//       // Start updating the countdown every second
//       const countDownInterval = setInterval(() => {
//         console.log("left time", formatTime(remainingTime));

//         // Reduce the remaining time by 1 second
//         remainingTime -= 1000;

//         if (remainingTime < 0) {
//           // Password has expired, show the modal again
//           clearInterval(countDownInterval);
//           showPasswordPopup();
//         }
//       }, 1000);

//       // Initial update of the countdown
//       console.log("init time: ", formatTime(remainingTime));
//     }
//   }
// };

// if (document.readyState === "interactive") {
//   // showPasswordPopup();
//   checkPasswordValidity();
// }

chrome.runtime.sendMessage("domain");