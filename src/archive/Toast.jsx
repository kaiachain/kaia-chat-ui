// add this to components folder

// import React, { useEffect, useState } from "react";

// const Toast = ({ icon, text, textColor, backgroundColor, borderColor, boxShadowColor }) => {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible(false);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!visible) return null;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: "12px",
//         left: "20px",
//         right: "20px",
//         backgroundColor: backgroundColor,
//         color: "#fff",
//         borderRadius: "16px",
//         zIndex: 1000,
//         display: "flex",
//         alignItems: "center",
//         padding: "16px",
//         height: "20px",
//         border: "1px solid",
//         borderColor: borderColor,
//         boxShadow: `0px 8px 16px 0px ${boxShadowColor}`,
//       }}
//     >
//       {icon && (
//         <img
//           style={{
//             marginRight: "12px",
//             width: "20px",
//             height: "20px",
//           }}
//           src={icon}
//           alt="toast-icon"
//         />
//       )}
//       <p
//         style={{
//           color: textColor,
//           fontFeatureSettings: "'cv13' on",
//           fontFamily: "Manrope",
//           fontSize: "14px",
//           fontStyle: "normal",
//           fontWeight: 700,
//           lineHeight: "20px",
//         }}
//       >
//         {text}
//       </p>
//     </div>
//   );
// };

// export default Toast;
