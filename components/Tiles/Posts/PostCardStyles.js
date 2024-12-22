import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  postTime: {
    color: COLORS.gray,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  postTitle: {
    fontSize: 18,
    fontFamily: "Bold",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Medium",
  },
  imageScrollView: {
    height: 200, // Ensure this height is defined
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  footerText: {
    fontSize: 14,
  },
  commentsSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  comment: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUserName: {
    fontSize: 14,
    fontFamily: "Bold",
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentActions: {
    flexDirection: "row",
  },
  commentAction: {
    fontSize: 12,
    color: COLORS.secondary,
    marginRight: 10,
  },
  noCommentsText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  addCommentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    marginRight: 10,
  },
  replyUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  addReplySection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    marginRight: 10,
  },
  replyButton: {
    fontSize: 14,
    color: COLORS.primary,
  },
  saveEditButton: {
    alignSelf: "flex-end",
  },
});

export default styles;
