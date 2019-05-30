// import React, { Component } from "react";
// import posed from "react-pose";
// import LikeIcon from "../../images/Navbar/like.svg";
// import DislikeIcon from "../../images/Navbar/dislike.svg";
// import "./styles.css";

// const Animate = posed.div({
//   visible: { y: 50, scale: 1 },
//   hidden: { y: 300 },
//   active: { y: -100, scale: 1.5 }
// });

// class ControlBlob extends Component {
//   constructor() {
//     super();
//     this.state = {
//       mounted: false,
//       active: false,
//       postText: ""
//     };
//   }

//   componentDidMount() {
//     this.setState({ mounted: true });
//   }

//   onBlobClick = () => {
//     this.setState(state => {
//       return { active: !state.active, postText: "" };
//     });
//   };

//   onTextAreaClick = event => {
//     event.stopPropagation();
//     this.setState({
//       postText: ""
//     });
//   };

//   handleTextareaChange = event => {
//     this.setState({ postText: event.target.value });
//   };

//   // onKeyDown = event => {
//   //   if (event.keyCode === 8) {
//   //     event.preventDefault();

//   //     const { userId, makeNotification } = this.props;
//   //     const {  postText } = this.state;

//   //     const resetState = () => {
//   //       this.setState({ active: false, postText="" });
//   //     };

//   //     makeNotification("makePost", `${userId}`);
//   //     firebaseWrapper.sendPost(userId, text, null, resetState);
//   //   }
//   // };

//   render() {
//     const { mounted, active, postText } = this.state;

//     // Generate angles for icon positioning
//     const numIcons = 16;
//     const angleSpacing = 360 / numIcons;
//     const angleClasses = [];
//     for (let i = 0; i < numIcons; i += 1) {
//       const angle = i * angleSpacing;
//       angleClasses.push(angle.toString().replace(".", "_"));
//     }

//     return (
//       <Animate
//         pose={mounted ? (active ? "active" : "visible") : "hidden"}
//         id="control-blob"
//       >
//         <div id="circle">
//           {angleClasses.map((angle, i) => {
//             return (
//               <img
//                 src={i % 2 === 0 ? LikeIcon : DislikeIcon}
//                 alt={i % 2 === 0 ? "like icon" : "dislike icon"}
//                 className={`icon deg${angle}`}
//                 key={angle}
//               />
//             );
//           })}
//           <div id="blob" onClick={this.onBlobClick}>
//             {active ? (
//               <textarea
//                 onClick={this.onTextAreaClick}
//                 value={postText}
//                 onChange={this.handleTextareaChange}
//                 placeholder="Please type your message..."
//                 // onKeyDown={this.onKeyDown}
//               />
//             ) : (
//               <p>
//                 WHAT&apos;S ON
//                 <br />
//                 YOUR MIND?
//               </p>
//             )}
//           </div>
//         </div>
//       </Animate>
//     );
//   }
// }

// export default ControlBlob;
